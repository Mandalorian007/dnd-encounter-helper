package com.dnd.tools.encounterhelper.loader.jsonmodel;

import lombok.Data;

@Data
public class JsonRegionalTable {
  private String tableDescription;
  private String caption;
  private String column1Label;
  private String column2Label;
  private String[] column1Data;
  private String[] column2Data;
}
