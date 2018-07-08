package com.dnd.tools.encounterhelper.util;

import com.dnd.tools.encounterhelper.combatant.Combatant;
import com.dnd.tools.encounterhelper.util.Die;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class NpcCreator {
/*    public static List<Combatant> createTemplatedNpc(int numberOfEnemies, String name, int armourClass, int hitDie, int level, int conMod, int initativeBonus) {
        return IntStream.range(1, numberOfEnemies + 1)
                .mapToObj(enemyNumber -> new Combatant(
                        // Only add numbers if there will be more than 1 of these enemies created
                        name + (numberOfEnemies != 1 ?"#" + enemyNumber : ""),
                        armourClass,
                        getHp(hitDie, level, conMod),
                        initativeBonus,
                        true
                ))
                .collect(Collectors.toList());
    }

    private static int getHp(int hitDie, int level, int conMod) {
        Die die = new Die(hitDie);
        int dieSum = 0;
        for (int i = 0; i < level; i++) {
            dieSum += die.roll();
        }
        return conMod * level + dieSum;
    }*/
}
