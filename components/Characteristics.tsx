import { useMemo } from "react";
import {
  Character,
  Characteristic,
  CharacteristicLabel,
  Movement,
  MovementLabel,
} from "../types/Character";
import { CharacteristicHelper } from "../utils/character";
import { CharacteristicRoller } from "./CharacteristicRoller";

interface Props {
  character: Character;
}

const rollable = [
  CharacteristicLabel.STR,
  CharacteristicLabel.DEX,
  CharacteristicLabel.CON,
  CharacteristicLabel.INT,
  CharacteristicLabel.EGO,
  CharacteristicLabel.PRE,
];

export const Characteristics = ({ character }: Props) => {
  const characteristics = character.CHARACTERISTICS;

  const attrRows = useMemo(() => {
    return Object.values(CharacteristicLabel).map((attr) => {
      const attrData: Characteristic = characteristics[attr];
      const charHelper = new CharacteristicHelper(attrData);
      const isRollable = rollable.includes(attr);

      return (
        <tr className="table-row" key={attrData.ID}>
          <td>
            {isRollable ? (
              <CharacteristicRoller
                label={attr}
                characteristic={attrData}
              ></CharacteristicRoller>
            ) : (
              charHelper.totalValue()
            )}
          </td>
          <td className="uppercase">{attr}</td>
          <td>{charHelper.totalCost()}</td>
          <td>{charHelper.totalValue()}</td>
          <td>{isRollable && charHelper.roll()}</td>
          <td>{attrData.NOTES || charHelper.supplementalNote()}</td>
        </tr>
      );
    });
  }, [characteristics]);

  const movementRows = useMemo(() => {
    return Object.values(MovementLabel).map((movement) => {
      const movementData: Movement = characteristics[movement];
      const charHelper = new CharacteristicHelper(movementData);

      return (
        <tr className="table-row" key={movementData.ID}>
          <td>{charHelper.totalValue()}</td>
          <td className="uppercase">{movement}</td>
          <td>{charHelper.totalCost()}</td>
          <td>{`${charHelper.totalValue()}m/${
            charHelper.totalValue() * 2
          }m`}</td>
          <td></td>
          <td></td>
        </tr>
      );
    });
  }, [characteristics]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Val</th>
          <th>Char</th>
          <th>Points</th>
          <th>Total</th>
          <th>Roll</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>{attrRows}</tbody>
    </table>
  );
};
