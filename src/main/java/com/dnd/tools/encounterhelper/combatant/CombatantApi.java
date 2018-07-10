package com.dnd.tools.encounterhelper.combatant;

import com.dnd.tools.encounterhelper.util.Die;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.Collections.reverseOrder;
import static java.util.Comparator.comparing;

@RestController
@RequiredArgsConstructor
public class CombatantApi {

    private final CombatantRepository combatantRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/combatants")
    public List<Combatant> findAllCombatants() {
        // We want to always return this list sorted for initiative
        return combatantRepository.findAll().stream()
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
        Combatant updatedCombatant = objectMapper.readerForUpdating(entity).readValue(fieldToPatch);
        return combatantRepository.saveAndFlush(updatedCombatant);
    }

    @PostMapping("/combatants/rollinitative")
    public List<Combatant> rollInitative(@RequestBody Map<Long, Integer> combatantIdAndNewInitiative) {
        List<Combatant> playerInitativesToUpdate = combatantIdAndNewInitiative.keySet().stream()
                .map(combatantId -> combatantRepository.getOne(combatantId))
                .filter(combatant -> !combatant.isNpc())
                .peek(combatant -> combatant.setCurrentInitiative(combatantIdAndNewInitiative.get(combatant.getId())))
                .collect(Collectors.toList());
        Die die = new Die(20);
        List<Combatant> npcInitativesToUpdate = combatantRepository.findAll().stream()
                .filter(Combatant::isNpc)
                .peek(combatant -> combatant.setCurrentInitiative(combatant.getInitativeBonus() + die.roll()))
                .collect(Collectors.toList());

        List<Combatant> updatesToCombatantInitiative = new ArrayList<>();
        Stream.of(playerInitativesToUpdate, npcInitativesToUpdate).forEach(updatesToCombatantInitiative::addAll);

        return combatantRepository.saveAll(updatesToCombatantInitiative);
    }

    // Typically expecting either a baseHp or a conMod (but both will be used if they are sent)
    @PostMapping("/combatants/npcs/hitdie/{numberOfDice}/{sizeOfDie}/{baseHp}/{conMod}")
    public List<Combatant> createNpcsWithTemplate(HitDie hitDie,
                                                  @Param("count") int count,
                                                  @RequestBody Combatant combatant) {

        return combatantRepository.saveAll(
                IntStream.range(1, count + 1)
                    .mapToObj(enemyNumber -> {
                        Combatant npc = new Combatant();
                        npc.setName(combatant.getName() + (count != 1 ? "#" + enemyNumber : ""));
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
                    .collect(Collectors.toList()));
    }

    // Roll NPC hitpoints
    private int getMaxHp(HitDie hitDie) {
        Die die = new Die(hitDie.getSizeOfDie());
        int dieRolls = IntStream.rangeClosed(1, hitDie.getNumberOfDice())
                .map((increment) -> die.roll())
                .sum();
        return dieRolls + hitDie.getBaseHp() + (hitDie.numberOfDice * hitDie.getConMod());
    }
}
