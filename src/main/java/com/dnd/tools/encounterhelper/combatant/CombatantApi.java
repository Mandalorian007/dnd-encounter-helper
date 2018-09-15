package com.dnd.tools.encounterhelper.combatant;

import static java.util.Collections.reverseOrder;
import static java.util.Comparator.comparing;

import com.dnd.tools.encounterhelper.util.Die;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CombatantApi {

    private final CombatantRepository combatantRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/combatants")
    public List<Combatant> findAllCombatants() {
        // We want to always return this list sorted for initiative
        return initiativeSort(combatantRepository.findAll());
    }

    @GetMapping("/combatants/{combatantId}")
    public Combatant findById(@PathVariable("combatantId") long combatantId) {
        return combatantRepository.findById(combatantId)
                .orElseThrow(() -> new CombatantNotFoundException(combatantId));
    }

    @DeleteMapping("/combatants/{combatantId}")
    public void deleteById(@PathVariable("combatantId") long combatantId) {
        combatantRepository.deleteById(combatantId);
    }

    @PostMapping("combatants")
    public Combatant createNewCombatant(@RequestBody Combatant combatant) {
        return combatantRepository.save(combatant);
    }

    @PatchMapping("combatants/{combatantId}")
    public Combatant updateCombatant(
            @PathVariable("combatantId") long combatantId,
            @RequestBody String fieldToPatch) throws IOException {

        Combatant entity = combatantRepository.findById(combatantId)
                .orElseThrow(() -> new CombatantNotFoundException(combatantId));
        //TODO consider if this is an HP modification and the current hp < 0
        Combatant updatedCombatant = objectMapper.readerForUpdating(entity).readValue(fieldToPatch);
        return combatantRepository.saveAndFlush(updatedCombatant);
    }

    @PostMapping("combatants/newRound")
    public List<Combatant> newRound(@RequestBody Map<Long, Integer> playerIdAndInitiativeRoll) {
      List<Combatant> combatants = combatantRepository.findAll();
      List<Combatant> players = combatants.stream()
          .filter(combatant -> !combatant.isNpc())
          .collect(Collectors.toList());

      // Make sure all players and no enemy or bad ids were sent to the api
      if(players.size() != playerIdAndInitiativeRoll.size()) {
        List<Long> playerIds = players.stream()
            .map(Combatant::getId)
            .collect(Collectors.toList());
        Set<Long> missingPlayers = playerIdAndInitiativeRoll.keySet();
        missingPlayers.removeAll(playerIds);
        throw new CombatantNotFoundException(missingPlayers.stream().findFirst().get());
      }

      // Set new player initiatives
      combatants.stream()
          .filter(combatant -> !combatant.isNpc())
          .forEach(player -> player.setCurrentInitiative(playerIdAndInitiativeRoll.get(player.getId())));

      // Roll new NPC initiatives
      Die die = new Die(20);
      combatants.stream()
          .filter(Combatant::isNpc)
          .forEach(npc -> npc.setCurrentInitiative(die.roll() + npc.getInitativeBonus()));

      return initiativeSort(combatantRepository.saveAll(combatants));
    }

    // Typically expecting either a baseHp or a conMod (but both will be used if they are sent)
    @PostMapping("/combatants/npcs/hitdie/{numberOfDice}/{sizeOfDie}/{baseHp}/{conMod}")
    public List<Combatant> createNpcsWithTemplate(HitDie hitDie,
                                                  @Param("count") int count,
                                                  @RequestBody Combatant combatant) {

        return initiativeSort(combatantRepository.saveAll(
                IntStream.range(1, count + 1)
                    .mapToObj(enemyNumber -> {
                        Combatant npc = new Combatant();
                        npc.setName(combatant.getName() + (count != 1 ? " #" + enemyNumber : ""));
                        npc.setArmourClass(combatant.getArmourClass());
                        //Roll hit points for each enemy
                        int maxHp = getMaxHp(hitDie);
                        npc.setMaxHp(maxHp);
                        npc.setCurrentHp(maxHp);
                        npc.setInitativeBonus(combatant.getInitativeBonus());
                        npc.setPassivePerception(combatant.getPassivePerception());
                        // Force NPC status
                        npc.setNpc(true);
                        npc.setMonsterId(combatant.getMonsterId());
                        npc.setCurrentInitiative(combatant.getCurrentInitiative());
                        return npc;
                    })
                    .collect(Collectors.toList())));
    }

    // Roll NPC hitPoints
    private int getMaxHp(HitDie hitDie) {
        Die die = new Die(hitDie.getSizeOfDie());
        int dieRolls = IntStream.rangeClosed(1, hitDie.getNumberOfDice())
                .map((increment) -> die.roll())
                .sum();
        return dieRolls + hitDie.getBaseHp() + (hitDie.numberOfDice * hitDie.getConMod());
    }

    private List<Combatant> initiativeSort(List<Combatant> combatants) {
      return combatants.stream()
          .sorted(
              //Highest Initative roll
              comparing(Combatant::getCurrentInitiative, reverseOrder())
                  // Second compare on highest Initiative Bonus
                  .thenComparing(Combatant::getInitativeBonus, reverseOrder())
                  // Third compare by players before npcs
                  .thenComparing(Combatant::isNpc)
          )
          .collect(Collectors.toList());
    }
}
