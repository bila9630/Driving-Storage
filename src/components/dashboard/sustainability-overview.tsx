"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
    { name: "Sustainable", value: 80, color: "rgb(34 197 94)" },  // green
    { name: "Non-sustainable", value: 20, color: "rgb(239 68 68)" }  // red
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
