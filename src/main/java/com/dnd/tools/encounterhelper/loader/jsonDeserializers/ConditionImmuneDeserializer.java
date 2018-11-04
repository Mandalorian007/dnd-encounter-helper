package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonConditionImmune;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ConditionImmuneDeserializer extends JsonDeserializer<JsonConditionImmune[]> {

  @Override
  public JsonConditionImmune[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] conditionImmuneObjects = p.readValueAs(Object[].class);

    List<JsonConditionImmune> finalConditionImmuneList = new ArrayList<>();
    for(Object conditionImmuneObject: conditionImmuneObjects) {
      if(conditionImmuneObject instanceof String) {
        JsonConditionImmune conditionImmune = new JsonConditionImmune();
        conditionImmune.setConditionImmune(new String[]{(String) conditionImmuneObject});
        finalConditionImmuneList.add(conditionImmune);
      } else {
        Map<?, ?> map = (LinkedHashMap) conditionImmuneObject;
        JsonConditionImmune conditionImmune = new JsonConditionImmune();
        List<String> stringList = (List<String>) map.get("conditionImmune");
        if (stringList != null) {
          conditionImmune.setConditionImmune(stringList.toArray(new String[stringList.size()]));
        }
        conditionImmune.setNote((String) map.get("note"));
        finalConditionImmuneList.add(conditionImmune);
      }
    }

    return finalConditionImmuneList.toArray(new JsonConditionImmune[finalConditionImmuneList.size()]);
  }
}
