package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.dnd.tools.encounterhelper.loader.jsonSerializers.VariantEntryDeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

@Data
public class Variant {
  private String type;
  private String name;
  @JsonDeserialize(using = VariantEntryDeSerializer.class)
  private VariantEntry[] entries;
  private VariantSource variantSource;

  @Data
  public static class VariantSource {
    private String source;
    private int page;
  }

  @Data
  public static class VariantEntry {
    private String type;
    private String name;
    private String entry;
    private VariantEntry[] entries;
  }
}
