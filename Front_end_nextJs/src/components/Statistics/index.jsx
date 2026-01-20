import styles from "./statistics.module.css";

export default function Statistics({
    dateStart,
    timeTotal,
    distanceTotal,
    nbrSessions,
    calBurn,
    nbrDaysRest,
}) {
    return (
        <>
            <div className={styles.containerStats}>
                <div className={styles.stats}>
                    <h1>Vos statistiques</h1>
                    <p className={styles.sinceStart}>depuis le {dateStart}</p>
                </div>
                <div className={`${styles.times} ${styles.infoSport}`}>
                    <p className={styles.contentTitle}>Temps total couru</p>
                    <p className={styles.contentInfo}>
                        <span className={styles.nbrInfo}>
                            {timeTotal.hoursDuration ?? 0}h
                        </span>{" "}
                        {timeTotal.minutesDuration ?? 0}min
                    </p>
                </div>
                <div className={`${styles.distance} ${styles.infoSport}`}>
                    <p className={styles.contentTitle}>
                        Distance totale parcourue
                    </p>
                    <p className={styles.contentInfo}>
                        <span className={styles.nbrInfo}>{distanceTotal}</span>{" "}
                        km
                    </p>
                </div>
                <div className={`${styles.nbrSessions} ${styles.infoSport}`}>
                    <p className={styles.contentTitle}>Nombre de sessions</p>
                    <p className={styles.contentInfo}>
                        <span className={styles.nbrInfo}>{nbrSessions}</span>{" "}
                        sessions
                    </p>
                </div>
                <div className={`${styles.caloriesBurn} ${styles.infoSport}`}>
                    <p className={styles.contentTitle}>Calories brûlées</p>
                    <p className={styles.contentInfo}>
                        <span className={styles.nbrInfo}>{calBurn}</span> cal
                    </p>
                </div>
                <div className={`${styles.nbrDayRest} ${styles.infoSport}`}>
                    <p className={styles.contentTitle}>
                        Nombre de jours de repos
                    </p>
                    <p className={styles.contentInfo}>
                        <span className={styles.nbrInfo}>{nbrDaysRest}</span>{" "}
                        {nbrDaysRest < 2 ? "jour" : "jours"}
                    </p>
                </div>
            </div>
        </>
    );
}
