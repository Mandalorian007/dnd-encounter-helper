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
    //Merge with ArmourClass table
    queryBuilder.append("SELECT DISTINCT(m.ID) FROM Monster m");
    queryBuilder.append(" INNER JOIN MONSTER_ARMOUR_CLASS ac ON m.ID=ac.MONSTER_ID");
    queryBuilder.append(" INNER JOIN MONSTER_ALIGNMENT al ON m.ID=al.MONSTER_ID");

    //Name
    String partialName =
        monsterSearch.getPartialName() == null ? "" : monsterSearch.getPartialName();
    partialName = partialName.toLowerCase().replaceAll("'", "''");
    if (partialName.length() > 0) {
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

    //Sizes
    List<String> sizes = monsterSearch.getSizes();
    if (sizes != null && !sizes.isEmpty()) {
      queryBuilder.append(" AND m.SIZE IN (");
      inBuilder(sizes, queryBuilder);
    }

    //Types
    List<String> types = monsterSearch.getTypes();
    if (types != null && !types.isEmpty()) {
      queryBuilder.append(" AND m.TYPE IN (");
      inBuilder(types, queryBuilder);
    }

    //Speeds
    List<String> speeds = monsterSearch.getSpeeds();
    if (speeds != null && !speeds.isEmpty()) {
      if (listContainsIgnoreCase(speeds, "WALK")) {
        queryBuilder.append(" AND WALK IS NOT NULL AND WALK != 0");
      }
      if (listContainsIgnoreCase(speeds, "BURROW")) {
        queryBuilder.append(" AND BURROW IS NOT NULL AND BURROW != 0");
      }
      if (listContainsIgnoreCase(speeds, "CLIMB")) {
        queryBuilder.append(" AND CLIMB IS NOT NULL AND CLIMB != 0");
      }
      if (listContainsIgnoreCase(speeds, "FLY")) {
        queryBuilder.append(" AND FLY IS NOT NULL AND FLY != 0");
      }
      if (listContainsIgnoreCase(speeds, "SWIM")) {
        queryBuilder.append(" AND SWIM IS NOT NULL AND SWIM != 0");
      }
    }

    //Alignments
    List<String> alignments = monsterSearch.getAlignments();
    if (alignments != null && !alignments.isEmpty()) {
      queryBuilder.append(" AND al.ALIGNMENT IN (");
      inBuilder(alignments, queryBuilder);
    }

    //Hit Points
    MonsterSearch.Range hitpoints = monsterSearch.getHitPoints();
    if (hitpoints != null) {
      queryBuilder.append(" AND (m.AVERAGE_HP BETWEEN ");
      queryBuilder.append(hitpoints.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(hitpoints.getUpperBound());
      queryBuilder.append(")");
    }

    //Armour Class
    MonsterSearch.Range armourClass = monsterSearch.getArmourClass();
    if (armourClass != null) {
      queryBuilder.append(" AND (ac.ARMOUR_CLASS BETWEEN ");
      queryBuilder.append(armourClass.getLowerBound());
      queryBuilder.append(" AND ");
      queryBuilder.append(armourClass.getUpperBound());
      queryBuilder.append(")");
    }

    //Challenge Ratings
    MonsterSearch.Range challengeRating = monsterSearch.getChallengeRating();
    if (challengeRating != null) {
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

  private static boolean listContainsIgnoreCase(List<String> list, String match) {
    return list.stream()
        .anyMatch(listItem ->
            listItem.equalsIgnoreCase(match));
  }

  private static void inBuilder(List<String> list, StringBuilder queryBuilder) {
    list.stream()
        .map(String::toUpperCase)
        .forEach(item -> {
          queryBuilder.append("'");
          queryBuilder.append(item);
          queryBuilder.append("',");
        });
    // remove last comma
    queryBuilder.deleteCharAt(queryBuilder.length() - 1);
    queryBuilder.append(")");
  }
}
