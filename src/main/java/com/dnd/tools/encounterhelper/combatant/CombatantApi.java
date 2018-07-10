package com.dnd.tools.encounterhelper.combatant;

import static java.util.Collections.reverseOrder;
import static java.util.Comparator.comparing;

import com.dnd.tools.encounterhelper.util.Die;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
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

    // Typically expecting either a baseHp or a conMod (but both will be used if they are sent)
    @PostMapping("/combatants/npcs/hitdie/{numberOfDice}/{sizeOfDie}/{baseHp}/{conMod}")
    public List<Combatant> createNpcsWithTemplate(HitDie hitDie,
                                                  @Param("count") int count,
                                                  @RequestBody Combatant combatant) {

        return combatantRepository.saveAll(IntStream.range(1, count + 1)
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
