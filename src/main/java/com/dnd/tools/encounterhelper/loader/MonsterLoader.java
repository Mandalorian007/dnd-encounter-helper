package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonmodel.Monster;
import com.dnd.tools.encounterhelper.loader.jsonmodel.MonsterList;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class MonsterLoader implements CommandLineRunner {

  private final ResourceLoader resourceLoader;

  @Override
  public void run(String... args) throws Exception {
    log.info("Loading Monster Data");
    List<Resource> resources = Arrays.asList(
        ResourcePatternUtils
            .getResourcePatternResolver(resourceLoader)
            .getResources("classpath:/monster-data/*"));

    resources = resources.stream()
        //TODO figure out what to do with this file
        .filter(resource -> !resource.getFilename().equals("meta.json"))
        .collect(Collectors.toList());

    ObjectMapper objectMapper = new ObjectMapper();
    List<Monster> monsterLists = new ArrayList<>();

    for (Resource resource : resources) {
      log.info("Loading monsters from: " + resource.getFilename());
      MonsterList monsterList =
          objectMapper.readValue(resource.getInputStream(), MonsterList.class);
      if (monsterList != null) {
        monsterLists.addAll(monsterList.getMonster());
      }
    }

    log.info("Loaded Monster Count: " + monsterLists.size());

  }
}
