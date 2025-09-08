// 공통 타입들 — 화면은 이 타입만 의존하도록 구성

// 프로필

export type User = {
		id: string;
		name: string;
		team?: string;
		avatarUrl?: string;
		statusMessage?: string;
};

// 출근 요약
export type AttendanceSummary = {
		presentDays: number; // 이번 달 출근 일수
		totalDays: number; // 이번 달 총 근무일(영업일) 수
		percent?: number; // 출근율(0~100). 서버가 내려주지 않으면 프론트에서 계산
};

// 잔여연차 요약 카드
export type LeaveSummary = {
		total: number;      // 총 연차
		used: number;       // 사용 연차
		remaining: number;  // 잔여 연차
};

// 결제문서 리스트
export type ApprovalItem = {
		id: string;
		title: string;
		status: "대기" | "진행" | "완료";
		createdAt: string; // ISO string
};

// 근무 현황
export type WorkStatusItem = {
		id: string;
		name: string;
		role?: string;
		note?: string;
		isOnline?: boolean;
};

export type Fortune = {
		score: number;
		message: string;
}