package com.dnd.tools.encounterhelper.monster.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class LairAction {

  @Id
  @GeneratedValue
  @JsonIgnore
  private Long id;

  @Column(length = 10000)
  private String action;

  @ElementCollection
  @Column(length = 10000)
  private List<String> actionList;

  public LairAction copy() {
    LairAction lairAction = new LairAction();
    lairAction.setAction(action);
    lairAction.setActionList(actionList);
    return lairAction;
  }
}
