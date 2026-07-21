"use client";

import { useEffect, useState, useCallback } from "react";

type User = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  accessType: "individual" | "org" | null;
  orgName: string | null;
  createdAt: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const loadUsers = useCallback(async (q: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/users?q=${encodeURIComponent(q)}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers("");
  }, [loadUsers]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    loadUsers(query);
  }

  async function toggleAccess(userId: string, hasAccess: boolean) {
    setBusyUserId(userId);
    await fetch(`/api/admin/users/${userId}/access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: hasAccess ? "revoke" : "grant" }),
    });
    await loadUsers(query);
    setBusyUserId(null);
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Users</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="flex-1 border border-charcoal/20 rounded-lg px-4 py-2 font-body bg-cream"
        />
        <button
          type="submit"
          className="bg-charcoal text-cream font-heading font-semibold px-5 py-2 rounded-full hover:bg-charcoal/80 transition-colors"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="font-body text-charcoal/60">Loading...</p>
      ) : users.length === 0 ? (
        <p className="font-body text-charcoal/60">No users found.</p>
      ) : (
        <div className="space-y-3">
          {users.map((u) => {
            const hasAccess = u.accessType === "individual";
            return (
              <div
                key={u.id}
                className="bg-white/60 border border-charcoal/10 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4"
              >
                <div>
                  <p className="font-heading font-semibold">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="font-body text-sm text-charcoal/60">
                    {u.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {u.orgName ? (
                    <span className="font-heading text-xs font-semibold bg-gold/20 text-charcoal px-3 py-1 rounded-full">
                      Org: {u.orgName}
                    </span>
                  ) : u.accessType === "individual" ? (
                    <span className="font-heading text-xs font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Individual Access
                    </span>
                  ) : (
                    <span className="font-heading text-xs font-semibold bg-charcoal/10 text-charcoal/60 px-3 py-1 rounded-full">
                      No Access
                    </span>
                  )}

                  {!u.orgName && (
                    <button
                      onClick={() => toggleAccess(u.id, hasAccess)}
                      disabled={busyUserId === u.id}
                      className="text-xs font-heading font-semibold border border-charcoal px-3 py-1 rounded-full hover:bg-charcoal hover:text-cream transition-colors disabled:opacity-50"
                    >
                      {hasAccess ? "Revoke" : "Grant Access"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}