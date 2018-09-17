package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class Immunity {
  private DamageType damageType;
  private Optional<String> condition;

  public Immunity(DamageType damageType) {
    this.damageType = damageType;
    this.condition = Optional.empty();
  }

  public Immunity(DamageType damageType, String condition) {
    this.damageType = damageType;
    this.condition = Optional.of(condition);
  }
}
