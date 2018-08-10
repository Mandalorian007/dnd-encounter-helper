package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonmodel.MonsterJsonPojo;
import com.dnd.tools.encounterhelper.monster.Action;
import com.dnd.tools.encounterhelper.monster.Monster;
import com.dnd.tools.encounterhelper.monster.MonsterRepository;
import com.dnd.tools.encounterhelper.monster.Size;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class MonsterLoader implements CommandLineRunner {
  // Json monster data from: https://github.com/adrpadua/5e-database/blob/master/5e-SRD-Monsters.json
  private final InputStream monsters;
  private final MonsterRepository monsterRepository;

  public MonsterLoader(MonsterRepository monsterRepository) throws IOException {
    monsters = new ClassPathResource("5e-SRD-Monsters.json").getInputStream();
    this.monsterRepository = monsterRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    ObjectMapper objectMapper = new ObjectMapper();
    List<MonsterJsonPojo> monsterJsonPojoList =
        Arrays.asList(objectMapper.readValue(monsters, MonsterJsonPojo[].class));

    List<Monster> monsterList = monsterJsonPojoList.stream()
        .map(jsonPojo -> {
          Monster monster = new Monster();

          monster.setName(jsonPojo.getName());
          monster.setSize(Size.valueOf(jsonPojo.getSize().toUpperCase()));
          monster.setType(jsonPojo.getType());
          monster.setSubType(jsonPojo.getSubtype());
          monster.setArmourClass(parseInt(jsonPojo.getArmor_class()));
          monster.setHitDice(jsonPojo.getHit_dice());
          monster.setHitPoints(parseInt(jsonPojo.getHit_points()));
          monster.setSpeed(jsonPojo.getSpeed());

          monster.setStrength(parseInt(jsonPojo.getStrength()));
          monster.setDexterity(parseInt(jsonPojo.getDexterity()));
          monster.setConstitution(parseInt(jsonPojo.getConstitution()));
          monster.setIntelligence(parseInt(jsonPojo.getIntelligence()));
          monster.setWisdom(parseInt(jsonPojo.getWisdom()));
          monster.setCharisma(parseInt(jsonPojo.getCharisma()));

          monster.setStrengthSave(parseInt(jsonPojo.getStrength_save()));
          monster.setDexteritySave(parseInt(jsonPojo.getDexterity_save()));
          monster.setConstitutionSave(parseInt(jsonPojo.getConstitution_save()));
          monster.setIntelligenceSave(parseInt(jsonPojo.getIntelligence_save()));
          monster.setWisdomSave(parseInt(jsonPojo.getWisdom_save()));
          monster.setCharismaSave(parseInt(jsonPojo.getCharisma_save()));

          monster.setPerceptionMod(parseInt(jsonPojo.getPerception()));
          monster.setStealth(parseInt(jsonPojo.getStealth()));
          monster.setDamageVulnerabilities(jsonPojo.getDamage_vulnerabilities());
          monster.setDamageImmunities(jsonPojo.getDamage_immunities());
          monster.setCondititonImmunities(jsonPojo.getCondition_immunities());
          monster.setSenses(jsonPojo.getSenses());
          double challengeRating;
          String input = jsonPojo.getChallenge_rating();
          if (input.contains("/")) {
            String[] rat = input.split("/");
            challengeRating = Double.parseDouble(rat[0]) / Double.parseDouble(rat[1]);
          } else {
            challengeRating = Double.parseDouble(input);
          }
          monster.setChallengeRating(challengeRating);

          if (jsonPojo.getSpecial_abilities() != null) {
            monster.setSpecialAbilities(
                jsonPojo.getSpecial_abilities().stream()
                    .map(sa -> {
                      Action action = new Action();
                      action.setName(sa.getName());
                      action.setDescription(sa.getDesc());
                      action.setAttackBonus(parseInt(sa.getAttack_bonus()));
                      action.setDamageDice(sa.getDamage_dice());
                      action.setDamageBonus(sa.getDamage_bonus());
                      return action;
                    })
                    .collect(Collectors.toList())
            );
          }

          if (jsonPojo.getActions() != null) {
            monster.setActions(
                jsonPojo.getActions().stream()
                    .map(act -> {
                      Action action = new Action();
                      action.setName(act.getName());
                      action.setDescription(act.getDesc());
                      action.setAttackBonus(parseInt(act.getAttack_bonus()));
                      action.setDamageDice(act.getDamage_dice());
                      action.setDamageBonus(act.getDamage_bonus());
                      return action;
                    })
                    .collect(Collectors.toList())
            );
          }

          if (jsonPojo.getReactions() != null) {
            monster.setReactions(
                jsonPojo.getReactions().stream()
                    .map(react -> {
                      Action reaction = new Action();
                      reaction.setName(react.getName());
                      reaction.setDescription(react.getDesc());
                      reaction.setAttackBonus(parseInt(react.getAttack_bonus()));
                      reaction.setDamageBonus(react.getDamage_bonus());
                      return reaction;
                    })
                    .collect(Collectors.toList())
            );
          }

          if (jsonPojo.getLegendary_actions() != null) {
            monster.setLegendaryActions(
                jsonPojo.getLegendary_actions().stream()
                    .map(legend -> {
                      Action legendaryAction = new Action();
                      legendaryAction.setName(legend.getName());
                      legendaryAction.setDescription(legend.getDesc());
                      legendaryAction.setAttackBonus(parseInt(legend.getAttack_bonus()));
                      legendaryAction.setDamageDice(legend.getDamage_dice());
                      legendaryAction.setDamageBonus(legend.getDamage_bonus());
                      return legendaryAction;
                    })
                    .collect(Collectors.toList())
            );
          }
          return monster;
        })
        .collect(Collectors.toList());
    monsterRepository.saveAll(monsterList);
  }

  private Integer parseInt(String text) {
    if(text == null || text.isEmpty()) {
      return null;
    }
    try {
      return Integer.parseInt(text);
    } catch (Exception e) {
      return null;
    }
  }
}
