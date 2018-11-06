package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Speed {
  private Integer walk;
  private String walkCondition;
  private Integer burrow;
  private String burrowCondition;
  private Integer climb;
  private String climbCondition;
  private Integer fly;
  private String flyCondition;
  private Integer swim;
  private String swimCondition;
  private Boolean hover;

}
