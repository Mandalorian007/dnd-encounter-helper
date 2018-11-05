package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.RPGDice;
import com.dnd.tools.encounterhelper.loader.jsonmodel.*;
import com.dnd.tools.encounterhelper.monster.model.*;

import java.util.*;
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
    bookSource.setBookCode(jsonMonster.getSource());
    bookSource.setBook(getFullBookName(jsonMonster.getSource()));
    bookSource.setPage(jsonMonster.getPage());
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
              //TODO resolve Json handling of this
              //armourClass.setArmourSources(Arrays.asList(jsonArmourSources));
              armourClass.setArmourSources(String.join(",", jsonArmourSources));
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
    JsonResist[] jsonResists = jsonMonster.getResist();
    if(jsonResists != null) {
      List<Resistance> resistanceList = new ArrayList<>();
      Arrays.asList(jsonResists).forEach(jsonResist -> {
        // Currently resist has a String[] of resistances we will normalize this to 1 resist per
        if(jsonResist.getResist() != null) {
          Arrays.asList(jsonResist.getResist()).stream().forEach(damageType -> {
            Resistance resistance = new Resistance();
            resistance.setDamageType(getDamageTypeFromString(damageType));
            resistance.setNote(jsonResist.getNote());
            resistance.setPreNote(jsonResist.getPreNote());
            resistance.setSpecial(jsonResist.getSpecial());
            resistanceList.add(resistance);
          });

        } else {
          //Handle odd cases where there is content but no damage type
          Resistance resistance = new Resistance();
          resistance.setNote(jsonResist.getNote());
          resistance.setPreNote(jsonResist.getPreNote());
          resistance.setSpecial(jsonResist.getSpecial());
          resistanceList.add(resistance);
        }
      });
      monster.setResistances(resistanceList);
    }

    //Immunities
    JsonImmune[] jsonImmunities = jsonMonster.getImmune();
    if(jsonImmunities != null) {
      List<Immunity> finalImmunities = new ArrayList<>();
      Arrays.asList(jsonImmunities).stream().forEach(jsonImmunityObj -> {
        //Normalizing a list of list to a single list by duplicating the conditions
        String[] damageTypes = jsonImmunityObj.getImmune();
        if(damageTypes != null  && damageTypes.length > 0) {
          Arrays.asList(damageTypes).stream().forEach(damageType -> {
            Immunity immunity = new Immunity();
            immunity.setDamageType(getDamageTypeFromString(damageType));
            immunity.setCondition(jsonImmunityObj.getNote());
            finalImmunities.add(immunity);
          });
        } else {
          throw new RuntimeException("We have condition for Immunity but no damage type for monster: " + jsonMonster.getName());
        }
        monster.setImmunities(finalImmunities);
      });
    }

    //Condition Immunities
    JsonConditionImmune[] jsonConditionImmunes = jsonMonster.getConditionImmune();
    if(jsonConditionImmunes != null) {
      Set<ConditionImmunity> finalConditionImmunities = new HashSet<>();
      Arrays.asList(jsonConditionImmunes).stream().forEach(jsonConditionImmuneObj -> {
        //Normalizing a list of list to a single list by duplicating the conditions
        String[] condition = jsonConditionImmuneObj.getConditionImmune();
        if (condition != null && condition.length > 0) {
          Arrays.asList(condition).stream().forEach(jsonConditionString -> {
            ConditionImmunity conditionImmunity = new ConditionImmunity();
            conditionImmunity.setCondition(getConditionFromString(jsonConditionString));
            conditionImmunity.setNote(jsonConditionImmuneObj.getNote());
            finalConditionImmunities.add(conditionImmunity);
          });
        } else {
          throw new RuntimeException("We have condition for Immunity but no damage type for monster: " + jsonMonster.getName());
        }
        monster.setConditionImmunity(finalConditionImmunities);
      });
    }

    //Senses
    String jsonMonsterSenses = jsonMonster.getSenses();
    if(jsonMonsterSenses != null) {
      monster.setSenses(Set.of(jsonMonsterSenses.split(",")));
    }

    //Passive Perception
    monster.setPassivePerception(jsonMonster.getPassive());

    //Languages
    String jsonMonsterLanguages = jsonMonster.getLanguages();
    if(jsonMonsterLanguages != null) {
      monster.setLanguages(Set.of(jsonMonsterLanguages.split(",")));
    }

    //Challenge Rating
    if(jsonMonster.getCr() != null) {
      ChallengeRating challengeRating = new ChallengeRating();
      challengeRating.setChallengeRating(parseChallengeRating(jsonMonster.getCr().getCr()));
      challengeRating.setCoven(parseChallengeRating(jsonMonster.getCr().getCoven()));
      challengeRating.setChallengeRating(parseChallengeRating(jsonMonster.getCr().getLair()));
      monster.setChallengeRating(challengeRating);
    }

    //Trait

    //Action

    //Reaction

    //Legendary Action


    //Ancient Brass Dragon has a really good action model to think about
    //Deepking Horgar Steelshadow V has non list use case

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

  private static Map<String, String> bookCodeMap = new HashMap<>();
  static {
    // code -> book
    bookCodeMap.put("CoS", "Curse of Strahd");
    bookCodeMap.put("DMG",	"Dungeon Master's Guide");
    bookCodeMap.put("EEPC",	"Elemental Evil Player's Companion");
    bookCodeMap.put("EET", "Elemental Evil: Trinkets");
    bookCodeMap.put("HotDQ", "Hoard of the Dragon Queen");
    bookCodeMap.put("LMoP",	"Lost Mine of Phandelver");
    bookCodeMap.put("Mag",	"Dragon Magazine");
    bookCodeMap.put("MM",	 "Monster Manual");
    bookCodeMap.put("OotA", "Out of the Abyss");
    bookCodeMap.put("PHB", 	"Player's Handbook");
    bookCodeMap.put("PotA",	"Princes of the Apocalypse");
    bookCodeMap.put("RoT", 	"The Rise of Tiamat");
    bookCodeMap.put("RoTOS", "The Rise of Tiamat Online Supplement");
    bookCodeMap.put("SCAG", "Sword Coast Adventurer's Guide");
    bookCodeMap.put("SKT", 	"Storm King's Thunder");
    bookCodeMap.put("ToA", 	"Tomb of Annihilation");
    bookCodeMap.put("ToD", 	"Tyranny of Dragons");
    bookCodeMap.put("TTP", 	"The Tortle Package");
    bookCodeMap.put("TftYP", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP", 	"Tales from the Yawning Portal");
    bookCodeMap.put("TYP_AtG", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_DiT", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_TFoF", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_THSoT", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_TSC", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_ToH", "Tales from the Yawning Portal");
    bookCodeMap.put("TYP_WPM", "Tales from the Yawning Portal");
    bookCodeMap.put("VGM", "Volo's Guide to Monsters");
    bookCodeMap.put("XGE", "Xanathar's Guide to Everything");
    bookCodeMap.put("OGA", "One Grung Above");
    bookCodeMap.put("MTF", "Mordenkainen's Tome of Foes");
    bookCodeMap.put("ALCoS", "Adventurers League:Curse of Strahd");
    bookCodeMap.put("ALEE", "Adventurers League:Elemental Evil");
    bookCodeMap.put("ALRoD", "Adventurers League:Rage of Demons");
    bookCodeMap.put("PSA", "Plane Shift: Amonkhet");
    bookCodeMap.put("PSI", "Plane Shift: Innistrad");
    bookCodeMap.put("PSK", "Plane Shift: Kaladesh");
    bookCodeMap.put("PSZ", "Plane Shift: Zendikar");
    bookCodeMap.put("PSX", "Plane Shift: Ixalan");
    bookCodeMap.put("PSD", "Plane Shift: Dominaria");
    bookCodeMap.put("UAA", "Unearthed Arcana: Artificer");
    bookCodeMap.put("UAEAG", "Unearthed Arcana: Eladrin and Gith");
    bookCodeMap.put("UAEBB", "Unearthed Arcana: Eberron");
    bookCodeMap.put("UAFFR", "Unearthed Arcana: Feats for Races");
    bookCodeMap.put("UAFFS", "Unearthed Arcana: Feats for Skills");
    bookCodeMap.put("UAFO", "Unearthed Arcana: Fiendish Options");
    bookCodeMap.put("UAFT",	"Unearthed Arcana: Feats");
    bookCodeMap.put("UAGH",	"Unearthed Arcana: Gothic Heroes");
    bookCodeMap.put("UAMDM", "Unearthed Arcana: Modern Magic");
    bookCodeMap.put("UASSP", "Unearthed Arcana: Starter Spells");
    bookCodeMap.put("UATMC", "Unearthed Arcana: The Mystic Class");
    bookCodeMap.put("UATOBM", "Unearthed Arcana: That Old Black Magic");
    bookCodeMap.put("UATRR", "Unearthed Arcana: The Ranger, Revised");
    bookCodeMap.put("UAWA", "Unearthed Arcana: Waterborne Adventures");
    bookCodeMap.put("UAVR", "Unearthed Arcana: Variant Rules");
    bookCodeMap.put("UALDR", "Unearthed Arcana: Light, Dark, Underdark!");
    bookCodeMap.put("UARAR", "Unearthed Arcana: Ranger and Rogue");
    bookCodeMap.put("UAATOSC",	"Unearthed Arcana: A Trio of Subclasses");
    bookCodeMap.put("UABPP", "Unearthed Arcana: Barbarian Primal Paths");
    bookCodeMap.put("UARSC", "Unearthed Arcana: Revised Subclasses");
    bookCodeMap.put("UAKOO", "Unearthed Arcana: Kits of Old");
    bookCodeMap.put("UABBC", "Unearthed Arcana: Bard: Bard Colleges");
    bookCodeMap.put("UACDD", "Unearthed Arcana: Cleric: Divine Domains");
    bookCodeMap.put("UAD", "Unearthed Arcana: Druid");
    bookCodeMap.put("UARCO", "Unearthed Arcana: Revised Class Options");
    bookCodeMap.put("UAF", "Unearthed Arcana: Fighter");
    bookCodeMap.put("UAM", "Unearthed Arcana: Monk");
    bookCodeMap.put("UAP",	"Unearthed Arcana: Paladin");
    bookCodeMap.put("UAMC",	"Unearthed Arcana: Modifying Classes");
    bookCodeMap.put("UAS", "Unearthed Arcana: Sorcerer");
    bookCodeMap.put("UAWAW", "Unearthed Arcana: Warlock and Wizard");
    bookCodeMap.put("UATF", "Unearthed Arcana: The Faithful");
    bookCodeMap.put("UAWR",	 "Unearthed Arcana: Wizard Revisited");
    bookCodeMap.put("UAESR", "Unearthed Arcana: Elf Subraces");
    bookCodeMap.put("UAMAC", "Unearthed Arcana: Mass Combat");
    bookCodeMap.put("UA3PE", "Unearthed Arcana: Three-Pillar Experience");
    bookCodeMap.put("UAGHI", "Unearthed Arcana: Greyhawk Initiative");
    bookCodeMap.put("UATSC", "Unearthed Arcana: Three Subclasses");
    bookCodeMap.put("UAOD", "Unearthed Arcana: Order Domain");
    bookCodeMap.put("UACAM", "Unearthed Arcana: Centaurs and Minotaurs");
    bookCodeMap.put("UAGSS", "Unearthed Arcana: Giant Soul Sorcerer");
    bookCodeMap.put("UARoE", "Unearthed Arcana: Races of Eberron");
    bookCodeMap.put("UARoR", "Unearthed Arcana: Races of Ravnica");
    bookCodeMap.put("UAWGE", "Wayfinder's Guide to Eberron");
    bookCodeMap.put("STREAM", "Livestream");
    bookCodeMap.put("TWITTER", "Twitter");
  }
  private String getFullBookName(String bookCode) {
    if (!bookCodeMap.containsKey(bookCode)) {
      throw new RuntimeException("Unable to parse bookCode from string: " + bookCode);
    }
    return bookCodeMap.get(bookCode);
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

  private static Map<String, DamageType> damageTypeMap = new HashMap<>();
  static {
    damageTypeMap.put("ACID", DamageType.ACID);
    damageTypeMap.put("BLUDGEONING", DamageType.BLUDGEONING);
    damageTypeMap.put("COLD", DamageType.COLD);
    damageTypeMap.put("FIRE", DamageType.FIRE);
    damageTypeMap.put("FORCE", DamageType.FORCE);
    damageTypeMap.put("LIGHTNING", DamageType.LIGHTNING);
    damageTypeMap.put("NECROTIC", DamageType.NECROTIC);
    damageTypeMap.put("PIERCING", DamageType.PIERCING);
    damageTypeMap.put("POISON", DamageType.POISON);
    damageTypeMap.put("PSYCHIC", DamageType.PSYCHIC);
    damageTypeMap.put("RADIANT", DamageType.RADIANT);
    damageTypeMap.put("SLASHING", DamageType.SLASHING);
    damageTypeMap.put("THUNDER", DamageType.THUNDER);
  }
  private DamageType getDamageTypeFromString(String damageType) {
    damageType = damageType.toUpperCase();
    if (!damageTypeMap.containsKey(damageType)) {
      throw new RuntimeException("Unable to parse damageType from string: " + damageType);
    }
    return damageTypeMap.get(damageType);
  }

  private static Map<String, Condition> conditionMap = new HashMap<>();
  static {
    conditionMap.put("BLINDED", Condition.BLINDED);
    conditionMap.put("CHARMED", Condition.CHARMED);
    conditionMap.put("DEAFENED", Condition.DEAFENED);
    conditionMap.put("FATIGUED", Condition.FATIGUED);
    conditionMap.put("FRIGHTENED", Condition.FRIGHTENED);
    conditionMap.put("GRAPPLED", Condition.GRAPPLED);
    conditionMap.put("INCAPACITATED", Condition.INCAPACITATED);
    conditionMap.put("INVISIBILE", Condition.INVISIBILE);
    conditionMap.put("PARALYZED", Condition.PARALYZED);
    conditionMap.put("PETRIFIED", Condition.PETRIFIED);
    conditionMap.put("POISONED", Condition.POISONED);
    conditionMap.put("PRONE", Condition.PRONE);
    conditionMap.put("RESTRAINED", Condition.RESTRAINED);
    conditionMap.put("STUNNED", Condition.STUNNED);
    conditionMap.put("UNCONSCIOUS", Condition.UNCONSCIOUS);
    conditionMap.put("EXHAUSTION", Condition.EXHAUSTION);
  }
  private Condition getConditionFromString(String condition) {
    condition = condition.toUpperCase();
    if (!conditionMap.containsKey(condition)) {
      throw new RuntimeException("Unable to parse condition from string: " + condition);
    }
    return conditionMap.get(condition);
  }

  private Double parseChallengeRating(String challengeRating) {
    if(challengeRating == null) {
      return null;
    }
    switch (challengeRating) {
      case "Unknown":
        return null;
      case "1/8":
        return .125;
      case "1/4":
        return .25;
      case "1/2":
        return .5;
      default:
        try {
          return Double.parseDouble(challengeRating);
        } catch (Exception e) {
          throw new RuntimeException("Unable to parse challenge rating: " + challengeRating);
        }
    }
  }
}
