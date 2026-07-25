import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

interface Props {
  customerName: string;
  company?: string | null;
  email: string;
  phone: string;
  country: string;
  city: string;
  salesperson?: string | null;
}

const styles = StyleSheet.create({
  container: {
    border: 1,
    borderColor: "#D4AF37",
    padding: 15,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#D4AF37",
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    width: "48%",
  },

  row: {
    marginBottom: 6,
    fontSize: 10,
  },

  label: {
    fontWeight: "bold",
    color: "#222",
  },
});

export default function PdfCustomer({
  customerName,
  company,
  email,
  phone,
  country,
  city,
  salesperson,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Información del Cliente
      </Text>

      <View style={styles.content}>
        <View style={styles.column}>
          <Text style={styles.row}>
            <Text style={styles.label}>
              Cliente:
            </Text>{" "}
            {customerName}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.label}>
              Empresa:
            </Text>{" "}
            {company || "-"}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.label}>
              Correo:
            </Text>{" "}
            {email}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.label}>
              Teléfono:
            </Text>{" "}
            {phone}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.row}>
            <Text style={styles.label}>
              País:
            </Text>{" "}
            {country}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.label}>
              Ciudad:
            </Text>{" "}
            {city}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.label}>
              Vendedor:
            </Text>{" "}
            {salesperson || "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}