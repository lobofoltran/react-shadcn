import { routes } from "@/config/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFoundPage from "@/features/not-found/NotFoundPage";
import AuthLayout from "@/layouts/AuthLayout";
import GuestLayout from "@/layouts/GuestLayout";
import RootLayout from "@/layouts/RootLayout";
import React from "react";

export default function AppRoutes() {
  // const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {routes.map((route) => {
            const Page = route.element;

            // if (route.layout === "auth" && !isAuthenticated) {
            //   return (
            //     <Route
            //       key={route.path}
            //       path={route.path}
            //       element={<Navigate to="/login" replace />}
            //     />
            //   );
            // }

            const layoutWrapper = {
              auth: (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>,
              guest: (page: React.ReactNode) => (
                <GuestLayout>{page}</GuestLayout>
              ),
            };

            return (
              <Route
                key={route.path}
                path={route.path}
                element={layoutWrapper[route.layout](<Page />)}
              />
            );
          })}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
