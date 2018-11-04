package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
public class Ability {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  @ElementCollection
  private List<Entry> entries;
}
