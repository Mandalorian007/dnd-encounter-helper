package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class Ac {
  private int ac;
  private String[] from;
  private String condition;
  private Boolean braces;
}
