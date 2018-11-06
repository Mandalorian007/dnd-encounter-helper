package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonsterType;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class MonsterTypeTagDeserializer extends JsonDeserializer<JsonMonsterType.MonsterTypeTag[]> {

  @Override
  public JsonMonsterType.MonsterTypeTag[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    List<?> typeTagObjList = (ArrayList) p.readValueAs(Object.class);
    List<JsonMonsterType.MonsterTypeTag> finalMonsterTypeTagList = new ArrayList<>();

    for(Object typeTagObj : typeTagObjList) {
      if(typeTagObj instanceof String) {
        JsonMonsterType.MonsterTypeTag monsterTypeTag = new JsonMonsterType.MonsterTypeTag();
        monsterTypeTag.setTag((String) typeTagObj);
        finalMonsterTypeTagList.add(monsterTypeTag);
      } else {
        Map<?,?> typeTagData = (LinkedHashMap) typeTagObj;
        JsonMonsterType.MonsterTypeTag monsterTypeTag = new JsonMonsterType.MonsterTypeTag();
        monsterTypeTag.setTag((String) typeTagData.get("tag"));
        monsterTypeTag.setPrefix((String) typeTagData.get("prefix"));
        finalMonsterTypeTagList.add(monsterTypeTag);
      }
    }

    return new JsonMonsterType.MonsterTypeTag[0];
  }
}
