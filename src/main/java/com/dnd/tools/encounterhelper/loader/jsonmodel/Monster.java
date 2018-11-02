package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonSerializers.AcDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.AlignmentDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.ConditionImmuneDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.CrDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.ImmuneDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.MonsterTypeDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.ResistDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonSerializers.VulnerableDeserializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class Monster {
  private String name;
  private String group;
  private Boolean isNPC;
  private String size;
  @JsonDeserialize(using = MonsterTypeDeserializer.class)
  private MonsterType type;
  private String source;
  @JsonDeserialize(using = AlignmentDeserializer.class)
  private Alignment[] alignment;
  @JsonDeserialize(using = AcDeserializer.class)
  private Ac[] ac;
  private Hp hp;
  private Speed speed;
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
  private Saves save;
  private Skill skill;
  @JsonDeserialize(using = ResistDeserializer.class)
  private Resist[] resist;
  @JsonDeserialize(using = VulnerableDeserializer.class)
  private Vulnerable[] vulnerable;
  @JsonDeserialize(using = ImmuneDeserializer.class)
  private Immune[] immune;
  @JsonDeserialize(using = ConditionImmuneDeserializer.class)
  private ConditionImmune[] conditionImmune;
  private String senses;
  private int passive;
  private String languages;
  @JsonDeserialize(using = CrDeserializer.class)
  private Cr cr;
  private Object spellcasting;
  private Trait[] trait;
  private Action[] action;
  private Reaction[] reaction;
  private String legendaryGroup;
  private Legendary[] legendary;
  private String description;
  private Variant[] variant;
  private int page;
  private Boolean familiar;
  private Boolean isNamedCreature;
  private String[] environment;
  private String soundClip;
  private String dragonCastingColor;
  private String[] traitTags;
  private String[] actionTags;
}
