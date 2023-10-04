import { Ability } from "./ability";
import { Profile } from "./profile";

export enum WayType {
  "character",
  "creature",
  "prestige",
  "race",
}

export type Way = {
  slug: string;
  label: string;
  type: WayType;
  additionalDescription?: string | null;
  linkedProfiles: Profile[];
  abilities: Ability[];
};
