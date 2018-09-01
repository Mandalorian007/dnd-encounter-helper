interface Combatant {
    id: number;
    name: string;
    armourClass: number;
    maxHp: number;
    initativeBonus: number;
    passivePerception: number;
    npc: boolean;
    monsterId: number;

    currentInitiative: number;
    currentHp: number;

    comment: string;

}