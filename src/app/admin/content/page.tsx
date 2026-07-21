"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

type ContentItem = {
  id: number;
  type: "module" | "field_guide" | "tool";
  title: string;
  body: string | null;
  assetRef: string | null;
  visibility: "individual" | "org" | "both" | "neither";
  downloadable: boolean;
  order: number;
};

const typeLabels: Record<ContentItem["type"], string> = {
  module: "Module",
  field_guide: "Field Guide",
  tool: "Tool",
};

export default function AdminContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<ContentItem["type"]>("module");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [assetRef, setAssetRef] = useState("");
  const [visibility, setVisibility] = useState<ContentItem["visibility"]>("both");
  const [downloadable, setDownloadable] = useState(false);
  const [order, setOrder] = useState("0");
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<ContentItem["type"] | "all">("all");

  const loadItems = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    if (res.ok) {
      const data = await res.json();
      setItems(data.content);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/content/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      setAssetRef(data.url);
    }
  }
  
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        title,
        body,
        assetRef,
        visibility,
        downloadable,
        order: Number(order) || 0,
      }),
    });
    setCreating(false);
    if (res.ok) {
      setTitle("");
      setBody("");
      setAssetRef("");
      setDownloadable(false);
      setOrder("0");
      loadItems();
    }
  }

  async function updateVisibility(id: number, visibility: ContentItem["visibility"]) {
    await fetch(`/api/admin/content/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visibility }),
    });
    loadItems();
  }

  async function toggleDownloadable(id: number, downloadable: boolean) {
    await fetch(`/api/admin/content/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ downloadable }),
    });
    loadItems();
  }

  async function deleteItem(id: number) {
    await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    loadItems();
  }

  const filteredItems = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Content</h1>

      <form
        onSubmit={handleCreate}
        className="bg-cream/60 border border-charcoal/10 rounded-2xl p-6 mb-10 space-y-4 shadow-sm"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block font-heading text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ContentItem["type"])}
              className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
            >
              <option value="module">Module</option>
              <option value="field_guide">Field Guide</option>
              <option value="tool">Tool</option>
            </select>
          </div>
          <div>
            <label className="block font-heading text-sm font-medium mb-1">Visibility</label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as ContentItem["visibility"])}
              className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
            >
              <option value="both">Both</option>
              <option value="individual">Individual Only</option>
              <option value="org">Org Only</option>
              <option value="neither">Neither (Hidden)</option>
            </select>
          </div>
          <div>
            <label className="block font-heading text-sm font-medium mb-1">Order</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
            />
          </div>
        </div>

        <div>
          <label className="block font-heading text-sm font-medium mb-1">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
          />
        </div>

        <div>
          <label className="block font-heading text-sm font-medium mb-1">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream"
          />
        </div>

        {type === "tool" && (
          <div className="grid md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block font-heading text-sm font-medium mb-1">
                File
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full border border-charcoal/20 rounded-lg px-3 py-2 font-body bg-cream text-sm"
              />
              {uploading && (
                <p className="font-body text-xs text-charcoal/50 mt-1">Uploading...</p>
              )}
              {assetRef && !uploading && (
                <p className="font-body text-xs text-green-700 mt-1">File attached</p>
              )}
            </div>
            <label className="flex items-center gap-2 pb-2">
              <input
                type="checkbox"
                checked={downloadable}
                onChange={(e) => setDownloadable(e.target.checked)}
              />
              <span className="font-body text-sm">Downloadable</span>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={creating}
          className="bg-gold text-charcoal font-heading font-semibold px-6 py-2 rounded-full hover:bg-gold-light transition-colors disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create Content"}
        </button>
      </form>

      <div className="flex gap-2 mb-6">
        {(["all", "module", "field_guide", "tool"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-heading font-semibold px-4 py-2 rounded-full transition-colors ${
              filter === f
                ? "bg-charcoal text-cream"
                : "bg-cream/60 text-charcoal border border-charcoal/10"
            }`}
          >
            {f === "all" ? "All" : typeLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="font-body text-charcoal/60">Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p className="font-body text-charcoal/60">No content yet.</p>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-cream/60 border border-charcoal/10 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 shadow-sm"
            >
              <div>
                <span className="font-heading text-xs text-gold uppercase tracking-wide">
                  {typeLabels[item.type]}
                </span>
                <p className="font-heading font-semibold">{item.title}</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={item.visibility}
                  onChange={(e) =>
                    updateVisibility(item.id, e.target.value as ContentItem["visibility"])
                  }
                  className="text-xs font-heading border border-charcoal/20 rounded-full px-3 py-1 bg-cream"
                >
                  <option value="both">Both</option>
                  <option value="individual">Individual</option>
                  <option value="org">Org</option>
                  <option value="neither">Hidden</option>
                </select>

                {item.type === "tool" && (
                  <button
                    onClick={() => toggleDownloadable(item.id, !item.downloadable)}
                    className={`text-xs font-heading font-semibold px-3 py-1 rounded-full ${
                      item.downloadable
                        ? "bg-green-100 text-green-800"
                        : "bg-charcoal/10 text-charcoal/60"
                    }`}
                  >
                    {item.downloadable ? "Downloadable" : "View Only"}
                  </button>
                )}

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-xs font-heading font-semibold text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
