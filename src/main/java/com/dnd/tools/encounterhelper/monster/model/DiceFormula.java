package com.dnd.tools.encounterhelper.monster.model;

import java.util.Optional;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class DiceFormula {
  private int numOfDice;
  private int sizeOfDie;
  private Integer flatBonus;

  public Optional<Integer> getFlatBonus() {
    return Optional.ofNullable(flatBonus);
  }

  public void setFlatBonus(Optional<Integer> flatBonus) {
    this.flatBonus = flatBonus.orElse(null);
  }
}
