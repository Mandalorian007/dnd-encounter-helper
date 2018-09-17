package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class ConditionImmunity {
  private Condition damageType;
  private Optional<String> condition;

  public ConditionImmunity(Condition damageType) {
    this.damageType = damageType;
    this.condition = Optional.empty();
  }

  public ConditionImmunity(Condition damageType, String condition) {
    this.damageType = damageType;
    this.condition = Optional.of(condition);
  }
}
