package com.dnd.tools.encounterhelper.combatant;

import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Combatant {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int armourClass;
    private int maxHp;
    private int initativeBonus;
    private int passivePerception;
    private boolean npc;
    private Long monsterId;

    private int currentInitiative;
    private int currentHp;

    private String comment;

    @ElementCollection
    private List<ConditionTracker> conditionTracker;

}
