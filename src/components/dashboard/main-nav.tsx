'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    userType: 'admin' | 'driver'
    onNavClick?: () => void
}

export function MainNav({
    className,
    userType,
    onNavClick,
    ...props
}: MainNavProps) {
    const pathname = usePathname()

    const navItems = userType === 'admin'
        ? [
            { href: "/admin/overview", label: "Overview" },
            { href: "/admin/drivers", label: "Drivers" },
            { href: "/admin/cars", label: "Cars" },
            { href: "/admin/trips", label: "Trips" },
        ]
        : [
            { href: "/user/search", label: "Search" },
            { href: "/user/trips", label: "My Trips" },
            { href: "/user/profile", label: "Profile" },
        ]

    return (
        <nav
            className={cn(
                "flex items-center",
                "flex-col md:flex-row w-full md:w-auto",
                "md:space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {navItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    onClick={onNavClick}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        "w-full md:w-auto py-2 md:py-0",
                        pathname === href
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}
