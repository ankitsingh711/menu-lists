"use client";

import { useState } from "react";
import MenuList from "../components/MenuList";
import MenuForm from "../components/MenuForm";

export default function Home() {
  const [selectedMenuId, setSelectedMenuId] = useState("");

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuList onMenuSelect={setSelectedMenuId} />
        <MenuForm menuId={selectedMenuId} />
      </div>
    </div>
  );
}
