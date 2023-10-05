import { Way } from "./way";

export type Profile = {
  slug: string;
  label: string;
  description: string;
  hasMagicAttackModifier: boolean;
  hd: DiceKey;
  weaponsAndArmor: string;
  startingEquipment: string;
  imageUrl: string;
  imageUrlCropped: string;
  ways: Way[];
};

export type DiceKey = "1d4" | "1d6" | "1d8" | "1d10" | "1d12" | "1d20";
