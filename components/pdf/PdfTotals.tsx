import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { formatCurrency } from "@/lib/currency";

interface Props {
  subtotal: number;
  discount: number;
  total: number;
  currency?: string;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "flex-end",
  },

  card: {
    width: 240,
    border: 1,
    borderColor: "#D4AF37",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: 1,
    borderBottomColor: "#ddd",
    fontSize: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#D4AF37",
  },

  label: {
    fontWeight: "bold",
  },

  totalText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default function PdfTotals({
  subtotal,
  discount,
  total,
  currency,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>
            Subtotal
          </Text>

          <Text>
            {formatCurrency(subtotal, currency)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Descuento
          </Text>

          <Text>
            {formatCurrency(discount, currency)}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            TOTAL
          </Text>

          <Text style={styles.totalText}>
            {formatCurrency(total, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
}
