package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class InnateSpellCasting {

  @ElementCollection
  @Column(length = 10000)
  private List<String> headerEntries;

  private String spellStat;

  @ElementCollection
  private List<String> atWill;

  @ElementCollection
  private List<String> one;

  @ElementCollection
  private List<String> oneEach;

  @ElementCollection
  private List<String> two;

  @ElementCollection
  private List<String> twoEach;

  @ElementCollection
  private List<String> three;

  @ElementCollection
  private List<String> threeEach;

  @ElementCollection
  @Column(length = 10000)
  private List<String> footerEntries;

}
