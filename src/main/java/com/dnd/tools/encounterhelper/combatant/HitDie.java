package com.dnd.tools.encounterhelper.combatant;

import lombok.Data;

@Data
public class HitDie {
    public int numberOfDice;
    public int sizeOfDie;
    public int baseHp;
    public int conMod;
}
