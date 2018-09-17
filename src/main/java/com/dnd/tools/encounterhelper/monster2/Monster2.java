package com.dnd.tools.encounterhelper.monster2;

import java.util.List;
import java.util.Set;
import lombok.Data;

@Data
public class Monster2 { // Uses empty lists instead of null lists

  private String name;
  private Set<Alignment> alignment; // See enum class for conversion details
  private Set<Environment> environments;
  private Size2 size; //Convert from T, S, M, L, H, G
  private String type; //Convert from either fixed string or object with type(string) and tags(array)
  private List<String> subTypes; // see above if it is string this is no subtype
  private BookSource bookSource; // Book monster is from with page (2 fields)  TODO convert to readable names
  private int armourClass; //TODO convert from []int with 1 record if not int it's an object with field for ac(int) and field from with String(array)
  private List<String> armourSources;
  private int averageHitPoints; // TODO convert from object with average field of type int
  private DiceFormula hpFormula; //TODO convert from String representation 3d6+6 (+X is optional)
  private Speed speed;  //TODO complex parse: see MM bestiary record for: Air Elemental  Going to normalize hover into a new movement option
  private boolean familiar;

  private AbilityScore strength;
  private AbilityScore dexterity;
  private AbilityScore constitution;
  private AbilityScore intelligence;
  private AbilityScore wisdom;
  private AbilityScore charisma;

  private Save strengthSave;
  private Save dexteritySave;
  private Save constitutionSave;
  private Save intelligenceSave;
  private Save wisdomSave;
  private Save charismaSave;

  private Skill athletics;
  private Skill acrobatics;
  private Skill slightOfHand;
  private Skill Stealth;
  private Skill arcana;
  private Skill history;
  private Skill investigation;
  private Skill nature;
  private Skill religion;
  private Skill animalHandling;
  private Skill insight;
  private Skill medicine;
  private Skill perception;
  private Skill survival;
  private Skill deception;
  private Skill intimidation;
  private Skill performance;
  private Skill persuasion;

  private List<Resistance> resistances;
  private List<Immunity> immunities;
  private Set<Condition> conditionImmunity;

  private Set<String> senses;
  private int passivePerception;
  private Set<String> languages;
  private Double challengeRatings;

  private List<Ability> trait;
  private List<Ability> action;
  private List<Ability> reaction;
  private List<Ability> legendaryAction;

  //spellcasting, variant
}
