import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

import { formatCurrency } from "@/lib/currency";

interface Item {
  id: string;
  quantity: number;
  price: number;

  product: {
    name: string;
  };
}

interface Props {
  items: Item[];
  currency?: string;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 12,
  },

  table: {
    border: 1,
    borderColor: "#D4AF37",
  },

  header: {
    flexDirection: "row",
    backgroundColor: "#D4AF37",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 8,
  },

  row: {
    flexDirection: "row",
    borderTop: 1,
    borderTopColor: "#ddd",
    paddingVertical: 8,
  },

  product: {
    width: "50%",
    paddingHorizontal: 8,
    fontSize: 10,
  },

  qty: {
    width: "15%",
    textAlign: "center",
    fontSize: 10,
  },

  price: {
    width: "17.5%",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },

  total: {
    width: "17.5%",
    textAlign: "right",
    paddingRight: 8,
    fontSize: 10,
  },
});

export default function PdfProducts({
  items,
  currency = "USD",
}: Props) {
  return (
    <View>

      <Text style={styles.title}>
        Productos
      </Text>

      <View style={styles.table}>

        <View style={styles.header}>

          <Text style={styles.product}>
            Producto
          </Text>

          <Text style={styles.qty}>
            Cant.
          </Text>

          <Text style={styles.price}>
            Precio
          </Text>

          <Text style={styles.total}>
            Total
          </Text>

        </View>

        {items.map((item) => (

          <View
            key={item.id}
            style={styles.row}
          >

            <Text style={styles.product}>
              {item.product.name}
            </Text>

            <Text style={styles.qty}>
              {item.quantity}
            </Text>

            <Text style={styles.price}>
              {formatCurrency(item.price, currency)}
            </Text>

            <Text style={styles.total}>
              {formatCurrency(
                item.quantity * item.price,
                currency
              )}
            </Text>

          </View>

        ))}

      </View>

    </View>
  );
}
