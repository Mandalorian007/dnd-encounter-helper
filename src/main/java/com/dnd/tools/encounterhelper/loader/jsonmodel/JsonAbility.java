package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonAbility {
  private String name;
  private String[] entries;
  private JsonAbility[] subEntries;
  //Supports Action and Reaction.
  //Needs additional work for Trait and Legendary Action
}
