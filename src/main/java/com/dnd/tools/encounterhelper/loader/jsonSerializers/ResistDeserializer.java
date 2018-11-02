package com.dnd.tools.encounterhelper.loader.jsonSerializers;

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
        resist.setResist(new String[]{(String) resistObject});
        finalResistList.add(resist);
      } else {
        Map<?, ?> map = (LinkedHashMap) resistObject;
        Resist resist = new Resist();
        List<String> stringList = (List<String>) map.get("resist");
        if (stringList != null) {
          resist.setResist(stringList.toArray(new String[stringList.size()]));
        }
        resist.setNote((String) map.get("note"));
        finalResistList.add(resist);
      }
    }

    return finalResistList.toArray(new Resist[finalResistList.size()]);
  }
}
