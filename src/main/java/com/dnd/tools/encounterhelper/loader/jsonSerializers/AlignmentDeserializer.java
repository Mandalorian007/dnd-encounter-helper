package com.dnd.tools.encounterhelper.loader.jsonSerializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.Alignment;
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

public class AlignmentDeserializer extends JsonDeserializer<Alignment[]> {

  @Override
  public Alignment[] deserialize(JsonParser p, DeserializationContext ctxt)
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
      Alignment alignment = new Alignment();
      alignment.setAlignments(alignments.toArray(new String[alignments.size()]));
      alignment.setChance(100);
      return new Alignment[]{alignment};
    } else {
      List<Alignment> finalAlignmentList = new ArrayList<>();
      for (Object alignmentField : alignmentFields) {
        HashMap<?, ?> hashMap = (LinkedHashMap)alignmentField;
        Alignment alignment = new Alignment();
        ArrayList<String> alignmentList = (ArrayList<String>) hashMap.get("alignment");
        alignment.setAlignments(alignmentList.toArray(new String[alignmentList.size()]));
        alignment.setChance((Integer)hashMap.get("chance"));
        finalAlignmentList.add(alignment);
      }
      return finalAlignmentList.toArray(new Alignment[finalAlignmentList.size()]);
    }

  }
}