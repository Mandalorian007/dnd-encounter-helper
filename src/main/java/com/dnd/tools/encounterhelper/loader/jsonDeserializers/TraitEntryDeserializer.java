package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.Trait;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TraitEntryDeserializer extends JsonDeserializer<Trait.TraitEntry[]> {

  @Override
  public Trait.TraitEntry[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    List traitEntryObjList = (ArrayList) p.readValueAs(Object.class);
    List<Trait.TraitEntry> traitEntries = new ArrayList<>();

    for(Object traitEntryObj : traitEntryObjList) {
      if(traitEntryObj instanceof String) {
        Trait.TraitEntry traitEntry = new Trait.TraitEntry();
        traitEntry.setEntry((String) traitEntryObj);
        traitEntries.add(traitEntry);
      } else {
        Map<?,?> entryData = (LinkedHashMap) traitEntryObj;
        Trait.TraitEntry traitEntry = new Trait.TraitEntry();
        traitEntry.setType((String) entryData.get("type"));
        List<?> items = (ArrayList) entryData.get("items");
        if(items != null) {
          traitEntry.setItems(items.toArray(new String[items.size()]));
        }
        traitEntries.add(traitEntry);

      }
    }

    return traitEntries.toArray(new Trait.TraitEntry[traitEntries.size()]);
  }
}
