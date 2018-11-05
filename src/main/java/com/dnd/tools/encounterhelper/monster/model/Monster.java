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
public class Monster {

  @Id
  @GeneratedValue
  private Long id;

  private String name;
  @ElementCollection
  private List<AlignmentOption> alignment;
  @ElementCollection
  private Set<Environment> environments;
  @Enumerated(EnumType.STRING)
  private Size size;
  @Embedded
  private Type type;
  @Embedded
  private BookSource bookSource;
  @ElementCollection
  private List<ArmourClass> armourClass;
  @Embedded
  private Hp hp;
  @Embedded
  private Speed speed;
  private Boolean familiar;
  
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
  private Set<ConditionImmunity> conditionImmunity;

  @ElementCollection
  private Set<String> senses;
  private Integer passivePerception;
  @ElementCollection
  private Set<String> languages;
  @Embedded
  private ChallengeRating challengeRating;

 /* @ElementCollection
  private List<Ability> trait;
  @ElementCollection
  private List<Ability> action;
  @ElementCollection
  private List<Ability> reaction;
  @ElementCollection
  private List<Ability> legendaryAction;*/

  //spellcasting, variant
}
