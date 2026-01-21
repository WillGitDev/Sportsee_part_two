"use client";

import { createContext, useState, useEffect } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import useUserActivity from "@/hooks/useUserActivity";
import { getToken } from "@/cookies/auth";
import userInfoMapper from "@/services/mappers/userInfoMapper";
import userActivityMapper from "@/services/mappers/userActivityMapper";
import userHeartRateMapper from "@/services/mappers/userHeartRateMapper";
import userKmMapper from "@/services/mappers/userKmMapper";
export const userContext = createContext(null);

export default function UserProvider({ children }) {
    const [token, setToken] = useState(getToken());
    const startWeek = "2025-01-30";
    const endWeek = "2025-12-31";
    const urlUserInfo = "/api/user-info";
    const urlUserActivity = "/api/user-activity";

    const {
        dataUserInfo,
        isLoading: loadInfo,
        isError: errorInfo,
    } = useUserInfo(urlUserInfo, token);
    const {
        dataUserActivity,
        isLoading: loadActivity,
        isError: errorActivity,
    } = useUserActivity(urlUserActivity, token, startWeek, endWeek);

    const [userData, setUserData] = useState({
        userInfo: null,
        userActivity: null,
        userHeartRate: null,
        userKm: null,
        isLoading: true,
        isError: false,
    });
    console.log(`Le token : ${token}`);

    useEffect(() => {
        if (!loadInfo && !loadActivity) {
            setUserData({
                userInfo: dataUserInfo ? userInfoMapper(dataUserInfo) : null,
                userActivity: dataUserActivity
                    ? userActivityMapper(dataUserActivity)
                    : null,
                userHeartRate: dataUserActivity
                    ? userHeartRateMapper(dataUserActivity)
                    : null,
                userKm: dataUserActivity
                    ? userKmMapper(dataUserActivity)
                    : null,
                isLoading: false,
                isError: errorInfo || errorActivity,
            });
        }
    }, [
        dataUserInfo,
        dataUserActivity,
        loadInfo,
        loadActivity,
        errorInfo,
        errorActivity,
    ]);

    return (
        <userContext.Provider value={{ userData, setToken }}>
            {children}
        </userContext.Provider>
    );
}
