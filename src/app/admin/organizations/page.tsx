"use client";

import { useEffect, useState, useCallback } from "react";

type Organization = {
  id: number;
  name: string;
  contactName: string | null;
  contactEmail: string | null;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
};

type OrgCode = {
  id: number;
  code: string;
  maxUses: number;
  usesCount: number;
  active: boolean;
};

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [expandedOrgId, setExpandedOrgId] = useState<number | null>(null);
  const [codes, setCodes] = useState<Record<number, OrgCode[]>>({});
  const [maxUsesInput, setMaxUsesInput] = useState<Record<number, string>>({});

  const loadOrgs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/organizations");
    if (res.ok) {
      const data = await res.json();
      setOrgs(data.organizations);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOrgs();
  }, [loadOrgs]);

  async function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contactName, contactEmail }),
    });
    setCreating(false);
    if (res.ok) {
      setName("");
      setContactName("");
      setContactEmail("");
      loadOrgs();
    }
  }

  async function updateStatus(orgId: number, status: Organization["status"]) {
    await fetch(`/api/admin/organizations/${orgId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrgs();
  }

  async function toggleExpand(orgId: number) {
    if (expandedOrgId === orgId) {
      setExpandedOrgId(null);
      return;
    }
    setExpandedOrgId(orgId);
    if (!codes[orgId]) {
      const res = await fetch(`/api/admin/organizations/${orgId}/codes`);
      if (res.ok) {
        const data = await res.json();
        setCodes((prev) => ({ ...prev, [orgId]: data.codes }));
      }
    }
  }

  async function generateCode(orgId: number) {
    const maxUses = Number(maxUsesInput[orgId] || 50);
    const res = await fetch(`/api/admin/organizations/${orgId}/codes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ maxUses }),
    });
    if (res.ok) {
      const res2 = await fetch(`/api/admin/organizations/${orgId}/codes`);
      const data = await res2.json();
      setCodes((prev) => ({ ...prev, [orgId]: data.codes }));
    }
  }

  async function toggleCodeActive(orgId: number, codeId: number, active: boolean) {
    await fetch(`/api/admin/organizations/${orgId}/codes/${codeId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    const res = await fetch(`/api/admin/organizations/${orgId}/codes`);
    if (res.ok) {
      const data = await res.json();
      setCodes((prev) => ({ ...prev, [orgId]: data.codes }));
    }
  }

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Organizations</h1>

      {/* Create org */}
      <form
        onSubmit={handleCreateOrg}
        className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 mb-10 grid md:grid-cols-4 gap-4 items-end shadow-sm"
      >
        <div>
          <label className="block font-heading text-sm font-medium mb-1">
            Org Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
          />
        </div>
        <div>
          <label className="block font-heading text-sm font-medium mb-1">
            Contact Name
          </label>
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
          />
        </div>
        <div>
          <label className="block font-heading text-sm font-medium mb-1">
            Contact Email
          </label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="bg-gold text-charcoal font-heading font-semibold px-6 py-2 rounded-full hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create Org"}
        </button>
      </form>

      {/* Org list */}
      {loading ? (
        <p className="font-body text-charcoal/60">Loading...</p>
      ) : orgs.length === 0 ? (
        <p className="font-body text-charcoal/60">No organizations yet.</p>
      ) : (
        <div className="space-y-4">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-heading font-semibold text-lg">
                    {org.name}
                  </p>
                  <p className="font-body text-sm text-charcoal/60">
                    {org.contactName} {org.contactEmail && `Â· ${org.contactEmail}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-heading text-xs font-semibold px-3 py-1 rounded-full ${
                      org.status === "verified"
                        ? "bg-green-100 text-green-800"
                        : org.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {org.status}
                  </span>

                  {org.status !== "verified" && (
                    <button
                      onClick={() => updateStatus(org.id, "verified")}
                      className="text-xs font-heading font-semibold border border-charcoal px-3 py-1 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {org.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(org.id, "rejected")}
                      className="text-xs font-heading font-semibold border border-charcoal px-3 py-1 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => toggleExpand(org.id)}
                    className="text-xs font-heading font-semibold text-gold"
                  >
                    {expandedOrgId === org.id ? "Hide Codes" : "Manage Codes"}
                  </button>
                </div>
              </div>

              {expandedOrgId === org.id && (
                <div className="mt-6 pt-6 border-t border-charcoal/10">
                  <div className="flex items-end gap-3 mb-4">
                    <div>
                      <label className="block font-heading text-xs font-medium mb-1">
                        Max Uses
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="50"
                        value={maxUsesInput[org.id] || ""}
                        onChange={(e) =>
                          setMaxUsesInput((prev) => ({
                            ...prev,
                            [org.id]: e.target.value,
                          }))
                        }
                        className="w-28 border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream text-sm"
                      />
                    </div>
                    <button
                      onClick={() => generateCode(org.id)}
                      className="bg-gold text-charcoal font-heading font-semibold text-sm px-4 py-2 rounded-full hover:bg-gold-light transition-colors"
                    >
                      Generate Code
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(codes[org.id] || []).map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between bg-cream border border-charcoal/10 rounded-lg px-4 py-3"
                      >
                        <div>
                          <p className="font-heading font-bold tracking-widest">
                            {c.code}
                          </p>
                          <p className="font-body text-xs text-charcoal/60">
                            {c.usesCount} / {c.maxUses} used
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            toggleCodeActive(org.id, c.id, !c.active)
                          }
                          className={`text-xs font-heading font-semibold px-3 py-1 rounded-full ${
                            c.active
                              ? "bg-green-100 text-green-800"
                              : "bg-charcoal/10 text-charcoal/60"
                          }`}
                        >
                          {c.active ? "Active" : "Inactive"}
                        </button>
                      </div>
                    ))}
                    {(codes[org.id] || []).length === 0 && (
                      <p className="font-body text-sm text-charcoal/50">
                        No codes generated yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
