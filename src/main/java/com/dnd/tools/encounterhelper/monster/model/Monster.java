package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import java.util.Set;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Monster { // Uses empty lists instead of null lists

  @Id
  @GeneratedValue
  private Long id;

  private String name;
  @ElementCollection
  private Set<Alignment> alignment; // See enum class for conversion details
  @ElementCollection
  private Set<Environment> environments;
  @Enumerated(EnumType.STRING)
  private Size size; //Convert from T, S, M, L, H, G
  private String type; //Convert from either fixed string or object with type(string) and tags(array)
  @ElementCollection
  private List<String> subTypes; // see above if it is string this is no subtype
  @Embedded
  private BookSource bookSource; // Book monster is from with page (2 fields)  TODO convert to readable names
  private Integer armourClass; //TODO convert from []Integer with 1 record if not Integer it's an object with field for ac(Integer) and field from with String(array)
  @ElementCollection
  private List<String> armourSources;
  private Integer averageHitPoints; // TODO convert from object with average field of type Integer
  @Embedded
  private DiceFormula hpFormula; //TODO convert from String representation 3d6+6 (+X is optional)
  @Embedded
  private Speed speed;  //TODO complex parse: see MM bestiary record for: Air Elemental  Going to normalize hover into a new movement option
  private boolean familiar;
  
  private Integer strength;
  private Integer dexterity;
  private Integer constitution;
  private Integer intelligence;
  private Integer wisdom;
  private Integer charisma;

  private Integer strengthSave;
  private Integer dexteritySave;
  private Integer constitutionSave;
  private Integer intelligenceSave;
  private Integer wisdomSave;
  private Integer charismaSave;

  private Integer athletics;
  private Integer acrobatics;
  private Integer slightOfHand;
  private Integer Stealth;
  private Integer arcana;
  private Integer history;
  private Integer investigation;
  private Integer nature;
  private Integer religion;
  private Integer animalHandling;
  private Integer insight;
  private Integer medicine;
  private Integer perception;
  private Integer survival;
  private Integer deception;
  private Integer intimidation;
  private Integer performance;
  private Integer persuasion;

  @ElementCollection
  private List<Resistance> resistances;
  @ElementCollection
  private List<Immunity> immunities;
  @ElementCollection
  private Set<Condition> conditionImmunity;

  @ElementCollection
  private Set<String> senses;
  private Integer passivePerception;
  @ElementCollection
  private Set<String> languages;
  private Double challengeRatings;

  @ElementCollection
  private List<Ability> trait;
  @ElementCollection
  private List<Ability> action;
  @ElementCollection
  private List<Ability> reaction;
  @ElementCollection
  private List<Ability> legendaryAction;

  //spellcasting, variant
}
