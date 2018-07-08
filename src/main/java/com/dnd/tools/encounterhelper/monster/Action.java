package com.dnd.tools.encounterhelper.monster;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Action {

  private String name;
  @Column(length = 5000)
  private String description;
  private int attackBonus;
  private String damageDice;
  private String damageBonus;
}
