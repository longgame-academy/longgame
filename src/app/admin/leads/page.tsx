"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: number;
  email: string;
  firstName: string | null;
  source: string;
  tag: string;
  delivered: boolean;
  createdAt: string;
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">Free Guide Leads</h1>
        <a
          href="/api/admin/leads/export"
          className="bg-gold text-charcoal font-heading font-semibold px-5 py-2 rounded-full hover:bg-gold-light transition-colors text-sm"
        >
          Export CSV
        </a>
      </div>

      {loading ? (
        <p className="font-body text-charcoal/60">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="font-body text-charcoal/60">No leads yet.</p>
      ) : (
        <div className="bg-white/60 border border-charcoal/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-charcoal/5">
              <tr>
                <th className="font-heading text-xs uppercase tracking-wide px-5 py-3">
                  Name
                </th>
                <th className="font-heading text-xs uppercase tracking-wide px-5 py-3">
                  Email
                </th>
                <th className="font-heading text-xs uppercase tracking-wide px-5 py-3">
                  Tag
                </th>
                <th className="font-heading text-xs uppercase tracking-wide px-5 py-3">
                  Delivered
                </th>
                <th className="font-heading text-xs uppercase tracking-wide px-5 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-charcoal/10">
                  <td className="font-body text-sm px-5 py-3">
                    {lead.firstName || "—"}
                  </td>
                  <td className="font-body text-sm px-5 py-3">{lead.email}</td>
                  <td className="font-body text-sm px-5 py-3">{lead.tag}</td>
                  <td className="font-body text-sm px-5 py-3">
                    {lead.delivered ? "Yes" : "No"}
                  </td>
                  <td className="font-body text-sm px-5 py-3 text-charcoal/60">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}