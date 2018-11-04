package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonResist {
  private ResistNested[] resist;
  private String note;

  @Data
  public static class ResistNested {
    public String resist;
    public String[] resistGroup;
    public String preNote;
  }
}
