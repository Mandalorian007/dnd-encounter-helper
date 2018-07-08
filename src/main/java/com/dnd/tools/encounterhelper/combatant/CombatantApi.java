package com.dnd.tools.encounterhelper.combatant;

import static java.util.Collections.reverseOrder;
import static java.util.Comparator.comparing;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
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
}
