import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}
