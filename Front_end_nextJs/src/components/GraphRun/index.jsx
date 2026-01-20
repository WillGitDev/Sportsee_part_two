"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function GraphRun({ completed = 4 }) {
    const total = 7;
    const remaining = Math.max(0, total - completed);
    const data = [
        {
            name: "restants",
            value: remaining,
            color: "#B5C0FF",
            offSetX: 10,
            offSetY: 0,
        },
        {
            name: "réalisées",
            value: completed,
            color: "#0026FF",
            offSetX: -60,
            offSetY: 5,
        },
    ];

    const customLabel = (props) => {
        const { x, y, payload } = props;

        // Le gap pour l'écart entre le texte et le point
        const gap = 12;

        return (
            <g>
                {/* 1. Le petit cercle de couleur (Point de départ) */}
                <circle
                    cx={x + payload.offSetX}
                    cy={y + payload.offSetY}
                    r={5}
                    fill={payload.color}
                />

                <text
                    x={x + gap + payload.offSetX}
                    y={y + payload.offSetY}
                    fill="#666"
                    textAnchor="start"
                    dominantBaseline="middle"
                    style={{
                        fontSize: "12px",
                        fontFamily: "sans-serif",
                        color: "#707070",
                    }}
                >
                    {`${payload.value} ${payload.name}`}
                </text>
            </g>
        );
    };

    return (
        <div
            style={{
                width: "100%",
                height: 300,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        //cx="50%" // Position centrale X
                        //cy="50%" // Position centrale Y
                        innerRadius={50} // Rayon intérieur (crée le trou)
                        outerRadius={100} // Rayon extérieur
                        paddingAngle={0} // Espace entre les segments
                        dataKey="value"
                        label={customLabel}
                        startAngle={290} // Rotation pour commencer en haut
                        endAngle={360 + 290}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    ></text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
