package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class Resistance {
  private DamageType damageType;
  private Optional<String> condition;

  public Resistance(DamageType damageType) {
    this.damageType = damageType;
    this.condition = Optional.empty();
  }

  public Resistance(DamageType damageType, String condition) {
    this.damageType = damageType;
    this.condition = Optional.of(condition);
  }
}
