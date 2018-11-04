package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonTrait;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TraitEntryDeserializer extends JsonDeserializer<JsonTrait.TraitEntry[]> {

  @Override
  public JsonTrait.TraitEntry[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    List traitEntryObjList = (ArrayList) p.readValueAs(Object.class);
    List<JsonTrait.TraitEntry> traitEntries = new ArrayList<>();

    for(Object traitEntryObj : traitEntryObjList) {
      if(traitEntryObj instanceof String) {
        JsonTrait.TraitEntry traitEntry = new JsonTrait.TraitEntry();
        traitEntry.setEntry((String) traitEntryObj);
        traitEntries.add(traitEntry);
      } else {
        Map<?,?> entryData = (LinkedHashMap) traitEntryObj;
        JsonTrait.TraitEntry traitEntry = new JsonTrait.TraitEntry();
        traitEntry.setType((String) entryData.get("type"));
        List<?> items = (ArrayList) entryData.get("items");
        if(items != null) {
          traitEntry.setItems(items.toArray(new String[items.size()]));
        }
        traitEntries.add(traitEntry);

      }
    }

    return traitEntries.toArray(new JsonTrait.TraitEntry[traitEntries.size()]);
  }
}
