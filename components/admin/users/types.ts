export const USER_ROLES = [
  "ADMIN",
  "MANAGER",
  "SALES",
  "INVENTORY",
  "USER",
] as const;

export const USER_STATUSES = [
  "ACTIVE",
  "INACTIVE",
  "LOCKED",
] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];

export type ManagedUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string | null;
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type SortField =
  | "name"
  | "username"
  | "email"
  | "role"
  | "status"
  | "createdAt";

export type SortDirection = "asc" | "desc";
