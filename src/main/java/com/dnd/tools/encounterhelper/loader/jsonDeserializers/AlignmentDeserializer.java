package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonAlignment;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

public class AlignmentDeserializer extends JsonDeserializer<JsonAlignment[]> {

  @Override
  public JsonAlignment[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
      Object[] alignmentFields = p.readValueAs(Object[].class);
      boolean onlyStrings = true;
      for(Object obj : alignmentFields) {
        if (!(obj instanceof String)) {
          onlyStrings = false;
        }
      }

    if(onlyStrings) {
      List<String> alignments = Arrays.asList(alignmentFields).stream()
          .map(field -> (String) field)
          .collect(Collectors.toList());
      JsonAlignment alignment = new JsonAlignment();
      alignment.setAlignments(alignments.toArray(new String[alignments.size()]));
      alignment.setChance(100);
      return new JsonAlignment[]{alignment};
    } else {
      List<JsonAlignment> finalAlignmentList = new ArrayList<>();
      for (Object alignmentField : alignmentFields) {
        HashMap<?, ?> hashMap = (LinkedHashMap)alignmentField;
        JsonAlignment alignment = new JsonAlignment();
        ArrayList<String> alignmentList = (ArrayList<String>) hashMap.get("alignment");
        if(alignmentList != null) {
          alignment.setAlignments(alignmentList.toArray(new String[alignmentList.size()]));
        }
        Integer chance = (Integer) hashMap.get("chance");
        alignment.setChance(chance != null ? chance : 100);
        finalAlignmentList.add(alignment);
      }
      return finalAlignmentList.toArray(new JsonAlignment[finalAlignmentList.size()]);
    }

  }
}