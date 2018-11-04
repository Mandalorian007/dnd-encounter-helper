package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.RPGDice;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonAc;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonAlignment;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonHp;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonster;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonMonsterType;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonSaves;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonSkill;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonSpeed;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonSpeedData;
import com.dnd.tools.encounterhelper.monster.model.Alignment;
import com.dnd.tools.encounterhelper.monster.model.AlignmentOption;
import com.dnd.tools.encounterhelper.monster.model.ArmourClass;
import com.dnd.tools.encounterhelper.monster.model.BookSource;
import com.dnd.tools.encounterhelper.monster.model.Environment;
import com.dnd.tools.encounterhelper.monster.model.Hp;
import com.dnd.tools.encounterhelper.monster.model.Monster;
import com.dnd.tools.encounterhelper.monster.model.Size;
import com.dnd.tools.encounterhelper.monster.model.Speed;
import com.dnd.tools.encounterhelper.monster.model.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class MonsterConverter {

  public Monster convert(JsonMonster jsonMonster) {
    Monster monster = new Monster();

    //Name
    monster.setName(jsonMonster.getName());

    //Alignment
    JsonAlignment[] jsonAlignments = jsonMonster.getAlignment();
    if (jsonAlignments != null) {
      List<AlignmentOption> alignmentOptions = Arrays.asList(jsonAlignments).stream()
          .map(jsonAlignment -> {
            AlignmentOption alignmentOption = new AlignmentOption();
            String[] alignments = jsonAlignment.getAlignments();
            if(alignments != null) {
              alignmentOption.setAlignment(
                  getAlignmentFromCodes(Set.of(alignments))
              );
            } else {
              alignmentOption.setAlignment(Alignment.ANY);
            }
            alignmentOption.setChance(jsonAlignment.getChance());
            return alignmentOption;
          }).collect(Collectors.toList());
      monster.setAlignment(alignmentOptions);
    } else {
      AlignmentOption alignmentOption = new AlignmentOption();
      alignmentOption.setAlignment(Alignment.ANY);
      alignmentOption.setChance(100);
    }

    //Environment
    String[] jsonMonsterEnvironment = jsonMonster.getEnvironment();
    if (jsonMonsterEnvironment != null && jsonMonsterEnvironment.length != 0) {
      Set<Environment> environments = Arrays.asList(jsonMonsterEnvironment).stream()
          .map(this::getEnvironmentFromString)
          .collect(Collectors.toSet());
      monster.setEnvironments(environments);
    }

    //Size
    monster.setSize(getSizeFromString(jsonMonster.getSize()));

    //Type
    JsonMonsterType jsonMonsterType = jsonMonster.getType();
    if(jsonMonsterType != null) {
      Type type = new Type();
      type.setType(jsonMonsterType.getType());
      if(jsonMonsterType.getTags() != null) {
        List<String> subTypes = Arrays.asList(jsonMonsterType.getTags()).stream()
            .map(tag -> tag.getTag())
            .filter(tag -> tag != null)
            .collect(Collectors.toList());
        type.setSubTypes(subTypes);
      }
      if(jsonMonsterType.getSwarmSize() != null) {
        type.setSwarmSize(getSizeFromString(jsonMonsterType.getSwarmSize()));
      }
      monster.setType(type);
    }

    //Book Source
    BookSource bookSource = new BookSource();
    bookSource.setPage(jsonMonster.getPage());
    bookSource.setBook(getFullBookName(jsonMonster.getSource()));
    monster.setBookSource(bookSource);

    //Armour Class
    JsonAc[] jsonMonsterAc = jsonMonster.getAc();
    if(jsonMonsterAc != null) {
      List<ArmourClass> armourClasses = Arrays.asList(jsonMonsterAc).stream()
          .map(jsonAc -> {
            ArmourClass armourClass = new ArmourClass();
            armourClass.setArmourClass(jsonAc.getAc());
            armourClass.setCondition(jsonAc.getCondition());
            String[] jsonArmourSources = jsonAc.getFrom();
            if (jsonArmourSources != null) {
              armourClass.setArmourSources(Arrays.asList(jsonArmourSources));
            }
            return armourClass;
          })
          .collect(Collectors.toList());
      monster.setArmourClass(armourClasses);

    } else {
      throw new RuntimeException("Missing AC for monster: " + jsonMonster.getName());
    }

    //HP
    JsonHp jsonHp = jsonMonster.getHp();
    if(jsonHp != null) {
      monster.setHp(parseHp(jsonHp));
    } else {
      throw new RuntimeException("Missing HP for monster: " + jsonMonster.getName());
    }

    //Speed
    JsonSpeed jsonSpeed = jsonMonster.getSpeed();
    if(jsonSpeed != null) {
      Speed speed = new Speed();
      //Walk
      JsonSpeedData jsonWalk = jsonSpeed.getWalk();
      if(jsonWalk != null) {
        speed.setWalk(jsonWalk.getNumber());
        speed.setWalkCondition(jsonWalk.getCondition());
      }
      //Burrow
      JsonSpeedData jsonBurrow = jsonSpeed.getBurrow();
      if(jsonBurrow != null) {
        speed.setBurrow(jsonBurrow.getNumber());
        speed.setBurrowCondition(jsonBurrow.getCondition());
      }
      //Climb
      JsonSpeedData jsonFly = jsonSpeed.getFly();
      if(jsonFly != null) {
        speed.setFly(jsonFly.getNumber());
        speed.setFlyCondition(jsonFly.getCondition());
      }
      //Swim
      JsonSpeedData jsonSwim = jsonSpeed.getSwim();
      if(jsonSwim != null) {
        speed.setSwim(jsonSwim.getNumber());
        speed.setSwimCondition(jsonSwim.getCondition());
      }
      //Hover
      speed.setHover(jsonSpeed.getCanHover());
    }

    //Familiar
    monster.setFamiliar(jsonMonster.getFamiliar());

    //Ability Scores
    monster.setStrength(jsonMonster.getStrength());
    monster.setDexterity(jsonMonster.getDexterity());
    monster.setConstitution(jsonMonster.getConstitution());
    monster.setIntelligence(jsonMonster.getIntelligence());
    monster.setWisdom(jsonMonster.getWisdom());
    monster.setCharisma(jsonMonster.getCharisma());

    //Saves
    JsonSaves jsonSaves = jsonMonster.getSave();
    if(jsonSaves != null) {
      String jsonSavesStrength = jsonSaves.getStrength();
      if(jsonSavesStrength != null) {
        monster.setStrengthSave(Integer.parseInt(jsonSavesStrength));
      }
      String jsonSavesDexterity = jsonSaves.getDexterity();
      if(jsonSavesDexterity != null) {
        monster.setDexteritySave(Integer.parseInt(jsonSavesDexterity));
      }
      String jsonSavesConstitution = jsonSaves.getConstitution();
      if(jsonSavesConstitution != null) {
        monster.setConstitutionSave(Integer.parseInt(jsonSavesConstitution));
      }
      String jsonSavesIntelligence = jsonSaves.getIntelligence();
      if(jsonSavesIntelligence != null) {
        monster.setIntelligenceSave(Integer.parseInt(jsonSavesIntelligence));
      }
      String jsonSavesWisdom = jsonSaves.getWisdom();
      if(jsonSavesWisdom != null) {
        monster.setWisdomSave(Integer.parseInt(jsonSavesWisdom));
      }
      String jsonSavesCharisma = jsonSaves.getCharisma();
      if(jsonSavesCharisma != null) {
        monster.setCharismaSave(Integer.parseInt(jsonSavesCharisma));
      }
    }

    //Skills
    JsonSkill jsonSkill = jsonMonster.getSkill();
    if(jsonSkill != null) {
      String jsonSkillAthletics = jsonSkill.getAthletics();
      if(jsonSkillAthletics != null) {
        monster.setAthletics(Integer.parseInt(jsonSkillAthletics));
      }
      String jsonSkillAcrobatics = jsonSkill.getAcrobatics();
      if(jsonSkillAcrobatics != null) {
        monster.setAcrobatics(Integer.parseInt(jsonSkillAcrobatics));
      }
      String jsonSkillSleightOfHand = jsonSkill.getSleightOfHand();
      if(jsonSkillSleightOfHand != null) {
        monster.setSlightOfHand(Integer.parseInt(jsonSkillSleightOfHand));
      }
      String jsonSkillStealth = jsonSkill.getStealth();
      if(jsonSkillStealth != null) {
        monster.setStealth(Integer.parseInt(jsonSkillStealth));
      }
      String jsonSkillArcana = jsonSkill.getArcana();
      if(jsonSkillArcana != null) {
        monster.setArcana(Integer.parseInt(jsonSkillArcana));
      }
      String jsonSkillHistory = jsonSkill.getHistory();
      if(jsonSkillHistory != null) {
        monster.setHistory(Integer.parseInt(jsonSkillHistory));
      }
      String jsonSkillInvestigation = jsonSkill.getInvestigation();
      if(jsonSkillInvestigation != null) {
        monster.setInvestigation(Integer.parseInt(jsonSkillInvestigation));
      }
      String jsonSkillNature = jsonSkill.getNature();
      if(jsonSkillNature != null) {
        monster.setNature(Integer.parseInt(jsonSkillNature));
      }
      String jsonSkillReligion = jsonSkill.getReligion();
      if(jsonSkillReligion != null) {
        monster.setReligion(Integer.parseInt(jsonSkillReligion));
      }
      String jsonSkillAnimalHandling = jsonSkill.getAnimalHandling();
      if(jsonSkillAnimalHandling != null) {
        monster.setAnimalHandling(Integer.parseInt(jsonSkillAnimalHandling));
      }
      String jsonSkillInsight = jsonSkill.getInsight();
      if(jsonSkillInsight != null) {
        monster.setInvestigation(Integer.parseInt(jsonSkillInsight));
      }
      String jsonSkillMedicine = jsonSkill.getMedicine();
      if(jsonSkillMedicine != null) {
        monster.setMedicine(Integer.parseInt(jsonSkillMedicine));
      }
      String jsonSkillPerception = jsonSkill.getPerception();
      if(jsonSkillPerception != null) {
        monster.setPerception(Integer.parseInt(jsonSkillPerception));
      }
      String jsonSkillSurvival = jsonSkill.getSurvival();
      if(jsonSkillSurvival != null) {
        monster.setSurvival(Integer.parseInt(jsonSkillSurvival));
      }
      String jsonSkillDeception = jsonSkill.getDeception();
      if(jsonSkillDeception != null) {
        monster.setDeception(Integer.parseInt(jsonSkillDeception));
      }
      String jsonSkillIntimidation = jsonSkill.getIntimidation();
      if(jsonSkillIntimidation != null) {
        monster.setIntimidation(Integer.parseInt(jsonSkillIntimidation));
      }
      String jsonSkillPerformance = jsonSkill.getPerformance();
      if(jsonSkillPerformance != null) {
        monster.setPerformance(Integer.parseInt(jsonSkillPerformance));
      }
      String jsonSkillPersuasion = jsonSkill.getPersuasion();
      if(jsonSkillPersuasion != null) {
        monster.setPersuasion(Integer.parseInt(jsonSkillPersuasion));
      }
    }

    //Resistances

    return monster;
  }

  private static Map<Alignment, Set<String>> alignmentMap = new HashMap<>();

  static {
    alignmentMap.put(Alignment.ANY_NON_GOOD, new HashSet<>(Set.of("L", "NX", "C", "NY", "E")));
    alignmentMap.put(Alignment.ANY_NON_LAWFUL, new HashSet<>(Set.of("NX", "C", "G", "NY", "E")));
    alignmentMap.put(Alignment.ANY_CHAOTIC, new HashSet<>(Set.of("C", "G", "NY", "E")));
    alignmentMap.put(Alignment.ANY_EVIL, new HashSet<>(Set.of("C", "E", "NX", "L")));
    alignmentMap.put(Alignment.ANY, new HashSet<>(Set.of("A")));
    alignmentMap.put(Alignment.UNALIGNED, new HashSet<>(Set.of("U")));
    alignmentMap.put(Alignment.CHAOTIC_EVIL, new HashSet<>(Set.of("C", "E")));
    alignmentMap.put(Alignment.CHAOTIC_NEUTRAL, new HashSet<>(Set.of("C", "N")));
    alignmentMap.put(Alignment.CHAOTIC_GOOD, new HashSet<>(Set.of("C", "G")));
    alignmentMap.put(Alignment.NEUTRAL_EVIL, new HashSet<>(Set.of("N", "E")));
    alignmentMap.put(Alignment.NEUTRAL, new HashSet<>(Set.of("N")));
    alignmentMap.put(Alignment.NEUTRAL_GOOD, new HashSet<>(Set.of("N", "G")));
    alignmentMap.put(Alignment.LAWFUL_EVIL, new HashSet<>(Set.of("L", "E")));
    alignmentMap.put(Alignment.LAWFUL_NEUTRAL, new HashSet<>(Set.of("L", "N")));
    alignmentMap.put(Alignment.LAWFUL_GOOD, new HashSet<>(Set.of("L", "G")));

  }

  private Alignment getAlignmentFromCodes(Set<String> alignmentCodes) {
    alignmentCodes = new HashSet<>(alignmentCodes);
    for (Map.Entry<Alignment, Set<String>> entry : alignmentMap.entrySet()) {
      if (entry.getValue().equals(alignmentCodes)) {
        return entry.getKey();
      }
    }
    throw new RuntimeException("Unable to locate alignment for codes: " + alignmentCodes);
  }

  private Environment getEnvironmentFromString(String environment) {
    environment = environment.toUpperCase();
    try {
      return Environment.valueOf(environment);
    } catch (Exception e) {
      throw new RuntimeException("Unable to parse environment from string: " + environment);
    }
  }

  private static Map<String, Size> sizeMap = new HashMap<>();
  static {
    sizeMap.put("TINY", Size.TINY);
    sizeMap.put("T", Size.TINY);
    sizeMap.put("SMALL", Size.SMALL);
    sizeMap.put("S", Size.SMALL);
    sizeMap.put("MEDIUM", Size.MEDIUM);
    sizeMap.put("M", Size.MEDIUM);
    sizeMap.put("LARGE", Size.LARGE);
    sizeMap.put("L", Size.LARGE);
    sizeMap.put("HUGE", Size.HUGE);
    sizeMap.put("H", Size.HUGE);
    sizeMap.put("GARGANTUAN", Size.GARGANTUAN);
    sizeMap.put("G", Size.GARGANTUAN);
  }
  private Size getSizeFromString(String size) {
    size = size.toUpperCase();
    if (!sizeMap.containsKey(size)) {
      throw new RuntimeException("Unable to parse size from string: " + size);
    }
    return sizeMap.get(size);
  }

  //TODO convert to full book name
  private String getFullBookName(String bookCode) {
    return bookCode;
  }

  private Hp parseHp(JsonHp jsonHp) {
    Hp hp = new Hp();
    hp.setAverageHp(jsonHp.getAverage());
    if(jsonHp.getSpecial() == null) {
      RPGDice parse = RPGDice.parse(jsonHp.getFormula());
      hp.setNumOfDice(parse.getRolls());
      hp.setSizeOfDie(parse.getFaces());
      hp.setFlatBonus(parse.getAdditive());
    } else {
      hp.setNumOfDice(0);
      hp.setSizeOfDie(0);
      hp.setFlatBonus(0);
    }
    hp.setSpecial(jsonHp.getSpecial());
    return hp;
  }
}
