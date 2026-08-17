export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
  featured: boolean;
}

export interface ProductImportRow {
  name: string;
  description: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
  price: number;
  stock: number;
  featured: boolean;
}

export type ProductImportStatus = "valid" | "error" | "duplicate";

export interface ProductImportValidationResult {
  rowIndex: number;
  status: ProductImportStatus;
  normalizedData: ProductImportRow | null;
  errors: string[];
}

export interface ProductImportSummary {
  totalRows: number;
  validRows: number;
  errorRows: number;
  duplicateRows: number;
  validProducts: ProductImportRow[];
}
