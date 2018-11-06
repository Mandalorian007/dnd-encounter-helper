package com.dnd.tools.encounterhelper.monster.model;

import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class BookSource {
  private String bookCode;
  private String book;
  private int page;
}
