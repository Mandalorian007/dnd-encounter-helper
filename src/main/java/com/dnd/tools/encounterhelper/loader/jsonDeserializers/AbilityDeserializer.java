package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonAbility;
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
import java.util.Map;

public class AbilityDeserializer extends JsonDeserializer<JsonAbility[]> {

  @Override
  public JsonAbility[] deserialize(JsonParser p, DeserializationContext ctxt)
      throws IOException, JsonProcessingException {
    Object[] topLevelActions = p.readValueAs(Object[].class);

    List<JsonAbility> finalJsonAbilityList = new ArrayList<>();
    for(Object action: topLevelActions) {
      Map<?, ?> actionMap = (LinkedHashMap) action;
      //Validate fields
      Map<?, ?> tempMap = new HashMap<>(actionMap);
      //Note: type exists but is ignored only 1 example in Trait of Asharra from toa source
      tempMap.keySet().removeAll(Arrays.asList("name", "entries", "attack", "type"));
      if(tempMap.size() > 0) {
        throw new RuntimeException("Found unexpected to level fields in Ability Model: " + tempMap.keySet());
      }

      //Parse
      JsonAbility jsonAbility = new JsonAbility();
      jsonAbility.setName((String) actionMap.get("name"));

      //Note attack is a legendary action specific field
      if(actionMap.get("attack") != null) {
        List<?> attacks = (ArrayList) actionMap.get("attack");
        for(Object attack: attacks) {
          if(jsonAbility.getAttack() == null) {
            jsonAbility.setAttack((String) attack);
          } else {
            jsonAbility.setAttack(jsonAbility.getAttack() + "," + attack);
          }
        }
      }

      List<String> entries = new ArrayList<>();
      List<JsonAbility> subEntries = new ArrayList<>();
      List entriesObj = (ArrayList) actionMap.get("entries");
      for(Object entry  : entriesObj) {
        if(entry instanceof String) {
          entries.add((String) entry);
        } else if(entry instanceof LinkedHashMap) {
          Map<?,?> entryMap = (LinkedHashMap) entry;
          //Validate fields
          Map<?, ?> tempMap2 = new HashMap<>(entryMap);
          //Note: entries type is specifically for inline types
          tempMap2.keySet().removeAll(Arrays.asList("type", "items", "style", "entries"));
          if(tempMap2.size() > 0) {
           throw new RuntimeException("Found unexpected to level fields in Ability Model: " + tempMap2.keySet());
          }

          //Parse (Note: style element is always ignored)]
          String type = (String) entryMap.get("type");
          if(type.equals("list")) {
            List<String> finalNestedEntries = new ArrayList<>();
            List<?> itemsObj = (ArrayList) entryMap.get("items");
            /*This list will either be all Strings or all LinkedHashMaps
            Strings will become a list of items
            LinkedHashMaps will become a list of JsonActions
            */
            //Test list type for parsing logic
            if(itemsObj.get(0) instanceof String) {
              List<String> nestedItemsList = new ArrayList<>();
              for(Object itemObj : itemsObj) {
                if(itemObj instanceof String) {
                  nestedItemsList.add((String) itemObj);
                }else {
                  throw new RuntimeException("Unrecognized Nested Ability type: " + itemObj.getClass());
                }
              }
              JsonAbility nestedJsonAbility = new JsonAbility();
              nestedJsonAbility.setEntries(finalNestedEntries.toArray(new String[finalNestedEntries.size()]));
              subEntries.add(nestedJsonAbility);
            } else { // LinkedHashMap
              for(Object itemObj : itemsObj) {
                if(itemObj instanceof LinkedHashMap) {
                  Map<?,?> itemObjMap = (LinkedHashMap) itemObj;
                  //Validate fields
                  Map<?,?> temp = new HashMap<>(itemObjMap);
                  temp.keySet().removeAll(Arrays.asList("type", "name", "entry"));
                  if(temp.size() > 0) {
                    throw new RuntimeException("Found unexpected field in an item list for abilities: " + temp.keySet());
                  }

                  //Parse (Note: only valid type is item at this point will ignore it)
                  JsonAbility nestedJsonAbility = new JsonAbility();
                  nestedJsonAbility.setName((String) itemObjMap.get("name"));
                  nestedJsonAbility.setEntries(new String[] {(String) itemObjMap.get("entry")});
                  subEntries.add(nestedJsonAbility);
                }else {
                  throw new RuntimeException("Unrecognized Nested Ability type: " + itemObj.getClass());
                }
              }
            }

          } else if(type.equals("inline")){
            //Note: special case see oota trait for creature: Deepking Horgar Steelshadow V
            List<?> entryList = (ArrayList) entryMap.get("entries");
            String result = "";
            for(int i = 0; i < entryList.size(); i++) {
              if( i == 0 || i == 2) {
                result = result.concat((String) entryList.get(i));
              } else {
                Map<?,?> bogus = (LinkedHashMap) entryList.get(i);
                result = result.concat((String) bogus.get("text"));
              }
            }
            JsonAbility nestedJsonAbility = new JsonAbility();
            nestedJsonAbility.setEntries(new String[] {result});
            subEntries.add(nestedJsonAbility);

          } else {
            throw new RuntimeException("Found unexpected type of: " + type);
          }

        } else {
          throw new RuntimeException("Unexpected ability entry type: " + entry.getClass());
        }
      }
      jsonAbility.setEntries(entries.toArray(new String[entries.size()]));
      jsonAbility.setSubEntries(subEntries.toArray(new JsonAbility[subEntries.size()]));
      finalJsonAbilityList.add(jsonAbility);
    }

    return finalJsonAbilityList.toArray(new JsonAbility[finalJsonAbilityList.size()]);
  }
}
