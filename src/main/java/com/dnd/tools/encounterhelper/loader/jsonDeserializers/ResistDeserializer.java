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
    for(Object resistObject: resistObjects) {
      if(resistObject instanceof String) {
        JsonResist resist = new JsonResist();
        resist.setResist(new JsonResist.ResistNested[]{getFromString(resistObject)});
        finalResistList.add(resist);
      } else {
        Map<?, ?> map = (LinkedHashMap) resistObject;
        JsonResist resist = new JsonResist();
        List<?> resistList = (ArrayList) map.get("resist");
        List<JsonResist.ResistNested> finalResistNestedList = new ArrayList<>();
        if (resistList != null) {
          for(Object curResist : resistList) {
            if(curResist instanceof String) {
              finalResistNestedList.add(getFromString(curResist));
            } else {
              Map<?,?> ooph = (LinkedHashMap) curResist;
              JsonResist.ResistNested resistNested = new JsonResist.ResistNested();
              List<String> resistyList = (ArrayList<String>) ooph.get("resist");
              resistNested.setResistGroup(resistyList.toArray(new String[resistyList.size()]));
              resistNested.setPreNote((String) ooph.get("preNote"));
              finalResistNestedList.add(resistNested);
            }
          }
          resist.setResist(finalResistNestedList.toArray(new JsonResist.ResistNested[finalResistNestedList.size()]));
        }
        resist.setNote((String) map.get("note"));
        finalResistList.add(resist);
      }
    }

    return finalResistList.toArray(new JsonResist[finalResistList.size()]);
  }

  private JsonResist.ResistNested getFromString(Object resistString) {
    JsonResist.ResistNested resistNested = new JsonResist.ResistNested();
    resistNested.setResist((String) resistString);
    return resistNested;
  }
}
