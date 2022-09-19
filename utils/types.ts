// Use alias when search is implemented
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  // alias?: string[];
  expiration?: string;
  notes?: string;
  cost?: number;
  category?: Category;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients?: Ingredient[];
  time?: string;
  tags?: Tag[];
  steps?: string;
}

export interface Category {
  id: string;
  colour?: string;
}

export interface Tag {
  id: string;
  colour?: string;
}
