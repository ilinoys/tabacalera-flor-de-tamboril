import CustomerSelector from "../CustomerSelector";
import ProductSelector from "../ProductSelector";
import QuotationItems from "../QuotationItems";
import QuotationOptions from "../QuotationOptions";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Item {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  customerId: string;
  onCustomerChange: (value: string) => void;

  items: Item[];

  onAddProduct: (product: Product) => void;

  onUpdateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  onRemoveProduct: (productId: string) => void;

  validUntil: string;
  onValidUntilChange: (value: string) => void;

  currency: string;
  onCurrencyChange: (value: string) => void;
  exchangeRate: number;

  paymentTerms: string;
  onPaymentTermsChange: (value: string) => void;

  deliveryTime: string;
  onDeliveryTimeChange: (value: string) => void;

  incoterm: string;
  onIncotermChange: (value: string) => void;

  salesperson: string;
  onSalespersonChange: (value: string) => void;
}

export default function QuotationForm({
  customerId,
  onCustomerChange,
  items,
  onAddProduct,
  onUpdateQuantity,
  onRemoveProduct,
  validUntil,
  onValidUntilChange,
  currency,
  onCurrencyChange,
  exchangeRate,
  paymentTerms,
  onPaymentTermsChange,
  deliveryTime,
  onDeliveryTimeChange,
  incoterm,
  onIncotermChange,
  salesperson,
  onSalespersonChange,
}: Props) {
  return (
    <div className="space-y-6">

      <CustomerSelector
        value={customerId}
        onChange={onCustomerChange}
      />

      <QuotationOptions
        validUntil={validUntil}
        onValidUntilChange={onValidUntilChange}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        paymentTerms={paymentTerms}
        onPaymentTermsChange={onPaymentTermsChange}
        deliveryTime={deliveryTime}
        onDeliveryTimeChange={onDeliveryTimeChange}
        incoterm={incoterm}
        onIncotermChange={onIncotermChange}
        salesperson={salesperson}
        onSalespersonChange={onSalespersonChange}
      />

      <ProductSelector
        currency={currency}
        exchangeRate={exchangeRate}
        onAdd={onAddProduct}
      />

      <QuotationItems
        items={items}
        currency={currency}
        exchangeRate={exchangeRate}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemoveProduct}
      />

    </div>
  );
}
