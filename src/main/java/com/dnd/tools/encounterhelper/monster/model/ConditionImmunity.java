package com.dnd.tools.encounterhelper.monster.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Embeddable
public class ConditionImmunity {
  @Enumerated(EnumType.STRING)
  private Condition condition;
  private String note;
}
