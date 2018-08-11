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
    combatant.setName("Cora Valentine");
    combatant.setArmourClass(18);
    combatant.setMaxHp(90);
    combatant.setInitativeBonus(5);
    combatant.setPassivePerception(18);
    combatant.setCurrentHp(81);
    combatant.setCurrentInitiative(25);
    combatant.setComment("You'll never see me coming!");
    combatant.setNpc(false);

    Combatant combatant2 = new Combatant();
    combatant2.setName("Lambert LaMure");
    combatant2.setArmourClass(20);
    combatant2.setMaxHp(115);
    combatant2.setInitativeBonus(6);
    combatant2.setPassivePerception(14);
    combatant2.setCurrentHp(115);
    combatant2.setCurrentInitiative(22);
    combatant2.setComment("I'll cut off your head!");
    combatant2.setNpc(false);

    Combatant combatant3 = new Combatant();
    combatant3.setName("Llervu Andavel");
    combatant3.setArmourClass(17);
    combatant3.setMaxHp(80);
    combatant3.setInitativeBonus(3);
    combatant3.setPassivePerception(16);
    combatant3.setCurrentHp(80);
    combatant3.setCurrentInitiative(14);
    combatant3.setComment("Vandila guide my might!");
    combatant3.setNpc(true);

    Combatant combatant4 = new Combatant();
    combatant4.setName("Israel Ben Esar");
    combatant4.setArmourClass(17);
    combatant4.setMaxHp(78);
    combatant4.setInitativeBonus(5);
    combatant4.setPassivePerception(19);
    combatant4.setCurrentHp(78);
    combatant4.setCurrentInitiative(19);
    combatant4.setComment("I've no time for words! ONLY ARROWS!");
    combatant4.setNpc(false);

    Combatant combatant5 = new Combatant();
    combatant5.setName("Ristoro de Caldrini");
    combatant5.setArmourClass(18);
    combatant5.setMaxHp(96);
    combatant5.setInitativeBonus(3);
    combatant5.setPassivePerception(10);
    combatant5.setCurrentHp(96);
    combatant5.setCurrentInitiative(17);
    combatant5.setComment("The tide of battle is mine to command!");
    combatant5.setNpc(true);

    combatantRepository.saveAll(Arrays.asList(combatant, combatant2, combatant3, combatant4, combatant5));

  }
}
