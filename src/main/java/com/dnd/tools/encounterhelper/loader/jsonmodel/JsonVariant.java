package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonVariant {
  private String type;
  private String name;
  private String entry;
  private JsonVariant[] entries;
  private VariantSource variantSource;

  @Data
  public static class VariantSource {
    private String source;
    private int page;
  }
}
