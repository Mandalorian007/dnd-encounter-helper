package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.MonsterType;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class MonsterTypeDeserializer extends JsonDeserializer<MonsterType> {

  @Override
  public MonsterType deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    MonsterType monsterType = new MonsterType();

    JsonToken jsonToken = p.getCurrentToken();
    if(jsonToken == JsonToken.VALUE_STRING) {
      monsterType.setType(p.getValueAsString());
    } else if(jsonToken == JsonToken.START_OBJECT) {
      monsterType = p.readValueAs(MonsterType.class);
    }
    return monsterType;
  }
}
