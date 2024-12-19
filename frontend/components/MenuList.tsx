"use client";

import { useEffect, useState } from "react";
import { fetchMenus, deleteMenu } from "../services/menuService";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Menu {
  id: string;
  name: string;
  depth: number;
  children?: Menu[];
}

export default function MenuList({
  onMenuSelect,
}: {
  onMenuSelect: (menuId: string) => void;
}) {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchMenus().then((data) => {
      setMenus(data);
      const initialExpandedState = buildInitialExpandedState(data, false);
      setExpandedMenus(initialExpandedState);
    });
  }, []);

  const buildInitialExpandedState = (menuList: Menu[], expanded: boolean) => {
    const state: { [key: string]: boolean } = {};
    menuList.forEach((menu) => {
      state[menu.id] = expanded;
      if (menu.children && menu.children.length > 0) {
        Object.assign(
          state,
          buildInitialExpandedState(menu.children, expanded)
        );
      }
    });
    return state;
  };

  const handleExpandAll = () =>
    setExpandedMenus(buildInitialExpandedState(menus, true));
  const handleCollapseAll = () =>
    setExpandedMenus(buildInitialExpandedState(menus, false));

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this menu?")) {
      await deleteMenu(id);
      setMenus(menus.filter((menu) => menu.id !== id));
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const menuId = e.target.value;
    onMenuSelect(menuId);
  };

  const renderMenuTree = (menuList: Menu[]) => (
    <ul className="pl-6 border-l-2 border-gray-200">
      {menuList.map((menu) => (
        <li key={menu.id} className="my-2">
          <div className="flex items-center space-x-2">
            {menu.children && menu.children.length > 0 && (
              <button
                onClick={() => toggleMenu(menu.id)}
                className="text-blue-500 font-bold text-sm"
              >
                {expandedMenus[menu.id] ? "-" : "+"}
              </button>
            )}
            <span className="text-gray-800 font-medium">{menu.name}</span>

            <button onClick={() => handleDelete(menu.id)}>
              <TrashIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            </button>
            <button onClick={() => onMenuSelect(menu.id)}>
              <PlusIcon className="w-5 h-5 text-gray-600 hover:text-green-500" />
            </button>
          </div>
          {menu.children &&
            expandedMenus[menu.id] &&
            renderMenuTree(menu.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Menu Lists</h2>

        {/* Dropdown to select menu */}
        <select
          onChange={handleDropdownChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a Menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleExpandAll}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Expand All
        </button>
        <button
          onClick={handleCollapseAll}
          className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
        >
          Collapse All
        </button>
      </div>
      {menus.length > 0 ? (
        renderMenuTree(menus)
      ) : (
        <p className="text-gray-500">No menus available</p>
      )}
    </div>
  );
}
