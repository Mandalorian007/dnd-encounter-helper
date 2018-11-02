package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Saves {
  @JsonProperty("str")
  private String strength;
  @JsonProperty("dex")
  private String dexterity;
  @JsonProperty("con")
  private String constitution;
  @JsonProperty("int")
  private String intelligence;
  @JsonProperty("wis")
  private String wisdom;
  @JsonProperty("cha")
  private String charisma;
}
