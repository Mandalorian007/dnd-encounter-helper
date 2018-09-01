interface Monster {

    id: number;
    name: string;
    size: Size;
    type: string;
    subType?: string;
    armourClass: number;
    hitDice: string;
    hitPoints: number;
    speed: string;

    // Attributes
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;

    //saves
    strengthSave?: number;
    dexteritySave?: number;
    constitutionSave?: number;
    intelligenceSave?: number;
    wisdomSave?: number;
    charismaSave?: number;

    perceptionMod?: number;
    stealth?: number;
    damageVulnerabilities?: string;
    damageImmunities?: string;
    condititonImmunities?: string;
    senses?: string;

    /* Valid settings
     0 1/8 1/4 1/2 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 26 30
     */
    challengeRating: number;

    specialAbilities?: Action[];
    actions?: Action[];
    reactions?: Action[];
    legendaryActions?: Action[];
}

enum Size {
    TINY = "TINY",
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
    HUGE = "HUGE",
    GARGANTUAN = "GARGANTUAN",
}

interface Action {
    name: string;
    description: string;
    attackBonus?: number;
    damageDice?: string;
    damageBonus?: string;
}