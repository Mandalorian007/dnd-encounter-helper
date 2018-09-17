package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class Skill {
  private Optional<Integer> skill;
  private AbilityScore abilityScore;
  
  public Skill(int skill, AbilityScore abilityScore) {
    this.skill = Optional.of(skill);
    this.abilityScore = abilityScore;
  }
  
  public Skill(AbilityScore abilityScore) {
    this.skill = Optional.empty();
    this.abilityScore = abilityScore;
  }

  public int getSkill() {
    return skill.orElse(abilityScore.getModifier());
  }
}
