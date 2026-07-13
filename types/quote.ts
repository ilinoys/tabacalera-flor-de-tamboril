export interface QuoteItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface Quote {
  customerName: string;
  company?: string;
  email: string;
  phone: string;

  items: QuoteItem[];

  subtotal: number;
  total: number;
}