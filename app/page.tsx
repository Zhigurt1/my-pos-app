"use client";

import { useState } from "react";

const INITIAL_TRANSACTIONS = [
  { id: "TRX-001", customer: "Budi Santoso", items: "Kopi Susu x2, Roti Bakar x1", total: 45000, status: "Selesai", date: "10:42 AM" },
  { id: "TRX-002", customer: "Siti Rahma", items: "Es Teh Manis x3", total: 15000, status: "Selesai", date: "10:30 AM" },
  { id: "TRX-003", customer: "Ahmad Dahlan", items: "Nasi Goreng Special x1", total: 28000, status: "Pending", date: "10:15 AM" },
  { id: "TRX-004", customer: "Dewi Lestari", items: "Americano x1, Donat x2", total: 38000, status: "Selesai", date: "09:50 AM" },
  { id: "TRX-005", customer: "Rian Hidayat", items: "Mie Goreng x2", total: 24000, status: "Batal", date: "09:12 AM" },
];

export default function App() {
  // State Autentikasi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // State Dashboard
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("Selesai");

  // Handler Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@kasirpro.com" && password === "admin123") {
      setIsLoggedIn(true);
      setAuthError("");
    } else {
      setAuthError("Email atau Password salah! (Gunakan: admin@kasirpro.com / admin123)");
    }
  };

  // Handler Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  // Handler Tambah Transaksi
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !items || !total) return;

    const newTrx = {
      id: `TRX-00${transactions.length + 1}`,
      customer,
      items,
      total: Number(total),
      status,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTransactions([newTrx, ...transactions]);
    setCustomer("");
    setItems("");
    setTotal("");
    setStatus("Selesai");
    setIsModalOpen(false);
  };

  // TAMPILAN 1: HALAMAN LOGIN (Jika belum login)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-600/40">
              P
            </div>
            <span className="text-2xl font-bold tracking-wide">KasirPro</span>
          </div>

          <h2 className="text-xl font-semibold text-center mb-1">Selamat Datang Kembali</h2>
          <p className="text-slate-400 text-xs text-center mb-6">Masuk untuk mengelola sistem transaksi toko Anda.</p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kasirpro.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-medium py-2.5 rounded-lg text-sm transition shadow-lg shadow-indigo-600/30 mt-2"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">Akun Demo Standar:</p>
            <p className="text-xs font-mono text-indigo-400 mt-1">Email: admin@kasirpro.com | Pass: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN 2: HALAMAN DASHBOARD (Jika sudah login)
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              P
            </div>
            <span className="text-xl font-bold tracking-wide">KasirPro</span>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/20">
              📊 Dashboard
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              📦 Inventaris
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              💳 Transaksi POS
            </button>
            <button className="w-full text-left px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition">
              📈 Laporan
            </button>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-sm">
              AD
            </div>
            <div>
              <p className="text-sm font-medium">Admin Store</p>
              <p className="text-xs text-slate-400">admin@kasirpro.com</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Keluar"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Ringkasan Toko</h1>
            <p className="text-slate-400 text-sm">Selamat datang kembali! Berikut pantauan bisnis hari ini.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-lg shadow-indigo-600/30"
          >
            + Transaksi Baru
          </button>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Penjualan Hari Ini</p>
            <h3 className="text-3xl font-bold text-emerald-400">Rp 2.450.000</h3>
            <span className="text-xs text-emerald-500 mt-2 inline-block font-medium">↑ +12% dari kemarin</span>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Transaksi</p>
            <h3 className="text-3xl font-bold text-indigo-400">{transactions.length} Pesanan</h3>
            <span className="text-xs text-slate-400 mt-2 inline-block">Rata-rata Rp 51.000 / transaksi</span>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <p className="text-slate-400 text-sm font-medium mb-1">Stok Menipis</p>
            <h3 className="text-3xl font-bold text-amber-400">5 Item</h3>
            <span className="text-xs text-amber-500 mt-2 inline-block font-medium">⚠️ Perlu restok segera</span>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Transaksi Terakhir</h2>
            <span className="text-xs text-slate-400">Update otomatis real-time</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">ID Transaksi</th>
                  <th className="py-3 px-4">Pelanggan</th>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-700/30 transition">
                    <td className="py-3.5 px-4 font-mono text-indigo-400 font-medium">{trx.id}</td>
                    <td className="py-3.5 px-4 font-medium">{trx.customer}</td>
                    <td className="py-3.5 px-4 text-slate-300">{trx.items}</td>
                    <td className="py-3.5 px-4 font-semibold">Rp {trx.total.toLocaleString("id-ID")}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          trx.status === "Selesai"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : trx.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {trx.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">{trx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Input Transaksi Baru</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nama Pelanggan</label>
                <input
                  type="text"
                  required
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Contoh: Budi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Detail Item</label>
                <input
                  type="text"
                  required
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  placeholder="Contoh: Kopi Susu x1, Roti x2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Total (Rp)</label>
                <input
                  type="number"
                  required
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Contoh: 35000"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Status Transaksi</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Selesai">Selesai</option>
                  <option value="Pending">Pending</option>
                  <option value="Batal">Batal</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/30"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}