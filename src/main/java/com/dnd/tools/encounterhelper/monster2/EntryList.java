package com.dnd.tools.encounterhelper.monster2;

import java.util.List;
import lombok.Data;

@Data
public class EntryList extends Entry {
  private List<SubEntry> items;

}
