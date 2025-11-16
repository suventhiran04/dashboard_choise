"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Wallet,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Archive,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { motion, Variants } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* -------------------------------------------------
   Data
-------------------------------------------------- */
type RouteBalance = { route: string; balance: number; returned: number };
type Product = {
  code: string;
  name: string;
  type: "Bundle" | "Single";
  category: string;
  stock: number;
  min: number;
  price: string;
  updated: string;
};

const rawRouteData: RouteBalance[] = [
  { route: "R1", balance: 10, returned: 3 },
  { route: "R2", balance: 4, returned: 1 },
  { route: "R3", balance: 18, returned: 5 },
  { route: "R4", balance: 7, returned: 2 },
  { route: "R5", balance: 2, returned: 0 },
];

const rawProducts: Product[] = [
  {
    code: "9600A1",
    name: "කළු 2 සෙට් ලිපි බෑග්",
    type: "Bundle",
    category: "Electronics",
    stock: 8,
    min: 10,
    price: "9,600",
    updated: "Jul 14",
  },
  {
    code: "9600A5",
    name: "කැබින් බෑග්",
    type: "Bundle",
    category: "Furniture",
    stock: 12,
    min: 15,
    price: "9,600",
    updated: "Aug 17",
  },
  {
    code: "9600A11",
    name: "පිපීර ෆයිල් (3)",
    type: "Single",
    category: "Stationery",
    stock: 54,
    min: 20,
    price: "960",
    updated: "Sep 20",
  },
];

/* -------------------------------------------------
   Animations
-------------------------------------------------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 * i, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

/* -------------------------------------------------
   Main Component
-------------------------------------------------- */
export default function InventoryDashboard() {
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("all");

  /* Dropdown menu state */
  const [filterOpen, setFilterOpen] = useState(false);

  /* Modal state */
  const [modalOpen, setModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    code: "",
    name: "",
    type: "Single",
    category: "",
    stock: 0,
    min: 0,
    price: "",
    updated: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  });

  const [products, setProducts] = useState<Product[]>(rawProducts);

  /* Add Product */
  const handleAdd = () => {
    if (
      newProduct.code &&
      newProduct.name &&
      newProduct.category &&
      newProduct.price
    ) {
      setProducts((prev) => [...prev, newProduct as Product]);
      setModalOpen(false);
    }
  };

  /* Filter Data */
  const chartData = useMemo(() => {
    if (filterMode === "all") return rawRouteData;
    if (filterMode === "route") return rawRouteData.slice(0, 3);
    if (filterMode === "customer") return rawRouteData.slice(1);
    if (filterMode === "seeddu") return rawRouteData.slice(2);
    return rawRouteData;
  }, [filterMode]);

  /* Search Table */
  const tableData = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  return (
    <div className="min-h-screen bg-ns-bg dark:bg-ns-bg-dark text-ns-text dark:text-ns-text-dark py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Inventory Dashboard
            </h1>
            <p className="text-ns-text-muted dark:text-ns-text-muted-dark mt-1">
              Real-time stock, routes & sales
            </p>
          </div>

          {/* FILTER DROPDOWN BUTTON */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all shadow-md"
            >
              <Filter size={18} />
              Filter Options
            </button>

            {/* Dropdown Menu */}
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-ns-surface dark:bg-ns-surface-dark border border-ns-border dark:border-ns-border-dark shadow-xl rounded-xl py-2 animate-fadeIn z-50">
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                  onClick={() => setFilterMode("date")}
                >
                  <Calendar size={16} /> Filter by Date
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                  onClick={() => setFilterMode("route")}
                >
                  <MapPin size={16} /> Filter by Route
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                  onClick={() => setFilterMode("customer")}
                >
                  <User size={16} /> Filter by Customer
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-ns-bg dark:hover:bg-ns-border-dark"
                  onClick={() => setFilterMode("seeddu")}
                >
                  <Wallet size={16} /> Filter by Seeddu
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {[
            {
              title: "Total Items",
              value: "14,566",
              icon: Archive,
              bg: "from-blue-500 to-blue-600",
            },
            {
              title: "Inventory Value",
              value: "587.3M",
              unit: "Rs",
              icon: DollarSign,
              bg: "from-emerald-500 to-emerald-600",
            },
            {
              title: "Fast Moving",
              value: "87%",
              icon: TrendingUp,
              bg: "from-green-500 to-green-600",
            },
            {
              title: "Slow Moving",
              value: "13%",
              icon: TrendingDown,
              bg: "from-rose-500 to-rose-600",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i}
              className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl p-6 shadow-sm border border-ns-border dark:border-ns-border-dark"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ns-text-muted dark:text-ns-text-muted-dark">
                    {s.title}
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {s.value}
                    {s.unit && (
                      <span className="text-lg text-ns-text-muted dark:text-ns-text-muted-dark ml-1">
                        {s.unit}
                      </span>
                    )}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${s.bg} text-white`}
                >
                  <s.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Insights Section */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Sales Breakdown */}
          <motion.div
            variants={fadeInUp}
            className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl p-6 shadow-sm border border-ns-border dark:border-ns-border-dark"
          >
            <h3 className="text-sm font-semibold mb-4">Sales Today</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Cash</span>
                <span>Seeddu</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[68%] bg-emerald-500" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-600">68%</span>
                <span className="text-gray-700">32%</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Outcome */}
          <motion.div
            variants={fadeInUp}
            className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl p-6 shadow-sm border border-ns-border dark:border-ns-border-dark"
          >
            <h3 className="text-sm font-semibold mb-4">Delivery Outcome</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Sold</span>
                <span>Returned</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-[88%] bg-sky-500" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-sky-600">88%</span>
                <span className="text-rose-600">12%</span>
              </div>
            </div>
          </motion.div>

          {/* Item Condition */}
          <motion.div
            variants={fadeInUp}
            className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl p-6 shadow-sm border border-ns-border dark:border-ns-border-dark"
          >
            <h3 className="text-sm font-semibold mb-4">Item Condition</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Damaged</span>
                <span>Repaired</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
                <div className="h-full w-[15%] bg-rose-500" />
                <div className="h-full w-[10%] bg-amber-500" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-rose-600">15%</span>
                <span className="text-amber-600">10%</span>
              </div>
              <p className="text-xs text-gray-500">75% Good Condition</p>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            variants={fadeInUp}
            className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl p-6 shadow-sm border border-ns-border dark:border-ns-border-dark"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold">Route Balance</h3>

              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="text-xs bg-ns-bg dark:bg-ns-border-dark border border-ns-border dark:border-ns-border-dark px-2 py-1 rounded-md"
              >
                <option value="all">All</option>
                <option value="route">Route</option>
                <option value="customer">Customer</option>
                <option value="seeddu">Seeddu</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={chartData}>
                <XAxis dataKey="route" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="balance" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        {/* Low Stock */}
        <motion.div
          variants={fadeInUp}
          className="bg-rose-50 dark:bg-red-950 border border-rose-200 dark:border-red-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold mb-3">
            <AlertCircle size={20} />
            <span className="text-sm">Low Stock Alert</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "කළු 2 සෙට් ලිපි බෑග් (8 Left)",
              "නිල් කැබින් බෑග් (12 Left)",
              "වෙඩිසොල් බෑග් (10 Left)",
            ].map((t, i) => (
              <span
                key={i}
                className="bg-rose-100 dark:bg-red-900 text-rose-700 dark:text-red-300 px-3 py-1.5 rounded-full text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* TABLE */}
        <motion.div
          variants={fadeInUp}
          className="bg-ns-surface dark:bg-ns-surface-dark rounded-2xl shadow-sm border border-ns-border dark:border-ns-border-dark overflow-hidden"
        >
          {/* SEARCH BAR */}
          <div className="p-5 border-b border-ns-border dark:border-ns-border-dark">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ns-text-muted dark:text-ns-text-muted-dark"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-ns-bg dark:bg-ns-border-dark rounded-xl text-sm outline-none focus:ring-2 focus:ring-ns-primary transition"
                placeholder="Search items by code, name, category..."
              />
            </div>
          </div>

          {/* TABLE CONTENT */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ns-bg dark:bg-ns-border-dark">
                <tr>
                  {[
                    "Code",
                    "Name",
                    "Type",
                    "Category",
                    "Stock",
                    "Status",
                    "Price",
                    "Updated",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-ns-text-muted dark:text-ns-text-muted-dark font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-ns-border dark:divide-ns-border-dark">
                {tableData.map((p, i) => {
                  const low = p.stock < p.min;

                  return (
                    <tr
                      key={i}
                      className="hover:bg-ns-bg dark:hover:bg-ns-border-dark transition"
                    >
                      <td className="px-5 py-4 font-medium">{p.code}</td>
                      <td className="px-5 py-4">{p.name}</td>

                      <td className="px-5 py-4">
                        <span className="px-2 py-1 bg-ns-bg dark:bg-ns-border-dark text-xs rounded-md">
                          {p.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">{p.category}</td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            low ? "text-rose-600 dark:text-rose-400" : ""
                          }
                        >
                          {p.stock} (Min: {p.min})
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs ${
                            low
                              ? "bg-rose-100 dark:bg-red-900 text-rose-700 dark:text-red-300"
                              : "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          {low ? "Low Stock" : "In Stock"}
                        </span>
                      </td>

                      <td className="px-5 py-4">Rs {p.price}</td>

                      <td className="px-5 py-4 text-ns-text-muted dark:text-ns-text-muted-dark">
                        {p.updated}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Eye
                            className="cursor-pointer hover:text-ns-primary"
                            size={18}
                          />
                          <Pencil
                            className="text-blue-600 cursor-pointer hover:text-blue-700"
                            size={18}
                          />
                          <Trash2
                            className="text-rose-600 cursor-pointer hover:text-rose-700"
                            size={18}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
