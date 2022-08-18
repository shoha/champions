import { User } from "firebase/auth";

import { createMachine, interpret } from "xstate";
import { createModel } from "xstate/lib/model";
import { Character } from "../types/Character";

const appModel = createModel({
  user: null as User,
  characters: null as Character[],
  currentCharacter: null as CharacterData,
});

const stateMachine = createMachine({
  id: "app",
  context: appModel.initialContext,
  initial: "init",
  states: {
    init: {
      on: { LOGGED_IN: "fetching" },
    },
    fetching: {
      on: { CHARACTERS_LOADED: "playing", NO_CHARACTERS_FOUND: "empty" },
    },
    empty: { on: { CREATE: "creating" } },
    creating: {
      on: {
        CHARACTER_CREATED: "playing",
        CANCEL_CREATE: [
          { target: "empty", cond: () => true },
          { target: "playing" },
        ],
      },
    },
    playing: { on: { CHARACTER_SELECTED: "playing" } },
  },
});

export const rootService = interpret(stateMachine);
rootService.start();
