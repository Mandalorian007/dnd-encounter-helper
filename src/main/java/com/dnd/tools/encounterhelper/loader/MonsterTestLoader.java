package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonmodel.MonsterList;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;

public class MonsterTestLoader {

  public static void main(String[] args) throws Exception {
    ObjectMapper objectMapper = new ObjectMapper();
    InputStream inputStream =
        MonsterTestLoader.class.getResourceAsStream("/monster-data/bestiary-mm.json");
    //dmg only 3 monsters

    MonsterList monsterList = objectMapper.readValue(inputStream, MonsterList.class);

    System.out.println(monsterList.getMonster().size());

   monsterList.getMonster().stream()
        .forEach(System.out::println);
  }
}
