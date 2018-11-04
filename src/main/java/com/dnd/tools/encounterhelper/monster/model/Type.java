package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

@Data
@Embeddable
public class Type {
  private String type;
  @ElementCollection
  private List<String> subTypes;
  @Enumerated(EnumType.STRING)
  private Size swarmSize;

}
