import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Anggota from "./pages/master/Anggota";
import Karyawan from "./pages/master/Karyawan";
import Agen from "./pages/master/Agen";
import Barang from "./pages/master/Barang";
import Kasir from "./pages/Kasir";
import Penjualan from "./pages/laporan/Penjualan";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "/admin/dashboard",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
  {
    path: "/master/anggota",
    element: <MainLayout />,
    children: [
      { index: true, element: <Anggota /> },
    ],
  },
  {
    path: "/master/karyawan",
    element: <MainLayout />,
    children: [
      { index: true, element: <Karyawan /> }
    ]
  },
  {
    path: "/master/agen",
    element: <MainLayout />,
    children: [
      { index: true, element: <Agen /> }
    ]
  },
  {
    path: "/master/barang",
    element: <MainLayout />,
    children: [
      { index: true, element: <Barang /> }
    ]
  },
  {
    path: "/kasir",
    element: <MainLayout />,
    children: [
      { index: true, element: <Kasir /> }
    ]
  },
  {
    path: "/laporan/penjualan",
    element: <MainLayout />,
    children: [
      { index: true, element: <Penjualan /> }
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}