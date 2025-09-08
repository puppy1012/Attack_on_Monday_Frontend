/**
 * 화면에서 실제로 호출하는 “서비스 함수” 모음.
 * - 컴포넌트는 여기만 호출 => 교체/목킹 쉬움
 * - 에러 시 안전한 목데이터로 폴백 (개발 초기 편의)
 * - 나중에 실제 API 경로만 바꾸면 그대로 동작
 */
import { api } from "./apiClient";
import type {
		User,
		AttendanceSummary,
		LeaveSummary,
		ApprovalItem,
		WorkStatusItem,
		Fortune,
} from "./types";

// ------------------- 실 API -------------------

export async function fetchCurrentUser(): Promise<User> {
		try {
				const { data } = await api.get<User>("/me");
				return data;
		} catch (e) {
				console.warn("[fetchCurrentUser] fallback mock:", e);
				return MOCK_USER;
		}
}

export async function fetchAttendanceSummary(): Promise<AttendanceSummary> {
		try {
				const { data } = await api.get<AttendanceSummary>("/attendance/summary");
				return withPercent(data);
		} catch (e) {
				console.warn("[fetchAttendanceSummary] fallback mock:", e);
				return withPercent(MOCK_ATT);
		}
}

export async function fetchLeaveSummary(): Promise<LeaveSummary> {
		try {
				const { data } = await api.get<LeaveSummary>("/leave/summary");
				return data;
		} catch (e) {
				console.warn("[fetchLeaveSummary] fallback mock:", e);
				return MOCK_LEAVE;
		}
}

export async function fetchApprovals(limit = 3): Promise<ApprovalItem[]> {
		try {
				const { data } = await api.get<ApprovalItem[]>("/approvals", {
						params: { limit },
				});
				return data;
		} catch (e) {
				console.warn("[fetchApprovals] fallback mock:", e);
				return MOCK_APPROVALS.slice(0, limit);
		}
}

export async function fetchWorkStatuses(): Promise<WorkStatusItem[]> {
		try {
				const { data } = await api.get<WorkStatusItem[]>("/work-status");
				return data;
		} catch (e) {
				console.warn("[fetchWorkStatuses] fallback mock:", e);
				return MOCK_WORK_STATUS;
		}
}

export async function fetchFortune(): Promise<Fortune> {
		try {
				const { data } = await api.get<Fortune>("/fortune/today");
				return data;
		} catch (e) {
				console.warn("[fetchFortune] fallback mock:", e);
				return MOCK_FORTUNE;
		}
}

// ------------------- 유틸/목 -------------------

function withPercent(a: AttendanceSummary): AttendanceSummary {
		const percent =
				a.totalDays > 0 ? Math.round((a.presentDays / a.totalDays) * 100) : 0;
		return { ...a, percent };
}

// 👇 초기 개발 편의를 위한 목 데이터 (백 나올 때 삭제/주석)
const MOCK_USER: User = {
		id: "u-1",
		name: "배진아님",
		team: "프론트엔드팀",
		avatarUrl:
				"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&auto=format&fit=crop&q=60",
		statusMessage: "집중 해야합니다... 방해금지❌",
};

const MOCK_ATT: AttendanceSummary = { presentDays: 18, totalDays: 20 };

const MOCK_LEAVE: LeaveSummary = { total: 15, used: 9, remaining: 6 };

const MOCK_APPROVALS: ApprovalItem[] = [
		{ id: "ap-1", title: "2025.08.30 연차 신청 건", status: "완료", createdAt: "2025-08-30" },
		{ id: "ap-2", title: "재직증명서 발급 건", status: "대기", createdAt: "2025-08-29" },
		{ id: "ap-3", title: "급여명세서 발급 건", status: "완료", createdAt: "2025-08-28" },
];

const MOCK_WORK_STATUS: WorkStatusItem[] = [
		{ id: "w1", name: "김정민", role: "팀장", note: "오늘 하루 화이팅", isOnline: true },
		{ id: "w2", name: "박태준", role: "과장", note: "출근...퇴근하고 싶다", isOnline: true },
		{ id: "w3", name: "이승현", role: "대리", note: "신조오 사사게요", isOnline: false },
		{ id: "w4", name: "전지연", role: "대리", note: "월급 날~", isOnline: true },
];

const MOCK_FORTUNE: Fortune = {
		score: 92,
		message: "소신껏 일하면 큰 행운이!",
};
