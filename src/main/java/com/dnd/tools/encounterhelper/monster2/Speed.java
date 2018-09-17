package com.dnd.tools.encounterhelper.monster2;

import java.util.Optional;
import lombok.Data;

@Data
public class Speed {
  private Optional<Integer> walk;
  private Optional<Integer> burrow;
  private Optional<Integer> climb;
  private Optional<Integer> fly;
  private Optional<Integer> hover;
  private Optional<Integer> swim;

}
