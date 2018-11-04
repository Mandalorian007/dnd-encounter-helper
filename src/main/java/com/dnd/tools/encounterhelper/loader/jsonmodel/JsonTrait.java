package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.TraitEntryDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonTrait {
  private String name;
  private String type;
  @JsonDeserialize(using = TraitEntryDeserializer.class)
  private TraitEntry[] entries;

  @Data
  public static class TraitEntry {
    private String entry;
    private String type;
    private String[] items;
  }
}
