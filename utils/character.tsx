import {
  Adder,
  Character,
  CharacteristicLabel,
  CombinedLabel,
  GenericCharacteristic,
  Skill,
  Power,
  Characteristic,
  DefenseLabel,
  AllLables,
} from "../types/Character";
import { coalesceArray } from "./misc";

interface StrengthTableRow {
  lift: number; // weight in kg
  damage: string; // dice roll
  throw: number; // distance in m
  example: string;
}

// Table found on pg 14 of manual
export const STRENGTH_TABLE: { [key: number]: StrengthTableRow } = {
  0: {
    lift: 0,
    damage: "",
    throw: 0,
    example: "",
  },
  1: {
    lift: 8,
    damage: "",
    throw: 2,
    example: "Most HTH Combat weapons, most guns, shot put",
  },
  2: {
    lift: 16,
    damage: "",
    throw: 3,
    example: "Tavern bench",
  },
  3: {
    lift: 25,
    damage: "½d6",
    throw: 4,
    example: "Full suitcase, TV set, bicycle",
  },
  4: {
    lift: 38,
    damage: "½d6",
    throw: 6,
    example: "Small refrigerator, plate armor",
  },
  5: {
    lift: 50,
    damage: "1d6",
    throw: 8,
    example: "Adolescent human, recliner",
  },
  8: {
    lift: 75,
    damage: "1½d6",
    throw: 12,
    example: "Brass bed, washing machine",
  },
  10: {
    lift: 100,
    damage: "2d6",
    throw: 16,
    example: "Adult human",
  },
  13: {
    lift: 150,
    damage: "2½d6",
    throw: 20,
    example: "Refrigerator",
  },
  15: {
    lift: 200,
    damage: "3d6",
    throw: 24,
    example: "Two men, piano, motorcycle, boar",
  },
  18: {
    lift: 300,
    damage: "3½d6",
    throw: 28,
    example: "Medium floor safe",
  },
  20: {
    lift: 400,
    damage: "4d6",
    throw: 32,
    example: "Chariot, grizzly bear",
  },
  23: {
    lift: 600,
    damage: "4½d6",
    throw: 36,
    example: "",
  },
  25: {
    lift: 800,
    damage: "5d6",
    throw: 40,
    example: "High-speed racing car, horse and rider",
  },
  28: {
    lift: 1200,
    damage: "5½d6",
    throw: 44,
    example: "Compact economy car, medium missile",
  },
  30: {
    lift: 1600,
    damage: "6d6",
    throw: 48,
    example: "Typical sedan or coupe, large missile",
  },

  // ...
};

// Maps characteristics to their cost-per-point
export const COST_TABLE: {
  [key in CombinedLabel]: number;
} = {
  STR: 1,
  DEX: 2,
  CON: 1,
  INT: 1,
  EGO: 1,
  PRE: 1,
  OCV: 5,
  DCV: 5,
  OMCV: 3,
  DMCV: 3,
  SPD: 10,
  PD: 1,
  ED: 1,
  REC: 1,
  END: 0.2,
  BODY: 1,
  STUN: 0.5,
  RUNNING: 1,
  LEAPING: 1,
  SWIMMING: 1,
};

// Maps characteristics to their base value
export const BASE_TABLE: {
  [key in CombinedLabel]: number;
} = {
  STR: 10,
  DEX: 10,
  CON: 10,
  INT: 10,
  EGO: 10,
  PRE: 10,
  OCV: 3,
  DCV: 3,
  OMCV: 3,
  DMCV: 3,
  SPD: 2,
  PD: 2,
  ED: 2,
  REC: 4,
  END: 20,
  BODY: 10,
  STUN: 20,
  RUNNING: 12,
  LEAPING: 4,
  SWIMMING: 4,
};

export const COMBAT_PHASE_MAP = {
  1: [7],
  2: [6, 12],
  3: [4, 8, 12],
  4: [3, 6, 9, 12],
  5: [3, 5, 8, 10, 12],
  6: [2, 4, 5, 8, 10, 12],
  7: [2, 4, 5, 7, 9, 11, 12],
  8: [2, 3, 5, 6, 8, 9, 11, 12],
  9: [2, 3, 4, 6, 7, 8, 10, 11, 12],
  10: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12],
  11: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

const BASE_CHARACTERISTIC_COST = 10;

export class CharacterHelper {
  character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getCombatPhases(): number[] {
    const spdHelper = new CharacteristicHelper(
      this.character.CHARACTERISTICS.SPD
    );

    return COMBAT_PHASE_MAP[spdHelper.totalValue()];
  }
}

export class CharacteristicHelper {
  characteristic: GenericCharacteristic;

  constructor(characteristic: GenericCharacteristic) {
    this.characteristic = characteristic;
  }

  // Compute the total cost of a characteristic
  totalCost(): number {
    return (
      BASE_CHARACTERISTIC_COST +
      this.characteristic.LEVELS * COST_TABLE[this.characteristic.XMLID]
    );
  }

  // Compute the total value of a characteristic
  totalValue(): number {
    return BASE_TABLE[this.characteristic.XMLID] + this.characteristic.LEVELS;
  }

  // Compute the roll value for a given characteristic
  roll(): string {
    return `${9 + Math.round(this.totalValue() / 5)}-`;
  }

  adders(): Adder[] {
    if (!this.characteristic.ADDER) {
      return [];
    }

    const adders = coalesceArray(this.characteristic.ADDER);

    const adderQ: Adder[] = [...adders];
    const allAdders: Adder[] = [];

    while (adderQ.length > 0) {
      const adder = adderQ.shift();
      allAdders.push(adder);

      if (adder.ADDER) {
        const newAdders = coalesceArray(adder.ADDER);
        adderQ.push(...newAdders);
      }
    }

    return allAdders;
  }

  _strengthData(): StrengthTableRow {
    if (this.characteristic.XMLID !== CharacteristicLabel.STR) {
      return null;
    }

    const keys = Object.keys(STRENGTH_TABLE);

    const greaterIndex = Object.keys(STRENGTH_TABLE).findIndex(
      (key) => parseInt(key) > this.totalValue()
    );

    return STRENGTH_TABLE[keys[greaterIndex - 1]];
  }

  supplementalNote(): string {
    switch (this.characteristic.XMLID) {
      case CharacteristicLabel.STR: {
        const strengthEntry = this._strengthData();
        if (strengthEntry) {
          return `Lift: ${strengthEntry.lift}kg; Throw: ${strengthEntry.throw}m; Damage: ${strengthEntry.damage}`;
        } else {
          return "";
        }
      }
      case CharacteristicLabel.DEX: {
        return "";
      }
      case CharacteristicLabel.INT: {
        return "";
      }
      case CharacteristicLabel.PRE: {
        return "";
      }
      default: {
        return "";
      }
    }
  }
}

// TODO: Verify against skill tables on pg 230
export class SkillHelper {
  character: Character;
  skill: Skill;

  constructor(character: Character, skill: Skill) {
    this.character = character;
    this.skill = skill;
  }

  displayText(): string {
    const adderText = this.adders()
      .map((adder) => adder.ALIAS)
      .join("; ");
    return `${this.skill.ALIAS}${
      this.skill.INPUT ? `: ${this.skill.INPUT}` : ""
    }${adderText ? ` (${adderText})` : ""}`;
  }

  adders(): Adder[] {
    const charHelper = new CharacteristicHelper(this.skill);
    return charHelper.adders();
  }

  totalCost(): number {
    const adderCosts = this.adders().reduce((memo, adder) => {
      return memo + adder.BASECOST;
    }, 0);

    if (this.skill.XMLID === "KNOWLEDGE_SKILL") {
      return this.skill.BASECOST + this.skill.LEVELS;
    }

    // Explicitly set base cost to 3 from 0 because it might be busted in file
    if (this.skill.XMLID === "SURVIVAL") {
      return 3 + this.skill.LEVELS * 2;
    }

    // TODO: Why is navigation weird

    return this.skill.BASECOST + this.skill.LEVELS * 2 + adderCosts;
  }

  roll(): string {
    const skillStat = this.skill.CHARACTERISTIC;

    if (!(skillStat in CharacteristicLabel)) {
      return "";
    }

    const charHelper = new CharacteristicHelper(
      this.character.CHARACTERISTICS[skillStat]
    );

    const roll = charHelper.roll();

    if (
      [CharacteristicLabel.INT, CharacteristicLabel.DEX].includes(
        this.skill.CHARACTERISTIC
      )
    ) {
      return `${parseInt(roll) + this.skill.LEVELS}-`;
    } else {
      return roll;
    }
  }
}

const REQUIRES_A_ROLL_OPTION_MODIFIERS_TABLE = {
  7: 1,
  8: 0.75,
  9: 0.5,
  10: 0.25,
  11: 0,
  12: -0.25,
  13: -0.5,
  14: -0.75,
};

export class PowerHelper {
  power: Power;
  charHelper: CharacteristicHelper;

  constructor(power: Power) {
    this.power = power;
    this.charHelper = new CharacteristicHelper(this.power);
  }

  advantages(): [] {
    return [];
  }

  activePoints(): number {
    if (this.power.XMLID in AllLables) {
      const charHelper = new CharacteristicHelper(this.power);

      return charHelper.totalCost() - BASE_CHARACTERISTIC_COST;
    }

    if (this.power.LEVELS > 0) {
      return this.power.LEVELS;
    }

    const adderCosts = this.adders().reduce((memo, adder) => {
      return memo + adder.BASECOST;
    }, 0);

    // TODO: What do advantages look like?
    const advantagesCosts = this.advantages().reduce((memo, adv) => {
      return memo;
    }, 0);

    return Math.round(
      (this.power.BASECOST + adderCosts) * (1 + advantagesCosts)
    );
  }

  adders(): Adder[] {
    return this.charHelper.adders();
  }

  displayText(): string {
    const adderText = this.adders()
      .map((adder) => adder.ALIAS)
      .join("; ");
    return `${this.power.ALIAS}${
      this.power.INPUT ? `: ${this.power.INPUT}` : ""
    }${adderText ? ` (${adderText})` : ""}`;
  }

  // See pg 95 of manual
  realCost(): number | string {
    if (this.power.ALIAS === "Variable Power Pool") {
      return this.power.LEVELS;
    }

    // Part of multipower, so compute fixed or variable slots
    // TODO: Fix cost
    if (this.power.ULTRA_SLOT === "Yes") {
      return `${Math.max(1, Math.round(this.activePoints() / 10))}f`;
    }

    if (this.power.XMLID in AllLables) {
      const powerCost = this.activePoints();
      const modifiersCost = coalesceArray(this.power.MODIFIER).reduce(
        (memo, mod) => {
          const modHelper = new CharacteristicHelper(mod);
          const adderCosts = modHelper.adders().reduce((memo, adder) => {
            return memo + adder.BASECOST;
          }, 0);

          return memo + Math.abs(mod.BASECOST + adderCosts);
        },
        0
      );

      return Math.round(powerCost / (1 + modifiersCost));
    }

    if (this.power.ALIAS === "Compound Power") {
      const cost = Object.keys(this.power).reduce((memo, key) => {
        if (key.match(/POWER/)) {
          const powerHelper = new PowerHelper(this.power[key] as Power);
          const realCost = powerHelper.realCost();

          if (typeof realCost === "string") {
            return memo;
          }

          return memo + realCost;
        }

        if (key in CharacteristicLabel || key in DefenseLabel) {
          const powerHelper = new PowerHelper(this.power[key] as Power);
          const realCost = powerHelper.realCost();

          if (typeof realCost === "string") {
            return memo;
          }

          return memo + realCost;
        }

        return memo;
      }, 0);

      return cost;
    }

    const modifiersCost = coalesceArray(this.power.MODIFIER).reduce(
      (memo, mod) => {
        // Table on pg 115 of manual
        const ROLL_TYPE_MODIFIER = 0.5;

        const modHelper = new CharacteristicHelper(mod);
        const adderCosts = modHelper.adders().reduce((memo, adder) => {
          return memo + adder.BASECOST;
        }, 0);

        if (mod.XMLID === "REQUIRESASKILLROLL") {
          return (
            memo +
            Math.abs(
              mod.BASECOST +
                (-adderCosts + ROLL_TYPE_MODIFIER) *
                  REQUIRES_A_ROLL_OPTION_MODIFIERS_TABLE[mod.OPTION]
            )
          );
        } else {
          return memo + Math.abs(mod.BASECOST + adderCosts);
        }
      },
      0
    );

    return Math.round(this.activePoints() / (1 + modifiersCost));
  }

  end(): number {
    const realCost = this.realCost();

    if (typeof realCost === "string") {
      return 0;
    } else {
      return Math.round(realCost / 10);
    }
  }
}
