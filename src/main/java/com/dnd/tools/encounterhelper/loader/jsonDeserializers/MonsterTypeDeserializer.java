package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonsterType;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class MonsterTypeDeserializer extends JsonDeserializer<JsonMonsterType> {

  @Override
  public JsonMonsterType deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    JsonMonsterType monsterType = new JsonMonsterType();

    JsonToken jsonToken = p.getCurrentToken();
    if(jsonToken == JsonToken.VALUE_STRING) {
      monsterType.setType(p.getValueAsString());
    } else if(jsonToken == JsonToken.START_OBJECT) {
      monsterType = p.readValueAs(JsonMonsterType.class);
    }
    return monsterType;
  }
}
