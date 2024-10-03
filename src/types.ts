export interface SearchQuery {
  [key: string | number]: string | number;
}

export interface User {
  _id?: string;
  level?: string;
  id: string;
  password: string;
  name: string;
  email: string;
  image?: string;
  contact: string;
  shipTo: string;
  createdAt?: string;
}

export interface Recipe {
  _id: string;
  userId?: string;
  name: string;
  description: string;
  images: string[];
  foodCategory: string;
  moodCategory: string;
  methodCategory: string;
  ingredientCategory: string;
  etcCategory: string;
  servings: string;
  time: string;
  difficulty: string;
  ingredients: Ingredient[] | { _id?: string; name: string; qty: number; unit: string; }[];
  steps: { description: string; image: string | null }[];
  categories?: {
    food: string;
    mood: string;
    method: string;
    ingredient: string;
    etc: string;
  };
  viewCnt?: number;
  reviewCnt?: number;
  createdAt?: string;
}


export interface RecipeItem {
  _id: string;
  images: string[];
  title: string;
  name: string;
  description: string;
}

export interface Ingredient {
  _id: string;
  name: string;
  description?: string;
  images: string[];
  price: number;
  qty: number;
  unit: string;
  discount?: number;
  discountPrice?: number;
  category?: string[];
  stock?: number;
  status?: string;
  reviewCnt?: number;
  totalSales: number; 
  createdAt?: string;
}

export interface Review {
  _id: string;
  recipeId?: string;
  ingredientId?: string;
  userId: {
    _id: string;
    id: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Order {
  _id?: string;
  orderNum?: string;
  createdAt?: string;
  userId?: {
    email: string;
  };
  items: {
    ingredientId?: {
      name: string;
    };
  }[];
  contactInfo?: {
    shipTo: {
      address: string;
      city: string;
    };
  };
  totalPrice: number;
  status: 'preparing' | 'shipping' | 'delivered' | 'refund';
}

export interface OrderItem {
  _id: string;
  orderNum: string;
  createdAt: string;
  items: Array<{
    ingredientId: {
      name: string;
    };
  }>;
  totalPrice: number;
  status: 'preparing' | 'shipping' | 'delivered' | 'refund';
}

export interface CreateOrderResponse {
  orderNum: string;     
  createdAt: string;       
  userId?: {
    email: string;        
  };
  items: {
    ingredientId?: {
      name: string;         
    };
    price: number;          
    qty: number;           
  }[];
  contactInfo?: {
    shipTo: {
      address: string;      
      city: string;         
    };
  };
  totalPrice: number;       
  status: string;           
}

export interface CartItemType {
  ingredientId: Ingredient;
  qty: number;
}

export interface FridgeItem {
  _id: string;
  name: string;
  ingredientId : Ingredient;
}

export interface ShoppingListItem {
  _id: string;
  name: string;
  completed?: boolean; 
}

export interface ShoppingListState {
  selectedShoppingList: ShoppingListItem[];
  completedShoppingList: ShoppingListItem[];
}

export interface RecentlyViewedItem {
  id: string;
  name: string;
  images: string;
}