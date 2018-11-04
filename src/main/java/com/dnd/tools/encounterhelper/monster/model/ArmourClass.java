package com.dnd.tools.encounterhelper.monster.model;

import java.util.Arrays;
import java.util.List;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class ArmourClass {
  private int armourClass;
  //Note this is actually a , separated record (Doing this since JPA can't nest ElementCollections
  private String armourSources;
  private String condition;

  public List<String> getArmourSources() {
    return Arrays.asList(armourSources.split(","));
  }

  public void setArmourSources(List<String> armourSources) {
    this.armourSources = String.join(",", armourSources);
  }
}
