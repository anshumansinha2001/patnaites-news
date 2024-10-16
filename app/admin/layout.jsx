import Sidebar from "@/components/AdminComponents/Sidebar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" position="top-right" />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium text-xl ">Admin Panel</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
