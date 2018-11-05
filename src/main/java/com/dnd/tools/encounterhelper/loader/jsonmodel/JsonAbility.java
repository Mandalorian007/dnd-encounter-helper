package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonAbility {
  private String name;
  private String[] entries;
  private String attack;
  private JsonAbility[] subEntries;
  //Supports Action, Reaction, and Legendary Action
  //Needs additional work for Trait
}
