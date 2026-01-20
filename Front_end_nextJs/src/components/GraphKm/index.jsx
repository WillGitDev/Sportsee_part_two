"use client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function GraphKm({ kmData }) {
    return (
        <div
            style={{
                width: "100%",
                height: 400,
                backgroundColor: "#f9f9fb",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={kmData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#d8c2c2ff"
                    />
                    <XAxis
                        dataKey="weekNumber"
                        tickFormatter={(value) => `S ${value}`}
                    />
                    <YAxis
                        tickFormatter={(value) => `${value} km`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9B9EAC", fontSize: 12 }}
                        domain={[0, "auto"]}
                    />
                    <Bar
                        dataKey="averageKm"
                        fill="#B6BDFC"
                        radius={[10, 10, 10, 10]}
                        barSize={12}
                        name="Km"
                    />
                    <Legend
                        verticalAlign="bottom"
                        align="left"
                        iconType="circle"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
