package com.dnd.tools.encounterhelper.combatant.npctemplate;

import lombok.Data;

@Data
public class NpcTemplate {
  private int count;
  private HitDice hitDice;

  private String baseName;
  private int armourClass;
  private int initativeBonus;
  private int passivePerception;
  private Long monsterId;

  private int currentInitiative;
  private int currentHp;

}
