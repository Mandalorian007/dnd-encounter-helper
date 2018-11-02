package com.dnd.tools.encounterhelper.loader.jsonSerializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.ActionEntry;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ActionEntryDeserializer extends JsonDeserializer<ActionEntry[]> {

  @Override
  public ActionEntry[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] fields = p.readValueAs(Object[].class);

    List<ActionEntry> entries = new ArrayList<>();
    for(Object field: fields) {
      if(field instanceof String) {
        ActionEntry entry = new ActionEntry();
        entry.setSingle((String) field);
        entries.add(entry);
      } else {
        Map<?, ?> data = (LinkedHashMap) field;
        ActionEntry entry = new ActionEntry();
        ActionEntry.EntryList entryList = new ActionEntry.EntryList();
        entryList.setType((String) data.get("type"));
        entryList.setStyle((String) data.get("style"));
        List<?> itemObjList = (ArrayList) data.get("items");
        List<ActionEntry.EntryList.Item> finalItemsList = new ArrayList<>();
        if(itemObjList != null) {
          itemObjList.stream().forEach((itemObj) -> {
            ActionEntry.EntryList.Item item = new ActionEntry.EntryList.Item();
            Map<?,?> itemData = (LinkedHashMap) itemObj;
            item.setType((String) itemData.get("type"));
            item.setName((String) itemData.get("name"));
            item.setEntry((String) itemData.get("entry"));
            finalItemsList.add(item);
          });
          entryList.setItems(finalItemsList.toArray(new ActionEntry.EntryList.Item[finalItemsList.size()]));
        }

        entry.setMultiple(entryList);
        entries.add(entry);
      }
    }

    return entries.toArray(new ActionEntry[entries.size()]);
  }
}
