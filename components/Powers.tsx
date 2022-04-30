import { useMemo } from "react";
import { AllLables, Character, CharacteristicLabel } from "../types/Character";
import { coalesceArray } from "../utils/misc";
import { CharacteristicHelper, PowerHelper } from "../utils/character";

interface Props {
  character: Character;
}

const EMPTY_STATE = <div>No perks available.</div>;

const modifierText = (powerHelper: CharacteristicHelper) => {
  if (!("MODIFIER" in powerHelper.characteristic)) {
    return <></>;
  }

  const modifiers = coalesceArray(powerHelper.characteristic.MODIFIER);

  return modifiers.map((modifier) => {
    const modifierHelper = new CharacteristicHelper(modifier);
    return (
      <div key={modifier.ID}>
        <div key={modifier.ID} className="flex gap-x-2 pl-4">
          <div>
            {modifier.ALIAS}
            {modifier.COMMENTS && ` (${modifier.COMMENTS})`}
            {modifier.OPTION_ALIAS && ": "}
          </div>
          {modifier.OPTION_ALIAS && <div>{modifier.OPTION_ALIAS}</div>}
        </div>
        <div className="pl-8">
          <div className="">{adderText(modifierHelper)}</div>
        </div>
      </div>
    );
  });
};

const adderCost = (perkHelper: CharacteristicHelper) => {
  return perkHelper
    .adders()
    .reduce((memo, adder) => memo + adder.BASECOST + adder.LEVELS, 0);
};

const adderText = (perkHelper: CharacteristicHelper) => {
  return perkHelper.adders().map((adder) => {
    return (
      <div key={adder.ID}>
        {/* TODO: Where does +1/+1d6 stuff come from? */}
        {adder.ALIAS}: {adder.OPTION_ALIAS}
      </div>
    );
  });
};

export const Powers = ({ character }: Props) => {
  const allPowers = useMemo(() => {
    const powers = coalesceArray(character.POWERS.POWER);
    const multipowers = coalesceArray(character.POWERS.MULTIPOWER);
    const vpps = coalesceArray(character.POWERS.VPP);
    const characteristics = Object.keys(character.POWERS).reduce(
      (memo, key) => {
        const power = character.POWERS[key];
        if (power.XMLID in AllLables) {
          memo.push(power);
        }

        return memo;
      },
      []
    );

    return [...powers, ...multipowers, ...vpps, ...characteristics]
      .filter((p) => !!p)
      .sort((a, b) => a.POSITION - b.POSITION);
  }, [character]);

  const powerRows = useMemo(() => {
    return allPowers.map((power) => {
      const powerCharHelper = new CharacteristicHelper(power);
      const powerHelper = new PowerHelper(power);
      return (
        <tr key={power.ID}>
          <td className="align-top">{powerHelper.realCost()}</td>
          <td className={!!power.PARENTID ? "pl-8" : ""}>
            <span className="italic font-semibold">
              {power.ALIAS}
              {power.NAME && `: ${power.NAME}`}
            </span>
            <div>{modifierText(powerCharHelper)}</div>
          </td>
          <td className="align-top">{powerHelper.end()}</td>
        </tr>
      );
    });
  }, [allPowers]);

  const totalCost = useMemo(() => {
    return allPowers.reduce((memo, power) => {
      const powerHelper = new PowerHelper(power);
      const realCost = powerHelper.realCost();

      if (typeof realCost === "string") {
        return memo + parseInt(realCost);
      } else {
        return memo + realCost;
      }
    }, 0);
  }, [allPowers]);

  if (allPowers.length === 0) {
    return EMPTY_STATE;
  }

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th>Cost</th>
          <th>Power</th>
          <th>END</th>
        </tr>
      </thead>
      <tbody>
        {powerRows}
        <tr className="text-lg font-bold">
          <td>{totalCost}</td>
          <td>Total Powers Cost</td>
        </tr>
      </tbody>
    </table>
  );
};
