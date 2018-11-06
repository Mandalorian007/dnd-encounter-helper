package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonVariant;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class VariantEntryDeSerializer extends JsonDeserializer<JsonVariant.VariantEntry[]> {

  @Override
  public JsonVariant.VariantEntry[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {

    List<?> variantEntryObjList = (ArrayList) p.readValueAs(Object.class);

    return parse(variantEntryObjList);
  }

  private JsonVariant.VariantEntry[] parse(Object variantEntryObjArray) {
    List<?> variantEntryObjList = (ArrayList) variantEntryObjArray;
    List<JsonVariant.VariantEntry> finalVariantEntries = new ArrayList<>();

    variantEntryObjList.stream().forEach(variantEntryObj -> {
      if(variantEntryObj instanceof String) {
        finalVariantEntries.add(getVarientEntryFromString((String) variantEntryObj));
      } else {
        // Nested Variant Entry object
        Map<?,?> nestedVariantEntryData = (LinkedHashMap) variantEntryObj;
        JsonVariant.VariantEntry variantEntry = new JsonVariant.VariantEntry();
        variantEntry.setName((String) nestedVariantEntryData.get("name"));
        variantEntry.setType((String) nestedVariantEntryData.get("type"));
        if(nestedVariantEntryData.get("entries") != null) {
          variantEntry.setEntries(parse(nestedVariantEntryData.get("entries")));
        }
        finalVariantEntries.add(variantEntry);
      }
    });

    return finalVariantEntries.toArray(new JsonVariant.VariantEntry[finalVariantEntries.size()]);
  }

  private JsonVariant.VariantEntry getVarientEntryFromString(String entry) {
    JsonVariant.VariantEntry variantEntry = new JsonVariant.VariantEntry();
    variantEntry.setEntry(entry);
    return variantEntry;
  }
}