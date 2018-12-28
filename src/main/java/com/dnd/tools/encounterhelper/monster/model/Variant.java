package com.dnd.tools.encounterhelper.monster.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class Variant {
  @Id
  @GeneratedValue
  @JsonIgnore
  private Long id;

  private String type;
  private String name;

  private String source;
  private Integer page;

  @Column(length = 10000)
  private String entry;

  @OneToMany(fetch= FetchType.EAGER, cascade={CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
  @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
  @JoinColumn(name="VARIANT_ID")
  @JsonManagedReference
  private List<Variant> entries;

  @ManyToOne(fetch=FetchType.EAGER)
  @JoinColumn(name="VARIANT_ID")
  @JsonBackReference
  private Variant self;
}
