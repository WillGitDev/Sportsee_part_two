"use client";
import styles from "./dashboard.module.css";
import Image from "next/image";
import GraphWrapper from "@components/GraphWrapper";
import data from "@/data/mockedData";
import GraphWrapperKm from "@components/GraphWrapperKm";
import GraphRunWrapper from "@components/GraphRunWrapper";
import { useContext, useEffect } from "react";
import { userContext } from "@/contexts/UserContext";
import { modalContext } from "@/contexts/ModalContext";

import Loading from "@components/Loading";
import ErrorBox from "@components/ErrorBox";
import HandIcone from "@components/HandIcone";
import Modal from "@components/Modal";

export default function Dashboard() {
    // const userInfo = userInfoMapper(data.apiUserInfo);
    // const activitiesInfo = userActivityMapper(data.apiUserActivity);
    // const heartRate = userHeartRateMapper(data.apiUserActivity);
    // const kmData = userKmMapper(data.apiUserActivity);
    const { userData } = useContext(userContext);
    const { isOpen, setIsOpen } = useContext(modalContext);
    const {
        userInfo,
        userActivity,
        userHeartRate,
        userKm,
        isLoading,
        isError,
    } = userData;

    if (isLoading) {
        return <Loading isLoading={true} />;
    }

    if (isError || !userInfo || !userActivity || !userHeartRate || !userKm) {
        return (
            <ErrorBox
                isError={true}
                text={"Erreur lors de la récupération des données"}
            />
        );
    }

    const activitiesInfo = userActivity;
    const heartRate = userHeartRate;
    const kmData = userKm;

    return (
        <div className={styles.container}>
            <Modal />
            <div className={styles.containerIaLaunch}>
                <p className={styles.textIaLaunch}>
                    <img
                        className={styles.logoIa}
                        src="/icone/icone_ai.svg"
                        alt="icone de trois étoiles"
                    />
                    Posez vos questions sur votre programme, vos performances ou
                    vos objectifs.
                </p>
                <button
                    className={`${styles.buttonIaLaunch} buttonAnimate`}
                    onClick={() => setIsOpen(true)}
                >
                    Lancer une conversation
                </button>
            </div>
            <div className={styles.nameInfo}>
                <div className={styles.containerImg}>
                    <Image
                        className={styles.imgNext}
                        src={userInfo.profilePicture}
                        width={100}
                        height={120}
                        alt="Photo de profil"
                        unoptimized
                    />
                </div>
                <div className={styles.contentName}>
                    <p
                        className={styles.name}
                    >{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                    <p>Membre depuis le {activitiesInfo.startWith}</p>
                </div>
                <div className={styles.containerDistance}>
                    <p className={styles.textDistance}>
                        Distance totale parcourue
                    </p>
                    <div className={styles.nbrDistance}>
                        <HandIcone />
                        <p>{userInfo.totalDistance ?? ""} km</p>
                    </div>
                </div>
            </div>
            <div className={styles.graph}>
                <h2 className={styles.titleGraph}>
                    Vos dernières performances
                </h2>
                <div className={styles.containerGraph}>
                    <GraphWrapperKm kmData={kmData} />
                    <GraphWrapper heartRate={heartRate} />
                </div>
            </div>
            <div className={styles.thisWeekContainer}>
                <GraphRunWrapper userActivity={activitiesInfo} />
            </div>
        </div>
    );
}
