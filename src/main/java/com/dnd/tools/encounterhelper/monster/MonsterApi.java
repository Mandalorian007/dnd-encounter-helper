package com.dnd.tools.encounterhelper.monster;

import com.dnd.tools.encounterhelper.monster.model.Monster;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MonsterApi {

  private final MonsterRepository monsterRepository;

  @GetMapping("/monsters")
  public List<Monster> findAllMonsters() {
    return monsterRepository.findAll();
  }

  @GetMapping("/monsters/{monsterId}")
  public Monster findById(@PathVariable("monsterId") long monsterId) {
    return monsterRepository.findById(monsterId)
        .orElseThrow(() -> new MonsterNotFoundException(monsterId));
  }

  @DeleteMapping("/monsters/{monsterId}")
  public void deleteById(@PathVariable("monsterId") long monsterId) {
    monsterRepository.deleteById(monsterId);
  }

  @PostMapping("monsters")
  public Monster createNewMonster(@RequestBody Monster monster) {
    return monsterRepository.save(monster);
  }

  @PostMapping("monsters/search")
  public List<Monster> searchForMonsters(@RequestBody MonsterSearch monsterSearch) {
    return monsterRepository.searchForMonsters(monsterSearch);
  }
}
