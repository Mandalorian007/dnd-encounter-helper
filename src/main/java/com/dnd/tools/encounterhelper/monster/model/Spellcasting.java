package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Spellcasting {

  @ElementCollection
  @Column(length = 10000)
  private List<String> spellHeaderEntries;

  private String spellAbilityStat;

  private Integer firstLevelSlots;

  private Integer secondLevelSlot;

  private Integer thirdLevelSlots;

  private Integer fourthLevelSlots;

  private Integer fifthLevelSlots;

  private Integer sixthLevelSlots;

  private Integer seventhLevelSlots;

  private Integer eighthLevelSlots;

  private Integer ninthLevelSlot;

  @ElementCollection
  private List<String> cantrips;

  @ElementCollection
  private List<String> firstLevel;

  @ElementCollection
  private List<String> secondLevel;

  @ElementCollection
  private List<String> thirdLevel;

  @ElementCollection
  private List<String> fourthLevel;

  @ElementCollection
  private List<String> fifthLevel;

  @ElementCollection
  private List<String> sixthLevel;

  @ElementCollection
  private List<String> seventhLevel;

  @ElementCollection
  private List<String> eighthLevel;

  @ElementCollection
  private List<String> ninthLevel;


  @ElementCollection
  @Column(length = 10000)
  private List<String> spellFooterEntries;

}
