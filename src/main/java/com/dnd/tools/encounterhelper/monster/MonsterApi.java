package com.dnd.tools.encounterhelper.monster;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
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

  /*
  Example of paging and sorting:
  http://localhost:8080/monsters?page=0&size=2&sort=name,desc
   */
  @GetMapping("/monsters")
  public Iterable<Monster> findAllMonsters(Pageable pageable) {
    return monsterRepository.findAll(pageable);
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
}
