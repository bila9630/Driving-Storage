"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
    { name: "Wind Energy", value: 35, color: "rgb(34 197 94)" },  // updated green color
    { name: "Solar", value: 30, color: "rgb(234 179 8)" },               // yellow-500
    { name: "Hydroelectric", value: 15, color: "rgb(59 130 246)" },       // blue-500
    { name: "Fossil Fuels", value: 20, color: "rgb(239 68 68)" }         // red-500
]

export function SustainabilityOverview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        color: "hsl(var(--foreground))",
                        border: "none",
                    }}
                    itemStyle={{ color: "hsl(var(--foreground))" }}
                    wrapperStyle={{ outline: "none" }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}
