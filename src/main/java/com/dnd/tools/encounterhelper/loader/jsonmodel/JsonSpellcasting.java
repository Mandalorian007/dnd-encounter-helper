package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class JsonSpellcasting {
  //innate spellcasting
  private String name;
  private String[] headerEntries;
  private JsonDailySpells daily;
  private String ability;

  //regular spells
  private JsonSpells spells;
  @JsonAlias({"will", "headerWill"})
  private String[] will;

  //other
  private String[] footerEntries;
  //private String[] headerWill;
}