package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class Save {
  private Optional<Integer> save;
  private AbilityScore abilityScore;

  public Save(int save, AbilityScore abilityScore) {
    this.save = Optional.of(save);
    this.abilityScore = abilityScore;
  }

  public Save(AbilityScore abilityScore) {
    this.save = Optional.empty();
    this.abilityScore = abilityScore;
  }

  public int getSave() {
    return save.orElse(abilityScore.getModifier());
  }
}
