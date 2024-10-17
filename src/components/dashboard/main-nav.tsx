import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href="/admin/overview"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </Link>
            <Link
                href="/admin/drivers"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Drivers
            </Link>
            <Link
                href="/admin/cars"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Cars
            </Link>
            <Link
                href="/admin/trips"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Trips
            </Link>
        </nav>
    )
}