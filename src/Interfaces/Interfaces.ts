export interface ProductI {
  sold?: number
  images: string[]
  subcategory: CategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryI
  brand: CategoryI
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: any[]
}

export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}

export interface CartResponseI {
  status: string
  message?: string
  numOfCartItems: number
  cartId: string
  data: CartDataI
}

export interface CartDataI {
  _id: string
  cartOwner: string
  products: item[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface item {
  count: number
  _id: string
  product: ProductI
  price: number
}

export interface CheckoutSessionI {
  status: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
}
