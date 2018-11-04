package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonSpeedData;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class SpeedDataDeserializer extends JsonDeserializer<JsonSpeedData> {

  @Override
  public JsonSpeedData deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object object = p.readValueAs(Object.class);

    if(object instanceof Integer) {
      JsonSpeedData speedData = new JsonSpeedData();
      speedData.setNumber((Integer) object);
      return speedData;
    } else {
      Map<?, ?> data = (LinkedHashMap) object;
      JsonSpeedData speedData = new JsonSpeedData();
      speedData.setNumber((Integer) data.get("number"));
      speedData.setCondition((String) data.get("condition"));
      return speedData;
    }
  }
}
