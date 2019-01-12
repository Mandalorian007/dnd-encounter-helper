package com.dnd.tools.encounterhelper.combatant;

import com.dnd.tools.encounterhelper.monster.model.Condition;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;

@Data
@Embeddable
public class ConditionTracker {

  @Enumerated(EnumType.STRING)
  private Condition condition;
  private Integer remainingRounds;
}
