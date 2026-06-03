export interface Product {
  id: number
  name: string
  category: Category
  price: number
  discount?: number
  emoji: string
  featured: boolean
  inStock: boolean
  desc: string
  specs: Record<string, string>
}

export interface CartItem extends Product {
  qty: number
}

export type Category =
  | 'Smartphones'
  | 'Audio & Woofers'
  | 'TVs & Electronics'
  | 'Kitchen Appliances'
  | 'Home & Living'

export interface CategoryInfo {
  name: Category
  emoji: string
  desc: string
}
