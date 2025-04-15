import { Home, LayoutDashboard, Map, ShieldUser, Users } from "lucide-react"

import LoginPage from "@/features/auth/LoginPage"
import DashboardPage from "@/features/dashboard/DashboardPage"
import HomePage from "@/features/home/HomePage"
import LeaftletPage from "@/features/leaflet/LeaftletPage"
import UsersPage from "@/features/users/UsersPage"

export type AppRoute = {
  title: string
  path: string
  icon?: React.ElementType
  layout: "guest" | "auth"
  element: React.ElementType
  showInSidebar?: boolean
}

export const routes: AppRoute[] = [
  {
    title: "Home",
    path: "/",
    icon: Home,
    layout: "auth",
    element: HomePage,
    showInSidebar: true,
  },
  {
    title: "Login",
    path: "/login",
    icon: ShieldUser,
    layout: "guest",
    element: LoginPage,
    showInSidebar: false,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    layout: "auth",
    element: DashboardPage,
    showInSidebar: true,
  },
  {
    title: "Usuários",
    path: "/users",
    icon: Users,
    layout: "auth",
    element: UsersPage,
    showInSidebar: true,
  },
  {
    title: "Leaftlet",
    path: "/leaflet",
    icon: Map,
    layout: "auth",
    element: LeaftletPage,
    showInSidebar: true,
  }
];
