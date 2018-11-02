package com.dnd.tools.encounterhelper.loader.jsonSerializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.SpeedData;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class SpeedDataDeserializer extends JsonDeserializer<SpeedData> {

  @Override
  public SpeedData deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object object = p.readValueAs(Object.class);

    if(object instanceof Integer) {
      SpeedData speedData = new SpeedData();
      speedData.setNumber((Integer) object);
      return speedData;
    } else {
      Map<?, ?> data = (LinkedHashMap) object;
      SpeedData speedData = new SpeedData();
      speedData.setNumber((Integer) data.get("number"));
      speedData.setCondition((String) data.get("condition"));
      return speedData;
    }
  }
}
