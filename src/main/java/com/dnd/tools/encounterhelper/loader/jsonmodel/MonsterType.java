package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class MonsterType {

  private String type;
  private String[] tags;
  private String swarmSize;

}
