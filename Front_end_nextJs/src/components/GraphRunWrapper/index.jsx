"use client";
import dataByWeek from "@/utils/dataByWeek";
import data from "@/data/mockedData";
import { format, startOfToday } from "date-fns";
import GraphRun from "@components/GraphRun";
import userKmMapper from "@/services/mappers/userKmMapper";
import styles from "./graphRunWrapper.module.css";
import { parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export default function GraphRunWrapper({ userActivity }) {
    const allWeeks = dataByWeek(userActivity.activities);

    const targetDate = format(startOfToday(), "yyyy-MM-dd");

    const weekFound =
        allWeeks.find((week) => week.some((day) => day.date === targetDate)) ||
        [];

    const hasData = weekFound.length > 0;

    const activity = hasData
        ? weekFound.reduce((acc, element) => {
              return element.isMissing ? acc - 1 : acc;
          }, 7)
        : 0;

    const sumDuration = hasData
        ? weekFound.reduce((acc, element) => {
              return acc + (element.duration || 0);
          }, 0)
        : 0;

    const sumDistance = hasData
        ? weekFound.reduce((acc, element) => {
              return acc + (element.distance || 0);
          }, 0)
        : 0;

    let currentWeek = "Aucune donnée pour cette semaine";
    if (hasData) {
        const firstDay = weekFound[0];
        const lastDay = weekFound[weekFound.length - 1];

        const startDate = format(parseISO(firstDay.date), "dd/MM/yyyy", {
            locale: fr,
        });
        const lastDate = format(parseISO(lastDay.date), "dd/MM/yyyy", {
            locale: fr,
        });
        // La semaine en cours
        currentWeek = `Du ${startDate} au ${lastDate}`;
    }

    return (
        <>
            <p className={styles.thisWeek}>Cette semaine</p>
            <p className={styles.currentWeek}>{currentWeek}</p>
            <div className={styles.containerGraphRun}>
                <div className={styles.containerGraph}>
                    <div className={styles.graphRun}>
                        <div className={styles.header}>
                            <h3 className={styles.h3}>
                                <span className={styles.span}>
                                    x {activity}
                                </span>{" "}
                                sur objectif de 6
                            </h3>
                            <p className={styles.subtitle}>
                                Courses hebdomadaire réalisées
                            </p>
                        </div>
                        <GraphRun completed={activity} />
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.activityTime}>
                        <p className={styles.titleInfo}>Durée d'activité</p>
                        <p className={styles.activityNumber}>
                            {sumDuration}{" "}
                            <span className={styles.minutesTxt}>minutes</span>
                        </p>
                    </div>
                    <div className={styles.distance}>
                        <p className={styles.titleInfo}>Distance</p>
                        <p className={styles.distanceNumber}>
                            {sumDistance}{" "}
                            <span className={styles.kilometerText}>
                                kilomètres
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
