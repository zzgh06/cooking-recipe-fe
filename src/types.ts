export interface ShoppingListItem {
  _id: string;
  name: string;
  completed: boolean; 
}

export interface ShoppingListState {
  selectedShoppingList: ShoppingListItem[];
  completedShoppingList: ShoppingListItem[];
}