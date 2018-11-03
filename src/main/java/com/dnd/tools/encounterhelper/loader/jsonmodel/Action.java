package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.ActionEntryDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class Action {
  private String name;
  @JsonDeserialize(using = ActionEntryDeserializer.class)
  private ActionEntry[] entries;
}
