export type RawMaterialStatus = "ACTIVE" | "INACTIVE";

export interface RawMaterial {
  id: string;
  code: string;
  name: string;
  description: string | null;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  cost: number;
  supplier: string | null;
  status: RawMaterialStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RawMaterialFormData {
  code: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  currentStock: string;
  minimumStock: string;
  cost: string;
  status: RawMaterialStatus;
}
