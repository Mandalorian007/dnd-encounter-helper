package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonCr;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class CrDeserializer extends JsonDeserializer<JsonCr> {

  @Override
  public JsonCr deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object obj = p.readValueAs(Object.class);

    if(obj instanceof String) {
      JsonCr cr = new JsonCr();
      cr.setCr((String) obj);
      return cr;
    } else {
      Map<?, ?> map = (LinkedHashMap) obj;
      JsonCr cr = new JsonCr();
      cr.setCr((String) map.get("cr"));
      cr.setCoven((String) map.get("coven"));
      cr.setLair((String) map.get("lair"));
      return cr;
    }
  }
}
