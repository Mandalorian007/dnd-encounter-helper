package com.dnd.tools.encounterhelper.monster;

import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import lombok.Data;

@Data
@Entity
public class Monster {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  @Enumerated(EnumType.STRING)
  private Size size;
  private String type;
  private String subType;
  private int armourClass;
  private String hitDice; //TODO maybe hitdice class
  private int hitPoints;
  private String speed;

  // Attributes
  private int strength;
  private int dexterity;
  private int constitution;
  private int intelligence;
  private int wisdom;
  private int charisma;

  //saves
  private int strengthSave;
  private int dexteritySave;
  private int constitutionSave;
  private int intelligenceSave;
  private int wisdomSave;
  private int charismaSave;

  private int perceptionMod;
  private String damageVulnerabilities;
  private String damageImmunities;
  private String condititonImmunities;
  private String senses;

  /* Valid settings
   0 1/8 1/4 1/2 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 26 30
   */
  private double challengeRating;

  @ElementCollection
  @CollectionTable(
      joinColumns = @JoinColumn(name = "monster_id")
  )
  private List<Action> specialAbilities;

  @ElementCollection
  @CollectionTable(
      joinColumns = @JoinColumn(name = "monster_id")
  )
  private List<Action> actions;

  @ElementCollection
  @CollectionTable(
      joinColumns = @JoinColumn(name = "monster_id")
  )
  private List<Action> legendaryActions;
}
