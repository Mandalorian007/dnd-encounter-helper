package com.dnd.tools.encounterhelper.combatant.npctemplate;

import lombok.Data;

@Data
public class HitDice {

  private int numberOfDie;
  private int sizeOfDie;
  private int conMod = 0;
  private int baseHp = 0;
}
