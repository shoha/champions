import type { DocumentData } from "firebase/firestore";

export interface Character implements DocumentData {
    application: Application;
    name: string;
    alternate_ids: string;
    player_name: string;
    campaign_name: string;
    genre: string;
    gm: string;
    height: string;
    weight: string;
    hair_color: string;
    eye_color: string;
    appearance: string;
    background: string;
    earned_exp: string;
    spent_exp: string;
    unspent_exp: string;
    base_points: string;
    disad_points_allowed: string;
    disad_points: string;
    total_points: string;
    total_active_cost: string;
    characteristic_points: string;
    skill_points: string;
    perk_points: string;
    talent_points: string;
    skill_perk_talent_points: string;
    skill_perk_talent_martial_art_points: string;
    martial_art_points: string;
    power_points: string;
    power_martial_art_points: string;
    ocv: string;
    dcv: string;
    ecv: string;
    mental_defense_total: string;
    power_defense_total: string;
    image: string;
    characteristics: Characteristics;
    martial_arts: MartialArts;
    combat_levels: CombatLevels;
    skills: Skills;
    talents: Talents;
    powers: Powers;
    disads: Disads;
    uid: string;
    current?: Current;
}

export interface Current {
    end: Characteristic;
    body: Characteristic;
    stun: Characteristic;
    [key: string]: any;
}

export interface Application {
    name: string;
    version: string;
}

export interface Characteristics {
    str: Characteristic;
    dex: Characteristic;
    con: Characteristic;
    body: Characteristic;
    int: Characteristic;
    ego: Characteristic;
    pre: Characteristic;
    com: string;
    pd: Characteristic;
    ed: Characteristic;
    spd: Characteristic;
    rec: Characteristic;
    end: Characteristic;
    stun: Characteristic;
    running: Characteristic;
    swimming: Characteristic;
    leaping: Leaping;
    def: string;
    size: string;
}

export interface Characteristic {
    val: string;
    base: string;
    cost: string;
    active_cost: string;
    total: number;
    roll?: string;
    notes: string;
    nonresistant_total?: string;
    resistant_total?: string;
    dice?: string;
    lift?: string;
    current: number;
}

export interface Leaping {
    val: string;
    base: string;
    cost: string;
    active_cost: string;
    total: string;
    notes: string;
    horizontal_base: string;
    horizontal_total: string;
    vertical_base: string;
    vertical_total: string;
}

export interface CombatLevels {
    combat_level: CombatLevel;
}

export interface CombatLevel {
    cost: string;
    base_cost: string;
    active_cost: string;
    text: string;
}

export interface Disads {
    disad: Disad[];
}

export interface Disad {
    cost: string;
    text: string;
    notes?: string;
}

export interface MartialArts {
    maneuvers: Maneuvers;
}

export interface Maneuvers {
    maneuver: Maneuver[];
}

export interface Maneuver {
    cost: string;
    base_cost: string;
    active_cost: string;
    name: string;
    phase: string;
    ocv: string;
    dcv: string;
    effect: string;
    text: string;
}

export interface Powers {
    power: Power[];
}

export interface Power {
    name: string;
    cost: string;
    base_cost: string;
    active_cost: string;
    text: string;
    end: string;
    list_prefix?: string;
    notes?: string;
}

export interface Skills {
    skill: CombatLevel[];
}

export interface Talents {
    talent: CombatLevel;
}
