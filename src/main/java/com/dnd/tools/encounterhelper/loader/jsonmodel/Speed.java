package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonSerializers.SpeedDataDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class Speed {
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private SpeedData walk;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private SpeedData climb;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private SpeedData fly;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private SpeedData swim;
  @JsonDeserialize(using = SpeedDataDeserializer.class)
  private Object burrow;
  private Boolean canHover;

}
