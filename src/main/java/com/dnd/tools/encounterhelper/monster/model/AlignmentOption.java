package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class AlignmentOption {
  private Alignment alignment;
  private int chance;

}
