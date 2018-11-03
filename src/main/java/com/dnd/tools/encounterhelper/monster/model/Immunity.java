package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

@Data
@Embeddable
public class Immunity {
  @Enumerated(EnumType.STRING)
  private DamageType damageType;
  private String condition;

  public Immunity(DamageType damageType) {
    this.damageType = damageType;
    this.condition = null;
  }

  public Immunity(DamageType damageType, String condition) {
    this.damageType = damageType;
    this.condition = condition;
  }
}
