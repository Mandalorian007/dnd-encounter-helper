package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonAbility {
  //Supports Trait, Action, Reaction, and Legendary Action
  private String name;
  private String[] entries;
  private String attack;
  private JsonAbility[] subEntries;
}
