import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ChargingSession {
    id: string
    location: string
    timestamp: string
    duration: string
    consumption: string
    energySource: {
        type: "Sustainable" | "Non-sustainable"
        percentage: number
    }
    carbonSaved: string
    chargeType: "V2G" | "Smart Charging" | "Fast Charging"
    efficiency: number
}

const chargingSessions: ChargingSession[] = [
    {
        id: "CS001",
        location: "Amsterdam Central Hub",
        timestamp: "Today, 14:30",
        duration: "2h 15min",
        consumption: "45.5 kWh",
        energySource: {
            type: "Non-sustainable",
            percentage: 65
        },
        carbonSaved: "0 kg",
        chargeType: "V2G",
        efficiency: 94
    },
    {
        id: "CS002",
        location: "Rotterdam Port Station",
        timestamp: "Today, 13:15",
        duration: "1h 45min",
        consumption: "38.2 kWh",
        energySource: {
            type: "Sustainable",
            percentage: 75
        },
        carbonSaved: "28.6 kg",
        chargeType: "Smart Charging",
        efficiency: 92
    },
    {
        id: "CS003",
        location: "Utrecht City Center",
        timestamp: "Today, 11:45",
        duration: "3h 00min",
        consumption: "62.8 kWh",
        energySource: {
            type: "Non-sustainable",
            percentage: 55
        },
        carbonSaved: "0 kg",
        chargeType: "V2G",
        efficiency: 96
    },
    {
        id: "CS004",
        location: "Eindhoven Tech Hub",
        timestamp: "Today, 10:30",
        duration: "1h 30min",
        consumption: "32.4 kWh",
        energySource: {
            type: "Sustainable",
            percentage: 95
        },
        carbonSaved: "24.8 kg",
        chargeType: "Fast Charging",
        efficiency: 88
    },
    {
        id: "CS005",
        location: "The Hague Central",
        timestamp: "Today, 09:15",
        duration: "2h 45min",
        consumption: "52.6 kWh",
        energySource: {
            type: "Non-sustainable",
            percentage: 70
        },
        carbonSaved: "0 kg",
        chargeType: "V2G",
        efficiency: 93
    }
]

const getEnergySourceColor = (type: string) => {
    switch (type) {
        case "Sustainable": return "rgb(34 197 94)"
        case "Non-sustainable": return "rgb(239 68 68)"
        default: return "gray"
    }
}

const getChargeTypeBadgeVariant = (type: string): "default" | "secondary" | "destructive" => {
    switch (type) {
        case "V2G": return "default"
        case "Smart Charging": return "secondary"
        case "Fast Charging": return "destructive"
        default: return "default"
    }
}

export function LatestCharges() {
    return (
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
                {chargingSessions.map((session) => (
                    <div key={session.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{session.location}</h4>
                            <Badge variant={getChargeTypeBadgeVariant(session.chargeType)}>
                                {session.chargeType}
                            </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Time:</div>
                            <div>{session.timestamp}</div>
                            <div className="text-muted-foreground">Duration:</div>
                            <div>{session.duration}</div>
                            <div className="text-muted-foreground">Consumption:</div>
                            <div>{session.consumption}</div>
                            <div className="text-muted-foreground">Energy Source:</div>
                            <div className="flex items-center gap-2">
                                <div 
                                    className="h-2 w-2 rounded-full" 
                                    style={{ backgroundColor: getEnergySourceColor(session.energySource.type) }}
                                />
                                {session.energySource.type} ({session.energySource.percentage}%)
                            </div>
                            <div className="text-muted-foreground">Carbon Saved:</div>
                            <div className={session.energySource.type === "Sustainable" ? "text-green-600" : "text-red-600"}>
                                {session.carbonSaved}
                            </div>
                            <div className="text-muted-foreground">Efficiency:</div>
                            <div>{session.efficiency}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
