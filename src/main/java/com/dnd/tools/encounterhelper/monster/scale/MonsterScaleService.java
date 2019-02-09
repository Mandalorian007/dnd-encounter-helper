package com.dnd.tools.encounterhelper.monster.scale;

import com.dnd.tools.encounterhelper.monster.model.Monster;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

@Service
public class MonsterScaleService {

  private final Gson gson = new Gson();

  public Monster scaleMonster(Monster orig, double targetCr) {
    //Deep clone monster data
    Monster scaledMon = gson.fromJson(gson.toJson(orig), Monster.class);

    scaleAbilityScoresAndSaves(orig, scaledMon, targetCr);
    // Scale Skills
    // Scale passivePerception
    // Scale Armour Class
    // Scale HP
    // Scale Attack Bonus and Save DCs
    // Scale Damage
    // Scale Spellcasting
    // Scale AC
    // Update CR
    return scaledMon;
  }

  private void scaleAbilityScoresAndSaves(Monster orig, Monster scaledMon, double targetCr) {
    //select ability scores to be scaled.
  }

}
