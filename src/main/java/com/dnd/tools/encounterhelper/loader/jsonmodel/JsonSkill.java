package com.dnd.tools.encounterhelper.loader.jsonmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class JsonSkill {
  private String athletics;
  private String acrobatics;
  @JsonProperty("sleight of hand")
  private String sleightOfHand;
  private String stealth;
  private String arcana;
  private String history;
  private String investigation;
  private String nature;
  private String religion;
  @JsonProperty("animal handling")
  private String animalHandling;
  private String insight;
  private String medicine;
  private String perception;
  private String survival;
  private String deception;
  private String intimidation;
  private String performance;
  private String persuasion;

  //TODO WTF
  private Object other;
}
