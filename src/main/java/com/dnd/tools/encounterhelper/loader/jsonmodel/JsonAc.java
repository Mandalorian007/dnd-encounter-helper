package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonAc {
  private int ac;
  private String[] from;
  private String condition;
  //Ignoring braces as it seems to not be relevant see mm book for examples
  private Boolean braces;
}
