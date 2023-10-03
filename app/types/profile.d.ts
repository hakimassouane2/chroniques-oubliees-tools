export type Profile = {
  name: string;
  description: string;
  hasMagicAttackModifier: boolean;
  hd: string;
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
