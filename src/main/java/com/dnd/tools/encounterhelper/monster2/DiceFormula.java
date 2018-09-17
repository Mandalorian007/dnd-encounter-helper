package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class DiceFormula {
  private int numOfDice;
  private int sizeOfDie;
  private Optional<Integer> flatBonus;
}
