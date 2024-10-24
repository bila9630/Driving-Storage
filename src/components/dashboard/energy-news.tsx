import { ScrollArea } from "@/components/ui/scroll-area"

interface NewsItem {
    title: string
    timestamp: string
    impact: "positive" | "negative" | "neutral"
    description: string
}

const newsItems: NewsItem[] = [
    {
        title: "Wind Production Surge Expected",
        timestamp: "2 hours ago",
        impact: "negative",
        description: "Forecasted high winds could lead to oversupply and lower prices in the next 24 hours."
    },
    {
        title: "Major Power Plant Maintenance",
        timestamp: "5 hours ago",
        impact: "positive",
        description: "Scheduled maintenance of nuclear plant could increase demand for alternative sources."
    },
    {
        title: "Grid Congestion Alert",
        timestamp: "8 hours ago",
        impact: "positive",
        description: "Southern region experiencing transmission constraints, higher prices expected."
    },
    {
        title: "Solar Generation Peak",
        timestamp: "12 hours ago",
        impact: "negative",
        description: "Record solar output expected during midday, potentially driving prices down."
    },
    {
        title: "Industrial Demand Increase",
        timestamp: "1 day ago",
        impact: "positive",
        description: "Manufacturing sector reports higher than usual power consumption needs."
    },
    {
        title: "EV Fleet Integration Success",
        timestamp: "1 day ago",
        impact: "positive",
        description: "Major logistics company successfully integrates 500 EVs into grid balancing services."
    },
    {
        title: "New Grid Regulation Policy",
        timestamp: "2 days ago",
        impact: "neutral",
        description: "Government announces updated regulations for V2G participation in ancillary services."
    },
    {
        title: "Battery Storage Milestone",
        timestamp: "2 days ago",
        impact: "negative",
        description: "New utility-scale battery storage facility comes online, increasing grid flexibility."
    },
    {
        title: "Peak Demand Warning",
        timestamp: "3 days ago",
        impact: "positive",
        description: "Grid operator forecasts extreme demand due to upcoming heatwave."
    },
    {
        title: "V2G Market Growth",
        timestamp: "3 days ago",
        impact: "neutral",
        description: "Market analysis shows 150% year-over-year growth in V2G participation."
    },
    {
        title: "Renewable Integration Challenge",
        timestamp: "4 days ago",
        impact: "positive",
        description: "Grid operators seeking additional flexibility services due to wind variability."
    },
    {
        title: "Smart Charging Innovation",
        timestamp: "4 days ago",
        impact: "neutral",
        description: "New AI-driven charging algorithm promises 23% better grid integration."
    },
    {
        title: "Cross-Border Energy Trading",
        timestamp: "5 days ago",
        impact: "positive",
        description: "New international agreement enables expanded energy market participation."
    },
    {
        title: "Microgrid Expansion",
        timestamp: "5 days ago",
        impact: "negative",
        description: "Local microgrid project reduces dependency on main grid balancing services."
    },
    {
        title: "Carbon Price Update",
        timestamp: "6 days ago",
        impact: "positive",
        description: "Carbon credit prices reach new high, boosting green energy initiatives."
    }
]

export function EnergyNews() {
    return (
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
                {newsItems.map((item, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{item.title}</h4>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">
                                    {item.timestamp}
                                </span>
                                <div 
                                    className={`h-2 w-2 rounded-full ${
                                        item.impact === "positive" 
                                            ? "bg-green-500" 
                                            : item.impact === "negative" 
                                                ? "bg-red-500" 
                                                : "bg-yellow-500"
                                    }`}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
