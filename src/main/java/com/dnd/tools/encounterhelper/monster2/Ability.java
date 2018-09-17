package com.dnd.tools.encounterhelper.monster2;

import java.util.List;
import lombok.Data;

@Data
public class Ability {

  private String name;
  private List<Entry> entries;
}
