import {useEffect, useMemo, useState} from "react";
import ProfileCard from "../components/dashbord/ProfileCard";
import WorkTimerCard from "../components/dashbord/WorkTimerCard";
import LeaveCard from "../components/dashbord/LeaveCard";

import type {UserProfile, MonthSummary} from "../utils/profile.service";
import * as profileService from "../utils/profile.service";

import {useWorkTimer} from "../hooks/useWorkTimer";

export default function DashboardPreview() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [month, setMonth] = useState<MonthSummary | null>(null);

    const {
        view, isWorking, isPaused,
        clockIn, clockOut, togglePause,
        leftChipText, rightChipText,
    } = useWorkTimer();

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const getUser = profileService.getUserProfile;
                const [u, m] = await Promise.all([
                    getUser() as Promise<UserProfile>,
                    profileService.getMonthSummary() as Promise<MonthSummary>,
                ]);
                if (!alive) return;
                setUser(u);
                setMonth(m);
            } catch (e) {
                console.error("load dashboard data failed:", e);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const attendanceForCard = useMemo(() => {
        if (!month) return undefined;
        const {presentDays, totalDays} = month;
        const percent = totalDays ? Math.round((presentDays / totalDays) * 100) : 0;
        return {presentDays, totalDays, percent};
    }, [month]);

    return (
        <div className="p-6">
            {/* 1행 */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
                {/* 프로필 카드 */}
                <div className="col-span-12 lg:col-span-7">
                    <ProfileCard className="h-full" user={user ?? undefined} attendance={attendanceForCard}/>
                </div>

                {/* 근태 타이머 카드 */}
                <div className="col-span-6 lg:col-span-3">
                    <WorkTimerCard
                        timeText={view.timeText}
                        dateText={view.dateText}
                        percent={view.percent}
                        leftChipText={leftChipText}
                        rightChipText={rightChipText}
                        isWorking={isWorking}
                        isPaused={isPaused}
                        onTogglePause={togglePause}
                        onLeftAction={clockIn}
                        onRightAction={clockOut}
                        className="h-full"
                    />
                </div>

                {/* 오늘의 운세 */}
                <div className="col-span-6 lg:col-span-2">
                    <div
                        className="h-full min-h-[300px] rounded-[30px] bg-gradient-to-br from-indigo-600 to-blue-500 text-white p-6 shadow-[1px_1px_20px_rgba(112,124,154,0.10)]">
                        <p className="text-xs mb-1">오늘의 운세</p>
                        <p className="text-4xl font-bold">92</p>
                        <p className="mt-2 text-xs opacity-90 leading-tight">소신껏 일하면 큰 행운이!</p>
                    </div>
                </div>
            </div>
            {/* 2행 */}
            {/* 휴가 카드 */}
            <div className="col-span-12 lg:col-span-6">
                <LeaveCard/>
            </div>
        </div>
    );
}
