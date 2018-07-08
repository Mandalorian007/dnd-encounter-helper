package com.dnd.tools.encounterhelper.combatant;

public class CombatantNotFoundException extends RuntimeException {

  public CombatantNotFoundException(long combatantId) {
    super("Couldn't find an combatant with id: " + combatantId);
  }
}
