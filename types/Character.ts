export type HDBool = "Yes" | "No";

export interface ParsedCharacter {
  CHARACTER: Character;
}

export interface Character {
  BASIC_CONFIGURATION: BasicConfiguration;
  CHARACTER_INFO: CharacterInfo;
  CHARACTERISTICS: Characteristics;
  DISADVANTAGES: Disadvantages;
  EQUIPMENT: Equipment;
  MARTIALARTS: MartialArts;
  PERKS: Perks;
  POWERS: Powers;
  SKILLS: Skills;
  TALENTS: Talents;
  uid: string;
  current?: any;
  rollHistory?: any[];
}

export interface BasicConfiguration {
  BASE_POINTS: number;
  DISAD_POINTS: number;
  EXPERIENCE: number;
  RULES: string;
}

//
// CharacterInfo
//

export interface CharacterInfo {
  ALTERNATE_IDENTITIES: string;
  APPEARANCE: string;
  BACKGROUND: string;
  CAMPAIGN_NAME: string;
  CAMPAIGN_USE: CampaignUse;
  CHARACTER_NAME: string;
  EYE_COLOR: string;
  GENRE: string;
  GM: string;
  HAIR_COLOR: string;
  HEIGHT: number;
  NOTES1: Notes;
  NOTES2: Notes;
  NOTES3: Notes;
  NOTES4: Notes;
  NOTES5: Notes;
  PERSONALITY: Personality;
  PLAYER_NAME: string;
  QUOTE: Quote;
  TACTICS: Tactics;
  WEIGHT: number;
}

export interface Background {}

export interface Personality {}

export interface Quote {}

export interface Tactics {}

export interface CampaignUse {}

export interface Appearance {}

export type Notes = string;

//
// Characteristic
//

export enum CharacteristicLabel {
  STR = "STR",
  DEX = "DEX",
  CON = "CON",
  INT = "INT",
  EGO = "EGO",
  PRE = "PRE",
  SPD = "SPD",
  REC = "REC",
  END = "END",
  BODY = "BODY",
  STUN = "STUN",
}

export enum CombatValueLabel {
  OCV = "OCV",
  DCV = "DCV",
  DMCV = "DMCV",
  OMCV = "OMCV",
}

export enum DefenseLabel {
  ED = "ED",
  PD = "PD",
}

export enum MovementLabel {
  RUNNING = "RUNNING",
  SWIMMING = "SWIMMING",
  LEAPING = "LEAPING",
}

export type CombinedLabel =
  | CharacteristicLabel
  | CombatValueLabel
  | DefenseLabel
  | MovementLabel;

export interface Characteristic {
  ADDER: Adder;
  AFFECTS_PRIMARY: HDBool;
  AFFECTS_TOTAL: HDBool;
  ALIAS: string;
  BASECOST: number;
  COLOR: string;
  DISPLAYSTRING: HDBool;
  GRAPHIC: string;
  GROUP: HDBool;
  INCLUDE_NOTES_IN_PRINTOUT: HDBool;
  INCLUDEINBASE: HDBool;
  LEVELS: number;
  MULTIPLIER: number;
  NAME: string;
  NOTES: Notes;
  OPTION: string;
  OPTION_ALIAS: string;
  OPTIONID: string;
  POSITION: number;
  PRIVATE: HDBool;
  REQUIRED: HDBool;
  SELECTED: HDBool;
  SFX: string;
  SHOW_ACTIVE_COST: HDBool;
  SHOW_ALIAS: HDBool;
  XMLID: string;
  INPUT: string;
}

export interface Movement extends Characteristic {}

export type Characteristics = {
  [key in CombinedLabel]: Characteristic | Movement;
};

//
// Skills
//

export interface Skill extends Characteristic {
  CHARACTERISTIC: CharacteristicLabel;
  FAMILIARITY: HDBool;
  LEVELSONLY: HDBool;
  PROFICIENCY: HDBool;
}

export type Skills = {
  SKILL: Skill | Skill[];
};

export interface Adder extends Characteristic {}

//
// Perks
//

export interface Perk extends Characteristic {}

export type Perks = {
  PERK: Perk | Perk[];
};

//
// Talents
//

export interface Talent extends Characteristic {}

export interface Talents {
  TALENT: Talent | Talent[];
}

//
// Martial Arts
//

export interface MartialArt extends Characteristic {}

export type MartialArts = {
  MARTIALARTS: MartialArt | MartialArt[];
};

//
// Powers
//

export interface Modifier extends Characteristic {
  COMMENTS: string;
  FORCEALLOW: HDBool;
}

export interface Multipower extends Power {}
export interface VariablePowerPool extends Power {}

export interface Power extends Characteristic {
  PARENTID: string;
  ULTRA_SLOT: HDBool;
  USESTANDARDEFFECT: HDBool;
  QUANTITY: number;
  MODIFIER: Modifier | Modifier[];
}

export type Powers = (Power | Multipower | VariablePowerPool)[];

//
// Disadvantage
//

export interface Disadvantage extends Characteristic {}

export interface Disadvantages {
  DISAD: Disadvantage | Disadvantage[];
}

//
// Equipment
//

export interface Equipment {}
