interface TypeIdName {
  id: string;
  name: string;
}

export interface Ingredient extends TypeIdName {
  quantity: number;
  unit?: string;
  alias?: string[];
  expiration?: string;
  notes?: string;
  cost?: number;
  category: Category;
}

export interface Recipe extends TypeIdName {
  ingredients?: Ingredient[];
  time?: string;
  tags?: Tag[];
  steps?: string;
}

export interface Category extends TypeIdName {
  colour: string;
  reference: string[];
}

export interface Tag extends TypeIdName {
  colour: string;
  reference: string[];
}
