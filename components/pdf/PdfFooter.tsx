import {
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

interface Props {
  paymentTerms?: string | null;
  deliveryTime?: string | null;
  incoterm?: string | null;
  notes?: string | null;
  company: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone?: string | null;
    mobile?: string | null;
    email?: string | null;
    website?: string | null;
    pdfFooter?: string | null;
    showSignature: boolean;
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderTop: 1,
    borderTopColor: "#D4AF37",
    paddingTop: 18,
  },

  section: {
    marginBottom: 15,
  },

  title: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 6,
  },

  text: {
    fontSize: 9,
    color: "#555",
    lineHeight: 1.5,
  },

  signatures: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  signatureBox: {
    width: "40%",
    alignItems: "center",
  },

  line: {
    width: "100%",
    borderTop: 1,
    borderTopColor: "#444",
    marginBottom: 5,
  },

  company: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 9,
    color: "#666",
    lineHeight: 1.5,
  },
});

export default function PdfFooter({
  paymentTerms,
  deliveryTime,
  incoterm,
  notes,
  company,
}: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.section}>

        <Text style={styles.title}>
          Condiciones Comerciales
        </Text>

        <Text style={styles.text}>
          Incoterm: {incoterm || "-"}
        </Text>

        <Text style={styles.text}>
          Tiempo de entrega: {deliveryTime || "-"}
        </Text>

        <Text style={styles.text}>
          Condiciones de pago:
        </Text>

        <Text style={styles.text}>
          {paymentTerms || "-"}
        </Text>

        {notes ? (
          <>
            <Text style={styles.text}>
              Notas:
            </Text>

            <Text style={styles.text}>
              {notes}
            </Text>
          </>
        ) : null}

      </View>

      {company.showSignature ? (
        <View style={styles.signatures}>

          <View style={styles.signatureBox}>

            <View style={styles.line} />

            <Text style={styles.text}>
              Firma del Cliente
            </Text>

          </View>

          <View style={styles.signatureBox}>

            <View style={styles.line} />

            <Text style={styles.text}>
              {company.name}
            </Text>

          </View>

        </View>
      ) : null}

      <Text style={styles.company}>
        {company.pdfFooter ||
          `${company.name}\n${company.address}, ${company.city}, ${company.country}`}
        {"\n"}
        {company.phone ? `Tel: ${company.phone}` : ""}
        {company.mobile ? ` | Movil: ${company.mobile}` : ""}
        {"\n"}
        {company.email || ""}
        {company.website ? ` | ${company.website}` : ""}
      </Text>

    </View>
  );
}
