import { Profile } from "./profile";
import { Way } from "./way";

export type Ability = {
  name: string;
  description: string;
  isLimited: boolean;
  isSpell: boolean;
  rank: number;
  linkedProfiles: Profile[];
  linkedWays: Way[];
};
