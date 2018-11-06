package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Hp {
  private int averageHp;
  private int numOfDice;
  private int sizeOfDie;
  private int flatBonus;
  private String special;
}
