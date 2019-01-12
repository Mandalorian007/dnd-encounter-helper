package com.dnd.tools.encounterhelper.loader;

import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonLairAction;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonRegionalEffect;
import com.dnd.tools.encounterhelper.loader.jsonmodel.JsonRegionalTable;
import com.dnd.tools.encounterhelper.monster.model.LairAction;
import com.dnd.tools.encounterhelper.monster.model.RegionalEffect;
import com.dnd.tools.encounterhelper.monster.model.RegionalTable;
import java.util.Arrays;
import org.springframework.stereotype.Service;

@Service
public class LegendaryDataConverter {

  public LairAction convert(JsonLairAction jsonLairAction) {
    LairAction lairAction = new LairAction();
    lairAction.setAction(jsonLairAction.getAction());
    lairAction.setActionList(jsonLairAction.getActionList());
    return lairAction;
  }

  public RegionalEffect convert(JsonRegionalEffect jsonRegionalEffect) {
    RegionalEffect regionalEffect = new RegionalEffect();
    regionalEffect.setEffect(jsonRegionalEffect.getEffect());
    regionalEffect.setEffects(jsonRegionalEffect.getEffectList());

    if(jsonRegionalEffect.getRegionalTable() != null) {
      RegionalTable regionalTable = new RegionalTable();
      JsonRegionalTable jsonRegionalTable = jsonRegionalEffect.getRegionalTable();

      regionalTable.setTableDescription(jsonRegionalTable.getTableDescription());
      regionalTable.setCaption(jsonRegionalTable.getCaption());

      regionalTable.setColumn1Label(jsonRegionalTable.getColumn1Label());
      regionalTable.setColumn2Label(jsonRegionalTable.getColumn2Label());

      regionalTable.setColumn1Data(Arrays.asList(jsonRegionalTable.getColumn1Data()));
      regionalTable.setColumn2Data(Arrays.asList(jsonRegionalTable.getColumn2Data()));

      regionalEffect.setRegionalTable(regionalTable);
    }

    return regionalEffect;
  }

}
