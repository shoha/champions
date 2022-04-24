import { useMemo } from "react";
import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";
import { coalesceArray } from "../utils/misc";

const adderCost = (disadHelper: CharacteristicHelper) => {
  return disadHelper.adders().reduce((memo, adder) => memo + adder.BASECOST, 0);
};

const adderText = (disadHelper: CharacteristicHelper) => {
  return disadHelper.adders().map((adder) => {
    const isChild = adder.POSITION === -1;
    return (
      <div key={adder.ID} className={`${isChild && "pl-8 italic text-sm"}`}>
        {adder.ALIAS}: {adder.OPTION_ALIAS}
      </div>
    );
  });
};

interface Props {
  character: Character;
}

export const Disadvantages = ({ character }: Props) => {
  const disadvantages = coalesceArray(character.DISADVANTAGES.DISAD);

  const disadvantageRows = useMemo(() => {
    return disadvantages.map((disad, i) => {
      const disadHelper = new CharacteristicHelper(disad);
      const adderRows = adderText(disadHelper);
      return (
        <tr key={i}>
          <td className="align-top">
            {disad.BASECOST + adderCost(disadHelper)}
          </td>
          <td>
            <div>
              {disad.ALIAS}
              {disad.INPUT && `: ${disad.INPUT}`}
            </div>
            <div>{adderRows}</div>
            {disad.NOTES && (
              <div className="pl-4">
                <span className="font-bold italic">Notes: </span>
                {disad.NOTES}
              </div>
            )}
          </td>
        </tr>
      );
    });
  }, [disadvantages]);

  const totalCost = useMemo(() => {
    return disadvantages.reduce((memo, disad) => {
      const disadHelper = new CharacteristicHelper(disad);
      return memo + disad.BASECOST + adderCost(disadHelper);
    }, 0);
  }, [disadvantages]);

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Disadvantage</th>
        </tr>
      </thead>
      <tbody>
        {disadvantageRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Disadvantages Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
