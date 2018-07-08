package com.dnd.tools.encounterhelper.monster;

public class MonsterNotFoundException extends RuntimeException {

  public MonsterNotFoundException(long monsterId) {
    super("Couldn't find a monster with id: " + monsterId);
  }
}
