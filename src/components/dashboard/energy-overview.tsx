"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    { name: "00:00", price: 0.12 },
    { name: "01:00", price: 0.11 },
    { name: "02:00", price: 0.10 },
    { name: "03:00", price: 0.09 },
    { name: "04:00", price: 0.08 },
    { name: "05:00", price: 0.10 },
    { name: "06:00", price: 0.15 },
    { name: "07:00", price: 0.19 },
    { name: "08:00", price: 0.22 },
    { name: "09:00", price: 0.20 },
    { name: "10:00", price: 0.18 },
    { name: "11:00", price: 0.17 },
    { name: "12:00", price: 0.16 },
    { name: "13:00", price: 0.17 },
    { name: "14:00", price: 0.19 },
    { name: "15:00", price: 0.21 },
    { name: "16:00", price: 0.23 },
    { name: "17:00", price: 0.24 },
    { name: "18:00", price: 0.25 },
    { name: "19:00", price: 0.23 },
    { name: "20:00", price: 0.20 },
    { name: "21:00", price: 0.17 },
    { name: "22:00", price: 0.15 },
    { name: "23:00", price: 0.13 },
]

const getAction = (price: number) => {
  if (price <= 0.12) return { action: "Charge", color: "text-green-500" };
  if (price >= 0.20) return { action: "Discharge", color: "text-red-500" };
  return { action: "Hold", color: "text-yellow-500" };
};

export function EnergyOverview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `€${value.toFixed(2)}`}
                />
                <Tooltip 
                    formatter={(value: number) => {
                        const { action, color } = getAction(value);
                        return [
                            <span key="tooltip">
                                €{value.toFixed(2)}/kWh · <span className={color}>{action}</span>
                            </span>,
                            "Energy Price"
                        ];
                    }}
                    labelFormatter={(label) => `Time: ${label}`}
                    contentStyle={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
                    wrapperStyle={{ outline: "none" }}
                />
                <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(239 68 68)" /> {/* red-500 */}
                        <stop offset="40%" stopColor="rgb(234 179 8)" /> {/* yellow-500 */}
                        <stop offset="100%" stopColor="rgb(34 197 94)" /> {/* green-500 */}
                    </linearGradient>
                </defs>
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="url(#priceGradient)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
