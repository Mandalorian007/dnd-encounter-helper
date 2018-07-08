package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.combatant.Combatant;
import com.dnd.tools.encounterhelper.combatant.CombatantRepository;
import java.util.Arrays;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TestDataCombatantLoader implements CommandLineRunner {

  private final CombatantRepository combatantRepository;

  @Override
  public void run(String... args) throws Exception {
    Combatant combatant = new Combatant();
    combatant.setName("Woopa Gator");
    combatant.setArmourClass(28);
    combatant.setMaxHp(1);
    combatant.setInitativeBonus(11);
    combatant.setCurrentHp(1);
    combatant.setComments("I am too fast for you!");
    combatant.setNpc(true);

    Combatant combatant2 = new Combatant();
    combatant2.setName("BSF");
    combatant2.setArmourClass(18);
    combatant2.setMaxHp(100);
    combatant2.setInitativeBonus(6);
    combatant2.setCurrentHp(1);
    combatant2.setComments("Wackamole King");
    combatant2.setNpc(false);

    combatantRepository.saveAll(Arrays.asList(combatant, combatant2));

  }
}
