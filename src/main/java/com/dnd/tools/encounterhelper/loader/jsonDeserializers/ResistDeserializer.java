package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonResist;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ResistDeserializer extends JsonDeserializer<JsonResist[]> {

  @Override
  public JsonResist[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] resistObjects = p.readValueAs(Object[].class);

    List<JsonResist> finalResistList = new ArrayList<>();
    for(Object resistObj: resistObjects) {
      if(resistObj instanceof String) {
        JsonResist resist = new JsonResist();
        resist.setResist(new String[]{(String) resistObj});
        finalResistList.add(resist);
      } else {
        Map<?, ?> map = (LinkedHashMap) resistObj;
        JsonResist resist = new JsonResist();
        String note = (String) map.get("note");
        resist.setNote(note);
        String preNote = (String) map.get("preNote");
        resist.setPreNote(preNote);
        String special = (String) map.get("special");
        resist.setSpecial(special);
        if(map.get("resist") != null) {
          List<?> resistList = (ArrayList) map.get("resist");
          List<String> tempResistList = new ArrayList<>();
          resistList.forEach(resistItem -> {
            if(resistItem instanceof String) {
              tempResistList.add((String) resistItem);
            } else {
              //Deep nested resist.  Break into an additional result
              Map<?, ?> nestedMap = (LinkedHashMap) resistItem;
              JsonResist nestedResist = new JsonResist();
              String nestedNote = (String) nestedMap.get("note");
              nestedResist.setNote(nestedNote);
              String nestedPreNote = (String) nestedMap.get("preNote");
              nestedResist.setPreNote(nestedPreNote);
              String nestedSpecial = (String) nestedMap.get("special");
              nestedResist.setSpecial(nestedSpecial);
              List<String> nestedResistList = (ArrayList<String>) nestedMap.get("resist");
              nestedResist.setResist(nestedResistList.toArray(new String[nestedResistList.size()]));
              // Add to top level result (this reduces the level of nesting
              finalResistList.add(nestedResist);
            }
          });
          resist.setResist(tempResistList.toArray(new String[tempResistList.size()]));
        }

        finalResistList.add(resist);
        }
      }
    return finalResistList.toArray(new JsonResist[finalResistList.size()]);
  }
}
