package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.MonsterTypeTagDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class MonsterType {

  private String type;
  @JsonDeserialize(using = MonsterTypeTagDeserializer.class)
  private MonsterTypeTag[] tags;
  private String swarmSize;

  @Data
  public static class MonsterTypeTag {
    private String tag;
    private String prefix;
  }
}
