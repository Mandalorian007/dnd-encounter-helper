package com.dnd.tools.encounterhelper.monster;

import java.util.List;

public interface CustomMonsterSearchRepository {
  List<Monster> searchForMonsters(MonsterSearch monsterSearch);
}
