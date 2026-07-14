import {
  Document,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

import PdfHeader from "./PdfHeader";
import PdfCustomer from "./PdfCustomer";
import PdfProducts from "./PdfProducts";
import PdfTotals from "./PdfTotals";
import PdfFooter from "./PdfFooter";

interface ProductItem {
  id: string;
  quantity: number;
  price: number;

  product: {
    name: string;
  };
}

interface Customer {
  customerName: string;
  company?: string | null;
  email: string;
  phone: string;
  country: string;
  city: string;
}

interface Props {
  quotationNumber: string;

  createdAt: string;

  validUntil?: string | null;

  status: string;

  currency?: string;

  paymentTerms?: string | null;

  deliveryTime?: string | null;

  incoterm?: string | null;

  salesperson?: string | null;

  customer: Customer;

  items: ProductItem[];

  subtotal: number;

  discount: number;

  total: number;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontSize: 11,
    color: "#222",
    fontFamily: "Helvetica",
  },

  section: {
    marginBottom: 18,
  },
});

export default function QuotationPDF({
  quotationNumber,
  createdAt,
  validUntil,
  status,
  currency,
  paymentTerms,
  deliveryTime,
  incoterm,
  salesperson,
  customer,
  items,
  subtotal,
  discount,
  total,
}: Props) {
  return (
    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        <View style={styles.section}>
          <PdfHeader
            quotationNumber={quotationNumber}
            createdAt={createdAt}
            validUntil={validUntil}
            status={status}
            currency={currency}
          />
        </View>

        <View style={styles.section}>
          <PdfCustomer
            {...customer}
            salesperson={salesperson}
          />
        </View>

        <View style={styles.section}>
          <PdfProducts
            items={items}
          />
        </View>

        <View style={styles.section}>
          <PdfTotals
            subtotal={subtotal}
            discount={discount}
            total={total}
            currency={currency}
          />
        </View>

        <View>
          <PdfFooter
            paymentTerms={paymentTerms}
            deliveryTime={deliveryTime}
            incoterm={incoterm}
          />
        </View>

      </Page>

    </Document>
  );
}