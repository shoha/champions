import {
  Character,
  Characteristic,
  CharacteristicLabel,
  CombinedLabel,
} from "../types/Character";

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
  characteristic: Characteristic;

  constructor(characteristic: Characteristic) {
    this.characteristic = characteristic;
  }

  // Compute the total cost of a characteristic
  totalCost(): number {
    return (
      10 + this.characteristic.LEVELS * COST_TABLE[this.characteristic.XMLID]
    );
  }

  // Compute the total value of a characteristic
  totalValue(): number {
    return BASE_TABLE[this.characteristic.XMLID] + this.characteristic.LEVELS;
  }

  // Compute the roll value for a given characteristic
  getRoll(): string {
    return `${9 + Math.round(this.totalValue() / 5)}-`;
  }

  getSupplementalNote(): string {
    switch (this.characteristic.XMLID) {
      case CharacteristicLabel.STR: {
        const strengthEntry = STRENGTH_TABLE[this.totalValue()];
        return `Lift: ${strengthEntry.lift}kg; Throw: ${strengthEntry.throw}m; Damage: ${strengthEntry.damage}`;
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
