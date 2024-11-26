"use client"

import { MainNav } from '@/components/dashboard/main-nav'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { Search } from '@/components/dashboard/search'
import { ModeToggle } from '@/components/dark-mode-toggle'
import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function InnerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const userType = pathname.startsWith('/admin') ? 'admin' : 'driver'

    const handleTeamSwitch = (team: { label: string; value: string }) => {
        if (team.value === "admin") {
            router.push('/admin/overview')
        } else {
            router.push('/user/search')
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="flex flex-col">
            <div className="hidden md:flex border-b">
                <div className="flex h-16 items-center px-4 w-full">
                    <TeamSwitcher onTeamSwitch={handleTeamSwitch} />
                    <MainNav className="mx-6" userType={userType} />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        <ModeToggle />
                    </div>
                </div>
            </div>

            <div className="md:hidden border-b">
                <div className="flex h-16 items-center justify-between px-4">
                    <span className="font-semibold">
                        {userType === 'admin' ? 'Admin Portal' : 'Driver Portal'}
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="border-b pb-4">
                        <div className="flex flex-col">
                            <MainNav className="flex flex-col space-y-4 px-4" userType={userType} />
                            <div className="mt-4 pt-4 border-t mx-4">
                                <TeamSwitcher 
                                    onTeamSwitch={handleTeamSwitch} 
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {children}
        </div>
    )
}
