package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class ChallengeRating {
  private Double challengeRating;
  private Double coven;
  private Double lair;
}
