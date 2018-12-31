package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonLairAction;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class LairActionDeserializer extends JsonDeserializer<JsonLairAction[]> {

  @Override
  public JsonLairAction[] deserialize(JsonParser jsonParser,
                                      DeserializationContext deserializationContext)
      throws IOException {
    Object[] lairActionObjects = jsonParser.readValueAs(Object[].class);
    List<JsonLairAction> lairActions = new ArrayList<>();

    for(Object lairActionObj : lairActionObjects) {
      JsonLairAction lairAction = new JsonLairAction();
      if(lairActionObj instanceof String) {
        lairAction.setAction((String) lairActionObj);
      } else {
        //List of Strings
        Map<?, ?> lairActionObjMap = (LinkedHashMap) lairActionObj;
        if(lairActionObjMap.get("items") != null) {
          List<?> lairActionObjList = (ArrayList) lairActionObjMap.get("items");
          List<String> lairActionList = new ArrayList<>();
          lairActionObjList.stream()
              .forEach(item -> lairActionList.add((String) item));
          lairAction.setActionList(lairActionList);
        }
      }
      lairActions.add(lairAction);
    }

    return lairActions.toArray(new JsonLairAction[lairActions.size()]);
  }
}
