import type { Character } from "./Character";

export interface Campaign {
  rollHistory?: CampaignRoll[];
  name?: string;
  characters?: string[];
}

export interface CampaignRoll {
  character?: DocumentReference<Character>;
  toastMarkup?: string;
}
