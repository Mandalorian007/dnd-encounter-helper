package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.MonsterTypeTagDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonMonsterType {

  private String type;
  @JsonDeserialize(using = MonsterTypeTagDeserializer.class)
  private MonsterTypeTag[] tags;
  private String swarmSize;

  @Data
  public static class MonsterTypeTag {
    private String tag;
    // Note this data is ignored as it is only present on Grisha from oota
    private String prefix;
  }
}
