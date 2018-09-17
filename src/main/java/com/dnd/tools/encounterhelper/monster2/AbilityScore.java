package com.dnd.tools.encounterhelper.monster2;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AbilityScore {
  private int score;

  public int getModifier() {
    return (score - 10) / 2;
  }
}
