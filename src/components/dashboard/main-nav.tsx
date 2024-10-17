'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {[
                { href: "/admin/overview", label: "Overview" },
                { href: "/admin/drivers", label: "Drivers" },
                { href: "/admin/cars", label: "Cars" },
                { href: "/admin/trips", label: "Trips" },
            ].map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
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
