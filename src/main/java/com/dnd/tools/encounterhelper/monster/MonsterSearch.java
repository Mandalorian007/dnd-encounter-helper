package com.dnd.tools.encounterhelper.monster;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class MonsterSearch {
  private String partialName;
  private List<String> sizes;
  private Range hitPoints;
  private Range armourClass;
  private Range challengeRating;

  @Data
  @AllArgsConstructor
  static class Range {
    private int lowerBound;
    private int upperBound;
  }
}
