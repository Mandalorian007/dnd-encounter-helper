package com.dnd.tools.encounterhelper.loader.jsonmodel;

import java.util.List;
import lombok.Data;

@Data
public class MonsterJsonPojo {

  private String alignment;

  private String hit_points;

  private String perception;

  private String wisdom;

  private String charisma;

  private String type;

  private String dexterity;

  private String languages;

  private List<Legendary_actions> legendary_actions;

  private String condition_immunities;

  private List<Special_abilities> special_abilities;

  private List<Reactions> reactions;

  private String intelligence_save;

  private String challenge_rating;

  private String name;

  private String wisdom_save;

  private String charisma_save;

  private String strength_save;

  private String dexterity_save;

  private String intelligence;

  private String index;

  private String damage_immunities;

  private String speed;

  private String strength;

  private String armor_class;

  private String url;

  private String hit_dice;

  private String size;

  private String history;

  private String subtype;

  private String constitution_save;

  private String damage_vulnerabilities;

  private List<Actions> actions;

  private String senses;

  private String constitution;

  private String damage_resistances;

  private String medicine;

  private String religion;

  private String stealth;

  private String persuasion;

  private String insight;

  private String deception;

  private String arcana;

  private String athletics;

  private String acrobatics;

  private String survival;

  private String investigation;

  private String nature;

  private String intimidation;

  private String performance;
}
