export interface OrderItem {
  id: string;
  quantity: number;
  price: number;

  product: {
    id?: string;
    name: string;
  };
}

export interface Order {
  id: string;

  customerName: string;
  company?: string;

  email: string;
  phone: string;

  country: string;
  city: string;

  customerType: string;
  status: string;

  notes?: string;

  createdAt: string;

  items: OrderItem[];
}