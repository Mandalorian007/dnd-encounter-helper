package com.dnd.tools.encounterhelper.monster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class RegionalEffect {

  @Id
  @GeneratedValue
  @JsonIgnore
  private Long id;

  @Column(length = 10000)
  private String effect;

  @ElementCollection
  @Column(length = 10000)
  private List<String> effects;

  @Embedded
  private RegionalTable regionalTable;

  public RegionalEffect copy() {
    RegionalEffect regionalEffect = new RegionalEffect();
    regionalEffect.setEffect(effect);
    regionalEffect.setEffects(effects);
    if(regionalTable != null) {
      regionalEffect.setRegionalTable(regionalTable.copy());
    }
    return regionalEffect;
  }
}
