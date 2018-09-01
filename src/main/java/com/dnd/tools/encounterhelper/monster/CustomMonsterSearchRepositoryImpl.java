package com.dnd.tools.encounterhelper.monster;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class CustomMonsterSearchRepositoryImpl implements CustomMonsterSearchRepository {

  private final EntityManager entityManager;

  @Override
  public List<Monster> searchForMonsters(MonsterSearch monsterSearch) {
    StringBuilder queryBuilder = new StringBuilder();

    queryBuilder.append("SELECT * FROM Monster m");
    queryBuilder.append(" WHERE LOWER(m.NAME) LIKE '%");
    String partialName = monsterSearch.getPartialName() == null ? "" : monsterSearch.getPartialName();
    queryBuilder.append(partialName.toLowerCase());
    queryBuilder.append("%'");

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
      queryBuilder.append(" AND (m.HIT_POINTS BETWEEN ");
      queryBuilder.append(hitpoints.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(hitpoints.getUpperBound());
      queryBuilder.append(")");
    }

    MonsterSearch.Range armourClass = monsterSearch.getArmourClass();
    if(armourClass != null) {
      queryBuilder.append(" AND (m.ARMOUR_CLASS BETWEEN ");
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

    queryBuilder.append(" LIMIT 12;");
    String query = queryBuilder.toString();
    Query nativeQuery = entityManager.createNativeQuery(query, Monster.class);

    return nativeQuery.getResultList();
  }
}
