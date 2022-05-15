import type { Character } from "./Character";

export interface Campaign {
  rollHistory?: CampaignRoll[];
  name?: string;
  characters?: DocumentReference<Character>[];
  users?: string[];
  admin?: string;
  public?: boolean;
}

export interface CampaignRoll {
  character?: DocumentReference<Character>;
  characterName?: string;
  toastMarkup?: string;
  id: string;
}
