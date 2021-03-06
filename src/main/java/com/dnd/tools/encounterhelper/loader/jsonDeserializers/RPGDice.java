package com.dnd.tools.encounterhelper.loader.jsonDeserializers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RPGDice {

  private static final Pattern DICE_PATTERN = Pattern.compile("(?<A>\\d*)d(?<B>\\d+)(?>(?<MULT>[x/])(?<C>\\d+))?(?>(?<ADD>[+-])(?<D>\\d+))?");
  private int rolls;
  private int faces;
  private int multiplier;
  private int additive;

  @Override
  public String toString() {
    return String.format("{\"rolls\": %s, \"faces\": %s, \"multiplier\": %s, \"additive\": %s}", rolls, faces, multiplier, additive);
  }

  private static boolean isEmpty(String str) {
    return str == null || str.trim().isEmpty();
  }

  private static Integer getInt(Matcher matcher, String group, int defaultValue) {
    String groupValue = matcher.group(group);
    return isEmpty(groupValue) ? defaultValue : Integer.valueOf(groupValue);
  }

  private static Integer getSign(Matcher matcher, String group, String positiveValue) {
    String groupValue = matcher.group(group);
    return isEmpty(groupValue) || groupValue.equals(positiveValue) ? 1 : -1;
  }

  public static RPGDice parse(String str) {
    Matcher matcher = DICE_PATTERN.matcher(str);
    if(matcher.matches()) {
      int rolls = getInt(matcher, "A", 1);
      int faces = getInt(matcher, "B", -1);
      int multiplier = getInt(matcher, "C", 1);
      int additive = getInt(matcher, "D", 0);
      int multiplierSign = getSign(matcher, "MULT", "x");
      int additiveSign = getSign(matcher, "ADD", "+");
      return new RPGDice(rolls, faces, multiplier * multiplierSign, additive * additiveSign);
    }
    throw new IllegalArgumentException("Unable to parse hp value for: " + str);
  }
}
