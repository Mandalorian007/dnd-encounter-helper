package com.dnd.tools.encounterhelper.combatant.npctemplate;

import com.dnd.tools.encounterhelper.combatant.Combatant;
import com.dnd.tools.encounterhelper.combatant.CombatantRepository;
import com.dnd.tools.encounterhelper.util.Die;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class NpcTemplateApi {

  final CombatantRepository combatantRepository;

  @PostMapping("npctemplate")
  public List<Combatant> createNewCombatant(@RequestBody NpcTemplate npcTemplate) {

    IntStream.range(1, npcTemplate.getCount() + 1)
        .mapToObj(enemyNumber -> {
          Combatant npc = new Combatant();
          npc.setName(npcTemplate.getBaseName()
                      + (npcTemplate.getCount() != 1 ?"#" + enemyNumber : ""));
          npc.setArmourClass(npcTemplate.getArmourClass());
          HitDice hitDice = npcTemplate.getHitDice();
          Die die = new Die(hitDice.getSizeOfDie());


          //TODO maxHp
          //TODO currentHp
          npc.setInitativeBonus(npcTemplate.getInitativeBonus());
          npc.setPassivePerception(npcTemplate.getPassivePerception());
          npc.setNpc(true);
          npc.setMonsterId(npcTemplate.getMonsterId());
          npc.setCurrentInitiative(npcTemplate.getCurrentInitiative());
          return npc;
        })
        .collect(Collectors.toList());

    /*
      private int count;
  private HitDice hitDice;

  private String baseName;
  private int armourClass;
  private int initativeBonus;
  private int passivePerception;
  private Long monsterId;

  private int currentInitiative;
  private int currentHp;
     */

    return null;
  }
}
