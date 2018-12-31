package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonRegionalEffect;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonRegionalTable;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class RegionalEffectDeserializer extends JsonDeserializer<JsonRegionalEffect[]> {

  @Override
  public JsonRegionalEffect[] deserialize(JsonParser jsonParser,
                                      DeserializationContext deserializationContext)
      throws IOException {
    Object[] regionalEffectObjects = jsonParser.readValueAs(Object[].class);
    List<JsonRegionalEffect> regionalEffects = new ArrayList<>();

    for(Object regionalEffectObj : regionalEffectObjects) {
      JsonRegionalEffect regionalEffect = new JsonRegionalEffect();
      if(regionalEffectObj instanceof String) {
        regionalEffect.setEffect((String) regionalEffectObj);
      } else {
        Map<?, ?> regionalEffectObjMap = (LinkedHashMap) regionalEffectObj;
        if(regionalEffectObjMap.get("type").equals("list")) {
          //List of Strings
          if (regionalEffectObjMap.get("items") != null) {
            List<?> regionalEffectObjList = (ArrayList) regionalEffectObjMap.get("items");
            List<String> regionalEffectList = new ArrayList<>();
            regionalEffectObjList.stream()
                .forEach(item -> regionalEffectList.add((String) item));
            regionalEffect.setEffectList(regionalEffectList);
          }
        } else {
          //Entry
          JsonRegionalTable table = new JsonRegionalTable();
          if(regionalEffectObjMap.get("entries") != null) {
            List<?> entriesObjList = (ArrayList) regionalEffectObjMap.get("entries");
            table.setTableDescription((String) entriesObjList.get(0));

            // Handle the table information
            Map<?, ?> tableObjMap = (LinkedHashMap) entriesObjList.get(1);

            //caption
            table.setCaption((String) tableObjMap.get("caption"));

            //column labels
            List<?> columnLabels = (ArrayList) tableObjMap.get("colLabels");
            table.setColumn1Label((String) columnLabels.get(0));
            table.setColumn2Label((String) columnLabels.get(1));

            //column data
            List<String> column1Data = new ArrayList<>();
            List<String> column2Data = new ArrayList<>();
            List<?> rows = (ArrayList) tableObjMap.get("rows");
            for(Object row : rows) {
              List<?> rowData = (ArrayList) row;
              column1Data.add((String) rowData.get(0));
              column2Data.add((String) rowData.get(1));
            }
            table.setColumn1Data(column1Data.toArray(new String[column1Data.size()]));
            table.setColumn2Data(column2Data.toArray(new String[column2Data.size()]));

            regionalEffect.setRegionalTable(table);
          }
        }
      }
      regionalEffects.add(regionalEffect);
    }

    return regionalEffects.toArray(new JsonRegionalEffect[regionalEffects.size()]);
  }
}
