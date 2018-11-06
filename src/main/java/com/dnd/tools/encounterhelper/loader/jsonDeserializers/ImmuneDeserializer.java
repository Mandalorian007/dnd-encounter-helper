package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonImmune;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ImmuneDeserializer extends JsonDeserializer<JsonImmune[]> {

  @Override
  public JsonImmune[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] immuneObjects = p.readValueAs(Object[].class);

    List<JsonImmune> finalImmuneList = new ArrayList<>();
    for(Object immuneObject: immuneObjects) {
      if(immuneObject instanceof String) {
        JsonImmune immune = new JsonImmune();
        immune.setImmune(new String[]{(String) immuneObject});
        finalImmuneList.add(immune);
      } else {
        Map<?, ?> map = (LinkedHashMap) immuneObject;
        JsonImmune immune = new JsonImmune();
        List<String> stringList = (List<String>) map.get("immune");
        if (stringList != null) {
          immune.setImmune(stringList.toArray(new String[stringList.size()]));
        }
        immune.setNote((String) map.get("note"));
        finalImmuneList.add(immune);
      }
    }

    return finalImmuneList.toArray(new JsonImmune[finalImmuneList.size()]);
  }
}
