"use client";
import { useState, useMemo, useEffect } from "react";
import { format, getWeek } from "date-fns";
import { fr } from "date-fns/locale";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./graphWrapperKm.module.css";
import dataByWeeks from "@/utils/dataByWeek";
import splitFourWeeks from "@/utils/splitFourWeeks";
import GraphKm from "@components/GraphKm";

export default function GraphWrapperKm({ kmData }) {
    // On transforme le tableau en semaine segmentées.
    const allWeeks = useMemo(() => {
        return dataByWeeks(kmData, true);
    }, [kmData]);
    const fourWeeksMap = useMemo(() => {
        return allWeeks.map((week) => {
            const activeDays = week.filter((day) => day.km > 0);
            const sum = activeDays.reduce((acc, day) => acc + day.km, 0);
            const average =
                activeDays.length > 0 ? Math.round(sum / activeDays.length) : 0;
            const startDate = week[0].date;
            const endDate = week[week.length - 1].date;
            return {
                start: startDate,
                end: endDate,
                averageKm: average,
                weekNumber: getWeek(new Date(startDate), {
                    weekStartsOn: 1,
                    firstWeekContainsDate: 4,
                }),
            };
        });
    }, [allWeeks]);

    // On le coupe en quatre semaines.
    const fourWeeks = useMemo(() => {
        return splitFourWeeks(fourWeeksMap);
    }, [allWeeks]);

    const [weekOffset, setWeekOffset] = useState(0);

    const currentWeekData = fourWeeks[weekOffset] || [];

    const meanAverageFourWeek = useMemo(() => {
        const activeWeek = currentWeekData.filter((week) => week.averageKm > 0);
        if (activeWeek.length === 0) return 0;

        const sum = activeWeek.reduce((acc, week) => acc + week.averageKm, 0);
        return Math.round(sum / activeWeek.length);
    }, [currentWeekData]);

    const weekLabel = useMemo(() => {
        if (!currentWeekData || currentWeekData.length === 0)
            return `Dates inconnues`;
        const startDate = currentWeekData[0].start;
        const endDate = currentWeekData[currentWeekData.length - 1].end;

        const start = format(startDate, "d MMMM", { locale: fr });
        const end = format(endDate, "d MMMM", { locale: fr });
        return `${start} - ${end}`;
    }, [currentWeekData]);

    const maxOffset = fourWeeks.length - 1;

    return (
        <div className={styles.containerGraph}>
            <div className={styles.headerGraph}>
                <div className={styles.containerTitleNav}>
                    <h2 className={styles.title}>
                        {meanAverageFourWeek} Km en moyenne
                    </h2>
                    <div className={styles.containerNav}>
                        <button
                            className="buttonGraph buttonAnimate"
                            disabled={weekOffset <= 0}
                            onClick={() => setWeekOffset((prev) => prev - 1)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <span className={styles.weekLabel}>{weekLabel}</span>

                        <button
                            className="buttonGraph buttonAnimate"
                            disabled={weekOffset >= maxOffset}
                            onClick={() => setWeekOffset((prev) => prev + 1)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <p>Total des kilomètres 4 dernières semaines</p>
            </div>
            <GraphKm kmData={currentWeekData} />
        </div>
    );
}
