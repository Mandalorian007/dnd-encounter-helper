package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class JsonSpells {

  @JsonProperty("0")
  private Spell cantrips;

  @JsonProperty("1")
  private Spell firstLevel;

  @JsonProperty("2")
  private Spell secondLevel;

  @JsonProperty("3")
  private Spell thirdLevel;

  @JsonProperty("4")
  private Spell fourthLevel;

  @JsonProperty("5")
  private Spell fifthLevel;

  @JsonProperty("6")
  private Spell sixthLevel;

  @JsonProperty("7")
  private Spell seventhLevel;

  @JsonProperty("8")
  private Spell eighthLevel;

  @JsonProperty("9")
  private Spell ninthLevel;

  @Data
  public class Spell {
    private Integer slots;
    private String[] spells;
    @JsonIgnore
    private Integer lower;
  }
}
