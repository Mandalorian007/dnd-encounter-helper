package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonDeserializers.SpeedDataDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class JsonSpeed {
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private JsonSpeedData walk;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private JsonSpeedData climb;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private JsonSpeedData fly;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private JsonSpeedData swim;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private JsonSpeedData burrow;
  private Boolean canHover;

}
