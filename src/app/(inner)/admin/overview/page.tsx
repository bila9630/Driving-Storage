import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Button } from "@/components/ui/button";
import { StatsCards } from '@/components/stats-cards';
import { EnergyOverview } from "@/components/dashboard/energy-overview"
import { SustainabilityOverview } from "@/components/dashboard/sustainability-overview"
import { StatsCardsEnergy } from "@/components/dashboard/stats-cards-energy"
import { StatsCardsSustain } from "@/components/dashboard/stats-cards-sustain"
import { EnergyNews } from "@/components/dashboard/energy-news"


export default function AdminOverviewPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>Download Report</Button>
                </div>
            </div>
            <Tabs defaultValue="finance" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="finance">Finance</TabsTrigger>
                    <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                    <TabsTrigger value="energy">Energy</TabsTrigger>
                </TabsList>
                <TabsContent value="finance" className="space-y-4">
                    <StatsCards />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Contributions</CardTitle>
                                <CardDescription>
                                    265 drivers contributed this month.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* SUSTAINABILITY */}
                <TabsContent value="sustainability" className="space-y-4">
                    <StatsCardsSustain />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Energy Sources Distribution</CardTitle>
                                <CardDescription>Fleet energy consumption by source</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <SustainabilityOverview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Green Impact Leaders</CardTitle>
                                <CardDescription>
                                    Top contributors to carbon reduction
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* ENERGY */}
                <TabsContent value="energy" className="space-y-4">
                    <StatsCardsEnergy />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Energy Price Development</CardTitle>
                                <CardDescription>24-hour price trend</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <EnergyOverview />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Energy Market News</CardTitle>
                                <CardDescription>
                                    Latest updates affecting energy prices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EnergyNews />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
