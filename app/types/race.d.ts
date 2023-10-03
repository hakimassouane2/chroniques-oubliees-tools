export type Race = {
  name: string;
  mainDescription: string;
  secondDescription: string;
  imageUrl: string;
  appearance: Appearance;
  statistics: string;
  racials: Racial[];
  usualNames: string;
};

export type Appearance = {
  description: string;
  startingAge: string;
  lifeSpan: string;
  minHeight: string;
  minWeight: string;
  maxHeight: string;
  maxWeight: string;
};

export type Racial = {
  name: string;
  description: string;
};
