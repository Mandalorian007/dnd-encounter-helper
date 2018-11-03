package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.Resist;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ResistDeserializer extends JsonDeserializer<Resist[]> {

  @Override
  public Resist[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] resistObjects = p.readValueAs(Object[].class);

    List<Resist> finalResistList = new ArrayList<>();
    for(Object resistObject: resistObjects) {
      if(resistObject instanceof String) {
        Resist resist = new Resist();
        resist.setResist(new Resist.ResistNested[]{getFromString(resistObject)});
        finalResistList.add(resist);
      } else {
        Map<?, ?> map = (LinkedHashMap) resistObject;
        Resist resist = new Resist();
        List<?> resistList = (ArrayList) map.get("resist");
        List<Resist.ResistNested> finalResistNestedList = new ArrayList<>();
        if (resistList != null) {
          for(Object curResist : resistList) {
            if(curResist instanceof String) {
              finalResistNestedList.add(getFromString(curResist));
            } else {
              Map<?,?> ooph = (LinkedHashMap) curResist;
              Resist.ResistNested resistNested = new Resist.ResistNested();
              List<String> resistyList = (ArrayList<String>) ooph.get("resist");
              resistNested.setResistGroup(resistyList.toArray(new String[resistyList.size()]));
              resistNested.setPreNote((String) ooph.get("preNote"));
              finalResistNestedList.add(resistNested);
            }
          }
          resist.setResist(finalResistNestedList.toArray(new Resist.ResistNested[finalResistNestedList.size()]));
        }
        resist.setNote((String) map.get("note"));
        finalResistList.add(resist);
      }
    }

    return finalResistList.toArray(new Resist[finalResistList.size()]);
  }

  private Resist.ResistNested getFromString(Object resistString) {
    Resist.ResistNested resistNested = new Resist.ResistNested();
    resistNested.setResist((String) resistString);
    return resistNested;
  }
}
