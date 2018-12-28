interface Monster {

    id: number;
    name: string;
    alignment: Alignment[];
    environments: string[];
    size: Size;
    type: Type;
    bookSource: BookSource;
    armourClass: ArmourClass[];
    hp: HP;
    speed: Speed;

    // Attributes
    familiar: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

    //saves
    strengthSave: number;
    dexteritySave: number;
    constitutionSave: number;
    intelligenceSave: number;
    wisdomSave: number;
    charismaSave: number;

    //skills
    athletics: number;
    acrobatics: number;
    slightOfHand: number;
    arcana: number;
    history: number;
    investigation: number;
    nature: number;
    religion: number;
    animalHandling: number;
    insight: number;
    medicine: number;
    perception: number;
    survival: number;
    deception: number;
    intimidation: number;
    performance: number;
    persuasion: number;
    passivePerception: number;
    stealth: number;

    languages: string[];
    challengeRating: ChallengeRating;

    senses: string[];
    trait: Action[];
    action?: Action[];
    legendaryAction?: Action[];
    reaction?: Action[];

    immunities: Immunities[];
    vulnerabilities: Immunities[];
    resistances: Resistances[];
    conditionImmunity: ConditionImmunity[];
}

enum Size {
    TINY = "TINY",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    HUGE = "HUGE",
    GARGANTUAN = "GARGANTUAN",
}

interface Alignment {
    alignemnt: string;
    chance: number;
}

interface Type {
    type: string;
    subtype: string[];
    swarmSize: number;
}

interface BookSource {
    bookCode: string;
    book: string;
    page: number;
}

interface ArmourClass {
    armourClass: number;
    armourSources: string;
    condition: string;
}

interface HP {
    averageHp: number;
    numOfDice: number;
    sizeOfDie: number;
    flatBonus: number;
    special: number;
}

interface Speed {
    walk: number;
    walkCondition: string;
    burrow: number;
    burrowCondition: string;
    climb: number;
    climbCondition: string;
    fly: number;
    flyCondition: string;
    swim: number;
    swimCondition: string;
    hover: boolean;
}

/* Valid settings
0 1/8 1/4 1/2 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 26 30
*/
interface ChallengeRating {
    challengeRating: number;
    coven: string;
    lair: string;
}

interface Entry {
    name: string;
    entries: string[];
    attack: null;
    subEntries: string[];
}

interface Action {
    name: string;
    entries: string[];
    attack?: number;
    subEntries?: Entry[];
}

interface Immunities {
    damageType: string;
    condition: string;
}

interface Resistances {
    damageType: string;
    note: string;
    preNote: null;
    special: null;
}

interface ConditionImmunity {
    condition: string;
    note: string;
}