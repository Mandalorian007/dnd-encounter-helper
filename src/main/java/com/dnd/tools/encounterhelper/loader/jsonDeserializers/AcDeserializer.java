package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonAc;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AcDeserializer extends JsonDeserializer<JsonAc[]> {

  @Override
  public JsonAc[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {

    Object[] fields = p.readValueAs(Object[].class);

    List<JsonAc> finalAcList = new ArrayList<>();
    for(Object field : fields) {
      if(field instanceof Integer) {
        JsonAc ac = new JsonAc();
        ac.setAc((Integer) field);
        finalAcList.add(ac);
      } else {
        Map<?, ?> map = (Map) field;
        JsonAc ac = new JsonAc();
        ac.setAc((Integer) map.get("ac"));
        List<String> from = (List<String>) map.get("from");
        if(from != null) {
          ac.setFrom(from.toArray(new String[from.size()]));
        }
        ac.setCondition((String) map.get("condition"));
        ac.setBraces((Boolean) map.get("braces"));
        finalAcList.add(ac);
      }
    }

    return finalAcList.toArray(new JsonAc[finalAcList.size()]);
  }
}
