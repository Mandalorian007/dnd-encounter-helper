package com.dnd.tools.encounterhelper.monster.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class RegionalTable {

  @Column(length = 10000)
  private String tableDescription;
  private String caption;
  private String column1Label;
  private String column2Label;

  @ElementCollection
  @Column(length = 10000)
  private List<String> column1Data;

  @ElementCollection
  @Column(length = 10000)
  private List<String> column2Data;

  public RegionalTable copy() {
    RegionalTable regionalTable = new RegionalTable();
    regionalTable.setTableDescription(tableDescription);
    regionalTable.setCaption(caption);
    regionalTable.setColumn1Label(column1Label);
    regionalTable.setColumn2Label(column2Label);
    regionalTable.setColumn1Data(column1Data);
    regionalTable.setColumn2Data(column2Data);
    return regionalTable;
  }
}
