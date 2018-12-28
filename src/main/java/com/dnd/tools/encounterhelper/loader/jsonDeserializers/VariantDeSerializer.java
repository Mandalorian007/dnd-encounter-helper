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

public class VariantDeSerializer extends JsonDeserializer<JsonVariant[]> {

  @Override
  public JsonVariant[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException {

    List<?> variantEntryObjList = (ArrayList) p.readValueAs(Object.class);

    return parse(variantEntryObjList);
  }

  private JsonVariant[] parse(Object variantEntryObjArray) {
    List<?> variantEntryObjList = (ArrayList) variantEntryObjArray;
    List<JsonVariant> finalVariantEntries = new ArrayList<>();
    variantEntryObjList.stream().forEach(variantEntryObj -> {
      JsonVariant variantEntry = new JsonVariant();
      if(variantEntryObj instanceof String) {
        variantEntry.setEntry((String) variantEntryObj);
      } else {
        // Nested Variant object
        Map<?,?> nestedVariantEntryData = (LinkedHashMap) variantEntryObj;
        variantEntry.setName((String) nestedVariantEntryData.get("name"));
        variantEntry.setType((String) nestedVariantEntryData.get("type"));
        if(nestedVariantEntryData.get("entries") != null) {
          variantEntry.setEntries(parse(nestedVariantEntryData.get("entries")));
        }
      }
      finalVariantEntries.add(variantEntry);
    });

    return finalVariantEntries.toArray(new JsonVariant[finalVariantEntries.size()]);
  }
}