package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonActionEntry {
  public String single;
  public EntryList multiple;

  @Data
  public static class EntryList {
    private String type;
    private String style;
    private Item[] items;

    @Data
    public static class Item {
      private String type;
      private String name;
      private String entry;
    }
  }
}
