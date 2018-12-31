package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.LairActionDeserializer;
import com.dnd.tools.encounterhelper.loader.jsonDeserializers.RegionalEffectDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonLegendaryGroup {
  private String name;
  @JsonDeserialize(using = LairActionDeserializer.class)
  private JsonLairAction[] lairActions;
  @JsonDeserialize(using = RegionalEffectDeserializer.class)
  private JsonRegionalEffect[] regionalEffects;
}
