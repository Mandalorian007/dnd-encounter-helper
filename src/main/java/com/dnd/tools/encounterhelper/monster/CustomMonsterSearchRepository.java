package com.dnd.tools.encounterhelper.monster;

import com.dnd.tools.encounterhelper.monster.model.Monster;
import java.util.List;

public interface CustomMonsterSearchRepository {
  List<Monster> searchForMonsters(MonsterSearch monsterSearch);
}
