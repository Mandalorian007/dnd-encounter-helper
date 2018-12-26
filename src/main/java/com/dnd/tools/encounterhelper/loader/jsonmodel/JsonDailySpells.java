package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class JsonDailySpells {

  @JsonAlias({"1e", "1"})
  private String[] firstLevel;

  @JsonAlias({"2e", "2"})
  private String[] secondLevel;

  @JsonAlias({"3e", "3"})
  private String[] thirdLevel;
}
