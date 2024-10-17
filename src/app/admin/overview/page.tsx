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
            </Tabs>
        </div>
    )
}
