package com.dnd.tools.encounterhelper.monster;

import com.dnd.tools.encounterhelper.monster.model.Monster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonsterRepository extends JpaRepository<Monster, Long>, CustomMonsterSearchRepository {

}
