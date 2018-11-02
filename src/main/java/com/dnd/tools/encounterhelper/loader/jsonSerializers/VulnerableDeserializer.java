package com.dnd.tools.encounterhelper.loader.jsonSerializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.Vulnerable;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class VulnerableDeserializer extends JsonDeserializer<Vulnerable[]> {

  @Override
  public Vulnerable[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] vulnerableObjects = p.readValueAs(Object[].class);

    List<Vulnerable> finalVulnerableList = new ArrayList<>();
    for(Object vulnerableObject: vulnerableObjects) {
      if(vulnerableObject instanceof String) {
        Vulnerable vulnerable = new Vulnerable();
        vulnerable.setVulnerable(new String[]{(String) vulnerableObject});
        finalVulnerableList.add(vulnerable);
      } else {
        Map<?, ?> map = (LinkedHashMap) vulnerableObject;
        Vulnerable vulnerable = new Vulnerable();
        List<String> stringList = (List<String>) map.get("vulnerable");
        if (stringList != null) {
          vulnerable.setVulnerable(stringList.toArray(new String[stringList.size()]));
        }
        vulnerable.setNote((String) map.get("note"));
        finalVulnerableList.add(vulnerable);
      }
    }

    return finalVulnerableList.toArray(new Vulnerable[finalVulnerableList.size()]);
  }
}
