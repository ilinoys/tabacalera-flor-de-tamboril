import QuotationForm from "./QuotationForm";
import SaveQuotationButton from "./SaveQuotationButton";
import TotalsCard from "../TotalsCard";

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

  subtotal: number;
  discount: number;
  onDiscountChange: (value: number) => void;

  saving: boolean;
  onSave: () => void;
}

export default function QuotationModalContent(props: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">

      <div className="space-y-6 lg:col-span-2">

        <QuotationForm
          customerId={props.customerId}
          onCustomerChange={props.onCustomerChange}
          items={props.items}
          onAddProduct={props.onAddProduct}
          onUpdateQuantity={props.onUpdateQuantity}
          onRemoveProduct={props.onRemoveProduct}
          validUntil={props.validUntil}
          onValidUntilChange={props.onValidUntilChange}
          currency={props.currency}
          onCurrencyChange={props.onCurrencyChange}
          exchangeRate={props.exchangeRate}
          paymentTerms={props.paymentTerms}
          onPaymentTermsChange={props.onPaymentTermsChange}
          deliveryTime={props.deliveryTime}
          onDeliveryTimeChange={props.onDeliveryTimeChange}
          incoterm={props.incoterm}
          onIncotermChange={props.onIncotermChange}
          salesperson={props.salesperson}
          onSalespersonChange={props.onSalespersonChange}
        />

      </div>

      <div>

        <TotalsCard
          subtotal={props.subtotal}
          discount={props.discount}
          currency={props.currency}
          exchangeRate={props.exchangeRate}
          onDiscountChange={props.onDiscountChange}
        />

        <SaveQuotationButton
          saving={props.saving}
          onClick={props.onSave}
        />

      </div>

    </div>
  );
}
