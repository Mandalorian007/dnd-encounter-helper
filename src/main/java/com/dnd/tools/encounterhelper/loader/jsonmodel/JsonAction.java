package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.ActionEntryDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonAction {
  private String name;
  @JsonDeserialize(using = ActionEntryDeserializer.class)
  private JsonActionEntry[] entries;
}
