package com.dnd.tools.encounterhelper.loader.jsonmodel;

import java.util.List;
import lombok.Data;

@Data
public class JsonRegionalEffect {
  private String effect;
  private List<String> effectList;
  private JsonRegionalTable regionalTable;
}
