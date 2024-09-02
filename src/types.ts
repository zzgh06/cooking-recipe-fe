export interface SearchQuery {
  [key: string]: string | number;
}

export interface User {
  _id?: string;
  level? : string;
  image: string;
  email: string;
  name: string;
  contact: string;
  shipTo: string;
}

export interface Recipe {
  _id: string;
  name: string;
  description?: string;
  images: string[];
  userId: string;
  difficulty?: string;
  time?: string;
}


export interface ShoppingListItem {
  _id: string;
  name: string;
  completed: boolean; 
}

export interface ShoppingListState {
  selectedShoppingList: ShoppingListItem[];
  completedShoppingList: ShoppingListItem[];
}