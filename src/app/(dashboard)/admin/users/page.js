"use client";
import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Imię i nazwisko" },
    { key: "email", label: "E-mail" },
    { key: "role", label: "Rola" },
    { key: "actions", label: "Akcje" },
  ];

  const data = users.map((user) => ({
    ...user,
    actions: (
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            /* edycja */
          }}
        >
          Edytuj
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            /* usuwanie */
          }}
        >
          Usuń
        </Button>
      </div>
    ),
  }));

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Użytkownicy</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </section>
  );
}
