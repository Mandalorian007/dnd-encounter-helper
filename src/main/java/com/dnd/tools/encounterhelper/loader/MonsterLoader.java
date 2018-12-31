package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonLegendaryGroup;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonLegendaryList;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonster;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonsterList;
import com.dnd.tools.encounterhelper.monster.MonsterRepository;
import com.dnd.tools.encounterhelper.monster.model.LairAction;
import com.dnd.tools.encounterhelper.monster.model.Monster;
import com.dnd.tools.encounterhelper.monster.model.RegionalEffect;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
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
  private final MonsterConverter monsterConverter;
  private final LegendaryDataConverter legendaryDataConverter;
  private final MonsterRepository monsterRepository;

  @Override
  public void run(String... args) throws Exception {
    log.info("Loading monster data");
    List<Resource> resources = Arrays.asList(
        ResourcePatternUtils
            .getResourcePatternResolver(resourceLoader)
            .getResources("classpath:/monster-data/*"));

    ObjectMapper objectMapper = new ObjectMapper();
    List<JsonMonster> monsterLists = new ArrayList<>();
    List<JsonLegendaryGroup> legendaryData = new ArrayList<>();

    for (Resource resource : resources) {
      String filename = resource.getFilename();
      if (!filename.equals("meta.json")) {
        log.info("Loading monsters from: " + filename);
        JsonMonsterList monsterList =
            objectMapper.readValue(resource.getInputStream(), JsonMonsterList.class);
        if (monsterList != null) {
          monsterLists.addAll(monsterList.getMonster());
        }
      } else {
        log.info("Loading legendary information.");
        JsonLegendaryList legendaryGroupData =
            objectMapper.readValue(resource.getInputStream(), JsonLegendaryList.class);
        legendaryData.addAll(legendaryGroupData.getLegendaryGroup());
      }
    }

    log.info("Loaded monster count: " + monsterLists.size());
    List<Monster> dbMonsterList = monsterLists.stream()
        .map(monsterConverter::convert)
        .collect(Collectors.toList());

    log.info("Attaching legendary information for " + legendaryData.size() + " monsters.");
    legendaryData.stream()
        .forEach(jsonLegendaryGroup -> {
          String monsterName = jsonLegendaryGroup.getName();

          //Lair Actions
          List<LairAction> lairActions = null;
          if(jsonLegendaryGroup.getLairActions() != null) {
            lairActions = Arrays.stream(jsonLegendaryGroup.getLairActions())
                    .map(legendaryDataConverter::convert)
                    .collect(Collectors.toList());
          }

          //Regional Effects
          List<RegionalEffect> regionalEffects = null;
          if(jsonLegendaryGroup.getRegionalEffects() != null) {
            regionalEffects =
                Arrays.stream(jsonLegendaryGroup.getRegionalEffects())
                    .map(legendaryDataConverter::convert)
                    .collect(Collectors.toList());
          }


          //Attach legendary monster data
          List<Monster> legendaryMonsterMatches = dbMonsterList.stream()
              .filter(monster -> {
                if(caseInsensitiveContains(monster.getName(), monsterName)) {
                  if(!monster.getName().contains("Dragon")) {
                    return true;
                  } else { //Only dragons old enough to have legendary actions get a lair
                    if(monster.getLegendaryAction() != null) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                } else {
                  return false;
                }
              })
              .collect(Collectors.toList());

          if(legendaryMonsterMatches.isEmpty()) {
            log.warn("Missing legendary monster: " + monsterName + " can't attach info.");
          } else {
            for(Monster monster : legendaryMonsterMatches) {
              if(lairActions != null) {
                List<LairAction> clonedLairActions = lairActions.stream()
                    .map(LairAction::copy)
                    .collect(Collectors.toList());
                monster.setLairActions(clonedLairActions);
              }
              if(regionalEffects != null) {
                List<RegionalEffect> clonedRegionalEffects = regionalEffects.stream()
                    .map(RegionalEffect::copy)
                    .collect(Collectors.toList());
                monster.setRegionalEffects(clonedRegionalEffects);
              }
            }
          }
        });

    monsterRepository.saveAll(dbMonsterList);
    log.info("DB Monster Count: " + dbMonsterList.size());

  }

  private boolean caseInsensitiveContains(String source, String match) {
    return Pattern.compile(Pattern.quote(match), Pattern.CASE_INSENSITIVE).matcher(source).find();
  }
}
