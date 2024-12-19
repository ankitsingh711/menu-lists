"use client";

import { useState } from "react";
import { createMenu } from "../services/menuService";

interface MenuFormProps {
  menuId: string;
}

export default function MenuForm({ menuId }: MenuFormProps) {
  const [name, setName] = useState("");
  const [parentData, setParentData] = useState("");
  const [depth, setDepth] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || depth === "" || !parentData) {
      setError("All fields are required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createMenu({ name, depth, parentData, menuId });
      alert("Menu created successfully");
      setName("");
      setParentData("");
      setDepth("");
    } catch (err) {
      console.error(err);
      setError("Failed to create menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Menu Details</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Menu ID</label>
          <input
            type="text"
            value={menuId}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Depth</label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Parent Data</label>
          <input
            type="text"
            value={parentData}
            onChange={(e) => setParentData(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-full ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
