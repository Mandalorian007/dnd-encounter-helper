package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Data;
import org.hibernate.annotations.Cascade;

@Data
@Entity
public class Ability {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  @ElementCollection
  private List<String> entries;
  private String attack;

  @OneToMany(fetch= FetchType.EAGER, cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
  @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
  @JoinColumn(name="ABILITY_ID")
  private List<Ability> subEntries;

  @ManyToOne(fetch=FetchType.EAGER)
  @JoinColumn(name="ABILITY_ID")
  private Ability self;
}
