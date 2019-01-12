package com.dnd.tools.encounterhelper.monster;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class MonsterSearch {
  private String partialName;
  private List<String> sizes;
  private List<String> types;
  private List<String> speeds;
  private List<String> alignments;
  private Range hitPoints;
  private Range armourClass;
  private Range challengeRating;

  @Data
  @AllArgsConstructor
  static class Range {
    private double lowerBound;
    private double upperBound;
  }
}
