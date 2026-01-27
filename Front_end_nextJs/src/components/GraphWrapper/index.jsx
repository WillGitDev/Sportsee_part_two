"use client";
import { useState, useMemo, useEffect } from "react";
import GraphBpm from "@components/GraphBpm";
import dataByWeek from "@/utils/dataByWeek";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import styles from "./graphWrapper.module.css";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GraphWrapper({ heartRate }) {
    // On transforme l'intégralité du tableau en semaines segmentées
    const allWeeks = useMemo(() => {
        return dataByWeek(heartRate);
    }, [heartRate]);
    const [weekOffset, setWeekOffset] = useState(0);

    const currentWeekData = allWeeks[weekOffset] || [];

    const meanAverageWeek = useMemo(() => {
        const activeDays = currentWeekData.filter(
            (day) => day.heartRateAverage > 0,
        );
        if (activeDays.length === 0) return 0;

        const sum = activeDays.reduce(
            (acc, day) => acc + day.heartRateAverage,
            0,
        );
        return Math.round(sum / activeDays.length);
    }, [currentWeekData]);

    const weekLabel = useMemo(() => {
        if (!currentWeekData) return `Semaine ${weekOffset + 1}`;
        const startDate = new Date(currentWeekData[0].date);
        const endDate = new Date(currentWeekData[6].date);

        const start = format(startDate, "d MMMM", {
            locale: fr,
        });
        const end = format(endDate, "d MMMM", {
            locale: fr,
        });
        return `${start} - ${end}`;
    }, [currentWeekData]);

    const maxOffset = allWeeks.length - 1;

    return (
        <div className={styles.containerGraph}>
            <div className={styles.headerGraph}>
                <div className={styles.containerTitleNav}>
                    <h2 className={styles.title}>{meanAverageWeek} BPM</h2>
                    <div className={styles.containerNav}>
                        <button
                            className="buttonGraph buttonAnimate"
                            disabled={weekOffset <= 0}
                            onClick={() => setWeekOffset((prev) => prev - 1)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <span>{weekLabel}</span>

                        <button
                            className="buttonGraph buttonAnimate"
                            disabled={weekOffset >= maxOffset}
                            onClick={() => setWeekOffset((prev) => prev + 1)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>

                <p>Fréquence cardiaque moyenne</p>
            </div>

            <GraphBpm heartRate={currentWeekData} />
        </div>
    );
}
