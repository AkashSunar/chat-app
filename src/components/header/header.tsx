"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, BotMessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileUserDashboard } from "../profile/profile";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function MainHeader({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Route checks
  const isAdminDashboard = pathname?.startsWith("/admin");
  const isWorkspaceDashboard = pathname?.startsWith("/dashboard/");
  const isInvitation = pathname === "/dashboard/invitations";

  return (
    <header className="bg-white border-b border-gray-200 p-3.5 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Logo, Hamburger menu, and Workspace Image */}
        <div className="flex items-center">
          {/* Logo and title - visible on mobile dashboard and always in admin dashboard, hidden on desktop dashboard */}
          <Link href={"/dashboard"}>
            <div
              className={cn(
                "flex items-center space-x-2",
                !isAdminDashboard &&
                  isWorkspaceDashboard &&
                  !isInvitation &&
                  "lg:hidden",
              )}
            >
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <BotMessageSquare size={16} color="white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">ConvoX</h1>
            </div>
          </Link>

          {/* Hamburger menu - visible on mobile */}
          {onMenuClick && isWorkspaceDashboard && (
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-3">
          <ProfileUserDashboard />
        </div>
      </div>
    </header>
  );
}
