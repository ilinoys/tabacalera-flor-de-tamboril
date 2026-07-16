import {
  View,
  Text,
  StyleSheet,
  Image as PdfImage,
} from "@react-pdf/renderer";
import type { ImageProps } from "@react-pdf/renderer";

interface Props {
  quotationNumber: string;
  createdAt: string;
  validUntil?: string | null;
  status: string;
  currency?: string;
  company: {
    name: string;
    slogan?: string | null;
    logoSrc?: string | null;
    showLogo: boolean;
    rnc?: string | null;
    address: string;
    city: string;
    country: string;
    phone?: string | null;
    mobile?: string | null;
    email?: string | null;
    website?: string | null;
  };
}

type AccessibleImageProps = ImageProps & {
  alt: string;
};

function AccessibleImage({
  alt,
  ...props
}: AccessibleImageProps) {
  void alt;

  return <PdfImage {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: 2,
    borderBottomColor: "#D4AF37",
    paddingBottom: 18,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  logo: {
    width: 65,
    height: 65,
    marginRight: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D4AF37",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
    fontSize: 10,
  },

  company: {
    marginTop: 8,
    fontSize: 9,
    color: "#777",
    lineHeight: 1.5,
  },

  right: {
    width: 190,
    alignItems: "flex-end",
  },

  quotation: {
    fontSize: 17,
    fontWeight: "bold",
  },

  row: {
    marginTop: 5,
    fontSize: 10,
    color: "#555",
  },

  label: {
    fontWeight: "bold",
    color: "#222",
  },

  status: {
    marginTop: 12,
    backgroundColor: "#D4AF37",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default function PdfHeader({
  quotationNumber,
  createdAt,
  validUntil,
  status,
  currency,
  company,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {company.showLogo && company.logoSrc ? (
          <AccessibleImage
            src={company.logoSrc}
            style={styles.logo}
            alt={company.name}
          />
        ) : null}

        <View>
          <Text style={styles.title}>
            {company.name}
          </Text>

          <Text style={styles.subtitle}>
            {company.slogan || "Dominican Premium Cigars"}
          </Text>

          <Text style={styles.company}>
            {company.address}
            {", "}
            {company.city}
            {"\n"}
            {company.country}
            {company.rnc ? ` | RNC: ${company.rnc}` : ""}
            {"\n"}
            {company.phone ? `Tel: ${company.phone}` : ""}
            {company.mobile
              ? ` | Movil: ${company.mobile}`
              : ""}
            {"\n"}
            {company.email || ""}
            {company.website
              ? ` | ${company.website}`
              : ""}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.quotation}>
          {quotationNumber}
        </Text>

        <Text style={styles.row}>
          <Text style={styles.label}>
            Fecha:
          </Text>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </Text>

        <Text style={styles.row}>
          <Text style={styles.label}>
            Valida hasta:
          </Text>{" "}
          {validUntil
            ? new Date(validUntil).toLocaleDateString()
            : "-"}
        </Text>

        <Text style={styles.row}>
          <Text style={styles.label}>
            Moneda:
          </Text>{" "}
          {currency || "USD"}
        </Text>

        <Text style={styles.status}>
          {status}
        </Text>
      </View>
    </View>
  );
}
