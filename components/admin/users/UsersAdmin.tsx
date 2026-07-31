"use client";

import {
  ArrowDown,
  ArrowUp,
  Edit,
  KeyRound,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import ResetPasswordModal from "./ResetPasswordModal";
import UserFormModal from "./UserFormModal";
import {
  ManagedUser,
  Pagination,
  SortDirection,
  SortField,
  USER_ROLES,
  USER_STATUSES,
  UserFormData,
  UserRole,
  UserStatus,
} from "./types";

type UserResponse = {
  users: ManagedUser[];
  pagination: Pagination;
  error?: string;
};

type ModalState =
  | {
      type: "create";
      user?: null;
    }
  | {
      type: "edit";
      user: ManagedUser;
    }
  | {
      type: "reset";
      user: ManagedUser;
    }
  | null;

const PAGE_SIZE = 10;

function formatDate(value: string | null) {
  if (!value) {
    return "Sin registro";
  }

  return new Intl.DateTimeFormat("es-DO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: UserStatus) {
  if (status === "ACTIVE") {
    return "bg-emerald-950 text-emerald-300";
  }

  if (status === "LOCKED") {
    return "bg-red-950 text-red-300";
  }

  return "bg-neutral-800 text-neutral-300";
}

function roleClass(role: UserRole) {
  return role === "ADMIN"
    ? "bg-yellow-600/20 text-yellow-500"
    : "bg-neutral-800 text-neutral-300";
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [status, setStatus] = useState<UserStatus | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      sortBy,
      sortDirection,
    });

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (role !== "ALL") {
      params.set("role", role);
    }

    if (status !== "ALL") {
      params.set("status", status);
    }

    return params.toString();
  }, [page, role, search, sortBy, sortDirection, status]);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/admin/users?${query}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as UserResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudieron cargar usuarios.");
      }

      setUsers(data.users);
      setPagination(data.pagination);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudieron cargar usuarios."
      );
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  function changeSort(nextSortBy: SortField) {
    setPage(1);
    setSortBy((current) => {
      if (current === nextSortBy) {
        setSortDirection((direction) =>
          direction === "asc" ? "desc" : "asc"
        );
        return current;
      }

      setSortDirection("asc");
      return nextSortBy;
    });
  }

  async function submitUser(data: UserFormData) {
    const isEdit = modal?.type === "edit";
    const targetUser = isEdit ? modal.user : null;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await fetch(
        isEdit
          ? `/api/admin/users/${targetUser?.id}`
          : "/api/admin/users",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEdit
              ? {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  role: data.role,
                  status: data.status,
                }
              : data
          ),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "No se pudo guardar.");
      }

      setModal(null);
      setMessage(
        isEdit
          ? "Usuario actualizado correctamente."
          : "Usuario creado correctamente."
      );
      await loadUsers();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo guardar."
      );
    } finally {
      setSaving(false);
    }
  }

  async function removeUser(user: ManagedUser) {
    const confirmed = window.confirm(
      `¿Eliminar el usuario ${user.username}? Esta accion no se puede deshacer.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "No se pudo eliminar.");
      }

      setMessage("Usuario eliminado correctamente.");
      await loadUsers();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo eliminar."
      );
    }
  }

  async function resetPassword(password: string) {
    if (modal?.type !== "reset") {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await fetch(
        `/api/admin/users/${modal.user.id}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "No se pudo restablecer la contrasena."
        );
      }

      setModal(null);
      setMessage("Contrasena restablecida correctamente.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo restablecer la contrasena."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Administracion de Usuarios
          </h1>

          <p className="mt-2 text-neutral-400">
            Gestiona accesos, roles, estados y contrasenas del ERP.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setMessage("");
            setModal({ type: "create" });
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white transition hover:bg-yellow-500"
        >
          <UserPlus size={18} />
          Nuevo usuario
        </button>
      </div>

      {(message || error) && (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm ${
            error
              ? "border-red-900/70 bg-red-950/40 text-red-200"
              : "border-emerald-900/70 bg-emerald-950/40 text-emerald-200"
          }`}
        >
          {error || message}
        </div>
      )}

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <div className="grid gap-4 xl:grid-cols-[1fr_180px_180px_180px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Buscar por nombre, usuario o correo..."
              className="w-full rounded-xl border border-neutral-700 bg-black py-3 pl-11 pr-4 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value as UserRole | "ALL");
              setPage(1);
            }}
            className="input-admin"
          >
            <option value="ALL">Todos los roles</option>
            {USER_ROLES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as UserStatus | "ALL");
              setPage(1);
            }}
            className="input-admin"
          >
            <option value="ALL">Todos los estados</option>
            {USER_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={pagination.pageSize}
            disabled
            className="input-admin opacity-70"
          >
            <option>{PAGE_SIZE} por pagina</option>
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-black">
              <tr>
                <SortableHeader
                  label="Nombre"
                  field="name"
                  sortBy={sortBy}
                  direction={sortDirection}
                  onSort={changeSort}
                />
                <SortableHeader
                  label="Usuario"
                  field="username"
                  sortBy={sortBy}
                  direction={sortDirection}
                  onSort={changeSort}
                />
                <SortableHeader
                  label="Correo"
                  field="email"
                  sortBy={sortBy}
                  direction={sortDirection}
                  onSort={changeSort}
                />
                <SortableHeader
                  label="Rol"
                  field="role"
                  sortBy={sortBy}
                  direction={sortDirection}
                  onSort={changeSort}
                />
                <SortableHeader
                  label="Estado"
                  field="status"
                  sortBy={sortBy}
                  direction={sortDirection}
                  onSort={changeSort}
                />
                <th className="p-5 text-left text-yellow-500">
                  Ultimo acceso
                </th>
                <th className="p-5 text-center text-yellow-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-neutral-500"
                  >
                    Cargando usuarios...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-neutral-500"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-neutral-800 transition hover:bg-neutral-800/60"
                  >
                    <td className="p-5">
                      <p className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Creado {formatDate(user.createdAt)}
                      </p>
                    </td>
                    <td className="p-5 text-neutral-300">
                      {user.username}
                    </td>
                    <td className="p-5 text-neutral-300">
                      {user.email}
                    </td>
                    <td className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${roleClass(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-5 text-neutral-300">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setError("");
                            setMessage("");
                            setModal({ type: "edit", user });
                          }}
                          className="rounded-lg border border-neutral-700 p-2 text-neutral-300 transition hover:border-yellow-600 hover:text-yellow-500"
                          aria-label="Editar usuario"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setError("");
                            setMessage("");
                            setModal({ type: "reset", user });
                          }}
                          className="rounded-lg border border-neutral-700 p-2 text-neutral-300 transition hover:border-yellow-600 hover:text-yellow-500"
                          aria-label="Restablecer contrasena"
                        >
                          <KeyRound size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => void removeUser(user)}
                          className="rounded-lg border border-neutral-700 p-2 text-red-300 transition hover:border-red-600 hover:text-red-200"
                          aria-label="Eliminar usuario"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-neutral-800 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-400">
            {pagination.total} usuarios encontrados
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm text-neutral-400">
              Pagina {pagination.page} de {pagination.totalPages}
            </span>

            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(current + 1, pagination.totalPages)
                )
              }
              className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-300 transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>

      {(modal?.type === "create" || modal?.type === "edit") && (
        <UserFormModal
          mode={modal.type}
          user={modal.type === "edit" ? modal.user : null}
          saving={saving}
          error={error}
          onClose={() => setModal(null)}
          onSubmit={submitUser}
        />
      )}

      {modal?.type === "reset" && (
        <ResetPasswordModal
          user={modal.user}
          saving={saving}
          error={error}
          onClose={() => setModal(null)}
          onSubmit={resetPassword}
        />
      )}
    </div>
  );
}

function SortableHeader({
  label,
  field,
  sortBy,
  direction,
  onSort,
}: {
  label: string;
  field: SortField;
  sortBy: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}) {
  const active = sortBy === field;

  return (
    <th className="p-5 text-left text-yellow-500">
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-2 font-bold"
      >
        {label}
        {active &&
          (direction === "asc" ? (
            <ArrowUp size={15} />
          ) : (
            <ArrowDown size={15} />
          ))}
      </button>
    </th>
  );
}
