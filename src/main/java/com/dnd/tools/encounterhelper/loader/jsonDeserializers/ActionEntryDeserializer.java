package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonActionEntry;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ActionEntryDeserializer extends JsonDeserializer<JsonActionEntry[]> {

  @Override
  public JsonActionEntry[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] fields = p.readValueAs(Object[].class);

    List<JsonActionEntry> entries = new ArrayList<>();
    for(Object field: fields) {
      if(field instanceof String) {
        JsonActionEntry entry = new JsonActionEntry();
        entry.setSingle((String) field);
        entries.add(entry);
      } else {
        Map<?, ?> data = (LinkedHashMap) field;
        JsonActionEntry entry = new JsonActionEntry();
        JsonActionEntry.EntryList entryList = new JsonActionEntry.EntryList();
        entryList.setType((String) data.get("type"));
        entryList.setStyle((String) data.get("style"));
        List<?> itemObjList = (ArrayList) data.get("items");
        List<JsonActionEntry.EntryList.Item> finalItemsList = new ArrayList<>();
        if(itemObjList != null) {
          itemObjList.stream().forEach((itemObj) -> {
            JsonActionEntry.EntryList.Item item = new JsonActionEntry.EntryList.Item();
            if(itemObj instanceof String) {
              item.setName((String) itemObj);
              finalItemsList.add(item);
            } else {
              Map<?, ?> itemData = (LinkedHashMap) itemObj;
              item.setType((String) itemData.get("type"));
              item.setName((String) itemData.get("name"));
              item.setEntry((String) itemData.get("entry"));
              finalItemsList.add(item);
            }
          });
          entryList.setItems(finalItemsList.toArray(new JsonActionEntry.EntryList.Item[finalItemsList.size()]));
        }

        entry.setMultiple(entryList);
        entries.add(entry);
      }
    }

    return entries.toArray(new JsonActionEntry[entries.size()]);
  }
}
