package com.dnd.tools.encounterhelper.monster;

import com.dnd.tools.encounterhelper.monster.model.Monster;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomMonsterSearchRepositoryImpl implements CustomMonsterSearchRepository {

  private final EntityManager entityManager;

  @Override
  public List<Monster> searchForMonsters(MonsterSearch monsterSearch) {
    StringBuilder queryBuilder = new StringBuilder();

    queryBuilder.append("SELECT * FROM Monster om WHERE om.ID IN (");
    queryBuilder.append("SELECT DISTINCT(m.ID) FROM Monster m");
    queryBuilder.append(" INNER JOIN MONSTER_ARMOUR_CLASS a ON m.ID=a.MONSTER_ID");

    String partialName = monsterSearch.getPartialName() == null ? "" : monsterSearch.getPartialName();
    partialName = partialName.toLowerCase();

    if(partialName.length() > 0) {
      //Exact match
      queryBuilder.append(" WHERE (LOWER(m.NAME) = '");
      queryBuilder.append(partialName);
      queryBuilder.append("'");

      //Match inside of name
      queryBuilder.append(" OR LOWER(m.NAME) LIKE '%");
      queryBuilder.append(partialName);
      queryBuilder.append("%'");

      //Match start of name
      queryBuilder.append(" OR LOWER(m.NAME) LIKE '%");
      queryBuilder.append(partialName);
      queryBuilder.append("'");

      //Match end of name
      queryBuilder.append(" OR LOWER(m.NAME) LIKE '");
      queryBuilder.append(partialName);
      queryBuilder.append("%')");
    }

    List<String> sizes = monsterSearch.getSizes();
    if(sizes != null && !sizes.isEmpty()) {
      queryBuilder.append(" AND m.SIZE IN (");

      sizes.stream()
          .map(String::toUpperCase)
          .forEach(size -> {
            queryBuilder.append("'");
            queryBuilder.append(size);
            queryBuilder.append("',");
          });

      // remove last comma
      queryBuilder.deleteCharAt(queryBuilder.length()-1);
      queryBuilder.append(")");

    }

    MonsterSearch.Range hitpoints = monsterSearch.getHitPoints();
    if(hitpoints != null) {
      queryBuilder.append(" AND (m.AVERAGE_HP BETWEEN ");
      queryBuilder.append(hitpoints.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(hitpoints.getUpperBound());
      queryBuilder.append(")");
    }

    //TODO test how this works with multiple armourClasses
    MonsterSearch.Range armourClass = monsterSearch.getArmourClass();
    if(armourClass != null) {
      queryBuilder.append(" AND (a.ARMOUR_CLASS BETWEEN ");
      queryBuilder.append(armourClass.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(armourClass.getUpperBound());
      queryBuilder.append(")");
    }

    MonsterSearch.Range challengeRating = monsterSearch.getChallengeRating();
    if(challengeRating != null) {
      queryBuilder.append(" AND (m.CHALLENGE_RATING BETWEEN ");
      queryBuilder.append(challengeRating.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(challengeRating.getUpperBound());
      queryBuilder.append(")");
    }

    //Close IN statement
    queryBuilder.append(")");

    queryBuilder.append(" LIMIT 12;");
    String query = queryBuilder.toString();
    Query nativeQuery = entityManager.createNativeQuery(query, Monster.class);

    return nativeQuery.getResultList();
  }
}
