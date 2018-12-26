package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class JsonDailySpells {

  @JsonProperty("1")
  private String[] one;

  @JsonProperty("1e")
  private String[] oneEach;

  @JsonProperty("2")
  private String[] two;

  @JsonProperty("2e")
  private String[] twoEach;

  @JsonProperty("3")
  private String[] three;

  @JsonProperty("3e")
  private String[] threeEach;
}
