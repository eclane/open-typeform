import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Plus,
  LogOut,
  ChevronRight,
  FolderOpen,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Home", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Forms", url: "/dashboard/forms", icon: FileText },
  { title: "Results", url: "/dashboard/results", icon: BarChart3 },
  { title: "Workspaces", url: "/dashboard/workspaces", icon: FolderOpen },
];

const bottomNavItems = [
  { title: "Help", url: "/dashboard/help", icon: HelpCircle },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" className="fill-primary" />
            <path d="M8 12H24M12 12V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-foreground">typeform</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Create button */}
        <div className="mb-4 px-2">
          <Button
            onClick={() => navigate("/dashboard/create")}
            className="w-full bg-foreground text-background hover:bg-foreground/90 justify-start"
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Create form</span>}
          </Button>
        </div>

        {/* Main nav */}
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                tooltip={isCollapsed ? item.title : undefined}
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                tooltip={isCollapsed ? item.title : undefined}
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors mt-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 bg-background">
            <SidebarTrigger className="mr-4" />
          </header>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 overflow-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
}
