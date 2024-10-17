import { MainNav } from '@/components/dashboard/main-nav'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { Search } from '@/components/dashboard/search'
import { ModeToggle } from '@/components/dark-mode-toggle'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <TeamSwitcher />
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        {/* <UserNav /> */}
                        <ModeToggle />
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}
