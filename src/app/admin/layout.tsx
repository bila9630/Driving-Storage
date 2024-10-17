"use client"

import { MainNav } from '@/components/dashboard/main-nav'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { Search } from '@/components/dashboard/search'
import { ModeToggle } from '@/components/dark-mode-toggle'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const handleTeamSwitch = (team: { label: string; value: string }) => {
        if (team.label === "Admin") {
            router.push('/admin/overview')
        } else {
            router.push('/user')
        }
    }

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <TeamSwitcher onTeamSwitch={handleTeamSwitch} />
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
