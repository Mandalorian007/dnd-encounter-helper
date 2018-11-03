package com.dnd.tools.encounterhelper.monster.model;

import lombok.Data;

@Data
public class SubEntry {
  private String type;
  private String name;
  private ParameterizedStringEntry entry;
}
