import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

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
  const symbol =
    currency === "EUR"
      ? "EUR"
      : currency === "DOP"
      ? "RD$"
      : "US$";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>
            Subtotal
          </Text>

          <Text>
            {symbol} {subtotal.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            Descuento
          </Text>

          <Text>
            {symbol} {discount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            TOTAL
          </Text>

          <Text style={styles.totalText}>
            {symbol} {total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
