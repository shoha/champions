import { useMemo } from "react";
import type { Character } from "../types/Character";
import { CharacteristicHelper } from "../utils/character";
import { coalesceArray } from "../utils/misc";

const EMPTY_STATE = <div>No perks available.</div>;

const adderCost = (perkHelper: CharacteristicHelper) => {
  return perkHelper
    .adders()
    .reduce((memo, adder) => memo + adder.BASECOST + adder.LEVELS, 0);
};

const adderText = (perkHelper: CharacteristicHelper) => {
  return perkHelper.adders().map((adder) => {
    const isChild = adder.POSITION === -1;
    return (
      <div key={adder.ID} className={`${isChild && "pl-8 italic text-sm"}`}>
        {/* TODO: Where does +1/+1d6 stuff come from? */}
        {adder.ALIAS}: {adder.OPTION_ALIAS}
      </div>
    );
  });
};

interface Props {
  character: Character;
}

export const Perks = ({ character }: Props) => {
  const perks = coalesceArray(character.PERKS.PERK);

  const perkRows = useMemo(() => {
    return perks.map((perk) => {
      const perkHelper = new CharacteristicHelper(perk);
      return (
        <tr key={perk.ID}>
          {/* TODO: Fix cost */}
          <td className="align-top">
            {perk.BASECOST + perk.LEVELS + adderCost(perkHelper)}
          </td>
          <td>
            {perk.NAME}: {perk.ALIAS} {adderText(perkHelper)}
          </td>
        </tr>
      );
    });
  }, [perks]);

  const totalCost = useMemo(() => {
    return perks.reduce((memo, perk) => {
      const perkHelper = new CharacteristicHelper(perk);
      return memo + perk.BASECOST + perk.LEVELS + adderCost(perkHelper);
    }, 0);
  }, [perks]);

  if (perks.length === 0) {
    return EMPTY_STATE;
  }

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Perk</th>
        </tr>
      </thead>
      <tbody>
        {perkRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total perks Cost</td>
        </tr>
      </tbody>
    </table>
  );
};