package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.MonsterType;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class MonsterTypeTagDeserializer extends JsonDeserializer<MonsterType.MonsterTypeTag[]> {

  @Override
  public MonsterType.MonsterTypeTag[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    List<?> typeTagObjList = (ArrayList) p.readValueAs(Object.class);
    List<MonsterType.MonsterTypeTag> finalMonsterTypeTagList = new ArrayList<>();

    for(Object typeTagObj : typeTagObjList) {
      if(typeTagObj instanceof String) {
        MonsterType.MonsterTypeTag monsterTypeTag = new MonsterType.MonsterTypeTag();
        monsterTypeTag.setTag((String) typeTagObj);
        finalMonsterTypeTagList.add(monsterTypeTag);
      } else {
        Map<?,?> typeTagData = (LinkedHashMap) typeTagObj;
        MonsterType.MonsterTypeTag monsterTypeTag = new MonsterType.MonsterTypeTag();
        monsterTypeTag.setTag((String) typeTagData.get("tag"));
        monsterTypeTag.setPrefix((String) typeTagData.get("prefix"));
        finalMonsterTypeTagList.add(monsterTypeTag);
      }
    }

    return new MonsterType.MonsterTypeTag[0];
  }
}
