package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

@Data
@Embeddable
public class AlignmentOption {
  @Enumerated(EnumType.STRING)
  private Alignment alignment;
  private int chance;

}
