package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Speed {
  private Integer walk;
  private Integer burrow;
  private Integer climb;
  private Integer fly;
  private Integer hover;
  private Integer swim;

}
