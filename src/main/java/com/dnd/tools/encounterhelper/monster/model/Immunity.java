package com.dnd.tools.encounterhelper.monster.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Embeddable
public class Immunity {
  @Enumerated(EnumType.STRING)
  private DamageType damageType;
  private String condition;
}
