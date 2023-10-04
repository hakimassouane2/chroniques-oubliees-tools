export type Profile = {
  name: string;
  description: string;
  hasMagicAttackModifier: boolean;
  hd: DiceKey;
  weaponsAndArmor: string;
  startingEquipment: string;
  imageUrl: string;
  imageUrlCropped: string;
  ways: Way[];
};

export type Way = {
  name: string;
  abilities: Ability[];
};

export type Ability = {
  name: string;
  description: string;
};

export type DiceKey = "1d4" | "1d6" | "1d8" | "1d10" | "1d12" | "1d20";
