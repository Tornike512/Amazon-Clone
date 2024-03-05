export interface TAuthRequest {
  access_token: string;
  refresh_token: string;
}

export interface TUserRequest {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: null | string;
}

export interface TCategory {
  id: string;
  name: string;
}

export interface TGetProducts {
  category: TCategory;
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice: null;
  category_name: string;
  id: string;
}

export interface TCartProducts {
  cartProduct: TGetProducts;
  count: number;
  id: string;
  product_id: string;
  user_id: string;
}

export interface TPurchaseInfo {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
}
