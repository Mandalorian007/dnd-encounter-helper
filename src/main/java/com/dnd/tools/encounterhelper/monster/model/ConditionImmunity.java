package com.dnd.tools.encounterhelper.monster.model;

import lombok.Data;

@Data
public class ConditionImmunity {
  private Condition damageType;
  private String condition;

  public ConditionImmunity(Condition damageType) {
    this.damageType = damageType;
    this.condition = null;
  }

  public ConditionImmunity(Condition damageType, String condition) {
    this.damageType = damageType;
    this.condition = condition;
  }
}
