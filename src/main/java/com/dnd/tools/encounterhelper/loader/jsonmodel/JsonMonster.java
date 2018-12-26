package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.AcDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.AlignmentDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.ConditionImmuneDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.CrDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.ImmuneDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.JsonAbilityDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.MonsterTypeDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.ResistDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.VulnerableDeserializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonMonster {
  private String name;
  private String group;
  private Boolean isNPC;
  private String size;
  @JsonDeserialize(using = MonsterTypeDeserializer.class)
  private JsonMonsterType type;
  private String source;
  @JsonDeserialize(using = AlignmentDeserializer.class)
  private JsonAlignment[] alignment;
  @JsonDeserialize(using = AcDeserializer.class)
  private JsonAc[] ac;
  private JsonHp hp;
  private JsonSpeed speed;
  @JsonProperty("str")
  private int strength;
  @JsonProperty("dex")
  private int dexterity;
  @JsonProperty("con")
  private int constitution;
  @JsonProperty("int")
  private int intelligence;
  @JsonProperty("wis")
  private int wisdom;
  @JsonProperty("cha")
  private int charisma;
  private JsonSaves save;
  private JsonSkill skill;
  @JsonDeserialize(using = ResistDeserializer.class)
  private JsonResist[] resist;
  @JsonDeserialize(using = VulnerableDeserializer.class)
  private JsonVulnerable[] vulnerable;
  @JsonDeserialize(using = ImmuneDeserializer.class)
  private JsonImmune[] immune;
  @JsonDeserialize(using = ConditionImmuneDeserializer.class)
  private JsonConditionImmune[] conditionImmune;
  private String senses;
  private int passive;
  private String languages;
  @JsonDeserialize(using = CrDeserializer.class)
  private JsonCr cr;
  private JsonSpellcasting[] spellcasting;
  @JsonDeserialize(using = JsonAbilityDeserializer.class)
  private JsonAbility[] trait;
  @JsonDeserialize(using = JsonAbilityDeserializer.class)
  private JsonAbility[] action;
  @JsonDeserialize(using = JsonAbilityDeserializer.class)
  private JsonAbility[] reaction;
  private String legendaryGroup;
  private Integer legendaryActions;
  @JsonDeserialize(using = JsonAbilityDeserializer.class)
  private JsonAbility[] legendary;
  private String description;
  private JsonVariant[] variant;
  private int page;
  private Boolean familiar;
  private Boolean isNamedCreature;
  private String[] environment;
  private String soundClip;
  private String dragonCastingColor;
  private String[] traitTags;
  private String[] actionTags;
}
