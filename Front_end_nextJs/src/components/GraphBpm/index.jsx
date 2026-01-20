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

export default function GraphBpm({ heartRate }) {
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
                    data={heartRate}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#d8c2c2ff"
                    />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9B9EAC" }}
                        tickFormatter={(dateStr) => {
                            const dateObj = new Date(dateStr);
                            // eee donne "lun.", "mar." etc...
                            const dayName = format(dateObj, "eee", {
                                locale: fr,
                            });
                            const cleanName = dayName.replace(".", "");
                            return (
                                cleanName.charAt(0).toUpperCase() +
                                cleanName.slice(1)
                            );
                        }}
                    />

                    <YAxis
                        domain={[
                            (dataMin) => {
                                const calculatedMin = dataMin - 20;
                                return calculatedMin > 0 ? calculatedMin : 0;
                            },
                            (dataMax) => dataMax + 20,
                        ]}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* Barre pour le Minimum (Rose clair) */}
                    <Bar
                        dataKey="heartRateMin"
                        fill="#FFCCCC"
                        radius={[10, 10, 10, 10]}
                        barSize={12}
                    />

                    {/* Barre pour le Maximum (Rouge vif) */}
                    <Bar
                        dataKey="heartRateMax"
                        fill="#FF4500"
                        radius={[10, 10, 10, 10]}
                        barSize={12}
                    />

                    {/* Ligne pour la Moyenne (Fil bleu avec points) */}
                    <Line
                        type="monotone"
                        dataKey="heartRateAverage"
                        stroke="#80a5ddff"
                        strokeWidth={4}
                        dot={{ fill: "#7979e8ff", r: 4 }} // Les points bleus
                        activeDot={{ r: 8 }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="left"
                        iconType="circle"
                        formatter={(value) => {
                            let label = value;
                            if (value === "heartRateMin") label = "Min";
                            else if (value === "heartRateMax")
                                label = "Max BPM";
                            else if (value === "heartRateAverage")
                                label = "Moyenne";
                            return (
                                <span
                                    style={{
                                        color: "#000",
                                        marginRight: "20px",
                                    }}
                                >
                                    {label}
                                </span>
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
