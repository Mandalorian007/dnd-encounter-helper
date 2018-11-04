package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonVulnerable;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class VulnerableDeserializer extends JsonDeserializer<JsonVulnerable[]> {

  @Override
  public JsonVulnerable[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] vulnerableObjects = p.readValueAs(Object[].class);

    List<JsonVulnerable> finalVulnerableList = new ArrayList<>();
    for(Object vulnerableObject: vulnerableObjects) {
      if(vulnerableObject instanceof String) {
        JsonVulnerable vulnerable = new JsonVulnerable();
        vulnerable.setVulnerable(new String[]{(String) vulnerableObject});
        finalVulnerableList.add(vulnerable);
      } else {
        Map<?, ?> map = (LinkedHashMap) vulnerableObject;
        JsonVulnerable vulnerable = new JsonVulnerable();
        List<String> stringList = (List<String>) map.get("vulnerable");
        if (stringList != null) {
          vulnerable.setVulnerable(stringList.toArray(new String[stringList.size()]));
        }
        vulnerable.setNote((String) map.get("note"));
        finalVulnerableList.add(vulnerable);
      }
    }

    return finalVulnerableList.toArray(new JsonVulnerable[finalVulnerableList.size()]);
  }
}
