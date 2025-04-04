"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  ParkingMeterIcon as Parking,
  Ship,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface SidebarProps {
  className?: string
}

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false

  // Initialize openMenus based on current path
  useEffect(() => {
    if (pathname) {
      // Check if the current path is under /arrivage
      if (pathname.startsWith("/arrivage")) {
        setOpenMenus((prev) => ({ ...prev, "/arrivage": true }))
      }
    }
  }, [pathname])

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  // In the mainNavItems array, modify the first two items to make them not clickable
  const mainNavItems: NavItem[] = [
    {
      title: "Tableau de bord",
      href: "#", // Changed from "/dashboard" to "#" to make it not redirect
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Files d'attente",
      href: "#", // Changed from "/queue" to "#" to make it not redirect
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Parking",
      href: "#", // Changed from "/parking" to "#" to make it not redirect
      icon: <Parking className="h-5 w-5" />,
    },
    {
      title: "Gestion d'arrivage",
      href: "/arrivage",
      icon: <Ship className="h-5 w-5" />,
      submenu: [
        { title: "Création d'arrivage", href: "/arrivage/creation" },
        { title: "Liste des arrivages", href: "/arrivage/liste" },
      ],
    },
    {
      title: "Composants",
      href: "#", // Changed from "/components" to "#" to make it not redirect
      icon: <Home className="h-5 w-5" />,
    },
  ]

  // Also modify the renderNavItem function to add a disabled style for the first two items
  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
    const isOpen = openMenus[item.href]
    const isDisabled = item.href === "#"

    // Check if any submenu item is active
    const isSubmenuActive = item.submenu?.some(
      (subitem) => pathname === subitem.href || pathname?.startsWith(subitem.href + "/"),
    )

    if (item.submenu && !collapsed) {
      return (
        <div key={item.href} className="w-full">
          <button
            onClick={() => toggleMenu(item.href)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
              isActive || isSubmenuActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground",
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "transform rotate-180" : "")}
            />
          </button>
          <div className={cn("pl-9 pt-1 overflow-hidden transition-all duration-200", isOpen ? "max-h-40" : "max-h-0")}>
            {item.submenu.map((subitem) => {
              const isSubActive = pathname === subitem.href || pathname?.startsWith(subitem.href + "/")
              return (
                <Link
                  key={subitem.href}
                  href={subitem.href}
                  className={cn(
                    "flex items-center rounded-md py-1.5 pl-3 text-sm font-medium transition-colors hover:text-primary",
                    isSubActive ? "text-primary font-semibold" : "text-sidebar-foreground/80",
                  )}
                >
                  {subitem.title}
                </Link>
              )
            })}
          </div>
        </div>
      )
    }

    if (collapsed && item.submenu) {
      return (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={cn(
              "flex justify-center rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
              isActive || isSubmenuActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground",
            )}
          >
            {item.icon}
          </Link>
          <div className="absolute left-full top-0 ml-2 hidden w-48 rounded-md border bg-popover p-2 group-hover:block">
            <div className="font-medium px-2 py-1.5 text-sm">{item.title}</div>
            <div className="mt-1">
              {item.submenu.map((subitem) => {
                const isSubActive = pathname === subitem.href || pathname?.startsWith(subitem.href + "/")
                return (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                      isSubActive ? "text-primary font-semibold" : "text-popover-foreground",
                    )}
                  >
                    {subitem.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    // For disabled items, render a div instead of a Link
    if (isDisabled) {
      return (
        <div
          key={item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/50 cursor-not-allowed",
            collapsed && "justify-center px-2",
          )}
        >
          {item.icon}
          {!collapsed && <span>{item.title}</span>}
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
          isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground",
          collapsed && "justify-center px-2",
        )}
      >
        {item.icon}
        {!collapsed && <span>{item.title}</span>}
      </Link>
    )
  }

  // For mobile view, render a Sheet component
  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-[250px] bg-sidebar">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Logo collapsed={false} />
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">{mainNavItems.map(renderNavItem)}</nav>
            </div>
            <div className="border-t p-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-primary hover:text-primary-foreground"
              >
                <LogOut className="mr-2 h-5 w-5" />
                <span>Déconnexion</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
        className,
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Logo collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">{mainNavItems.map(renderNavItem)}</nav>
      </div>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-primary hover:text-primary-foreground",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="mr-2 h-5 w-5" />
          {!collapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </div>
  )
}

