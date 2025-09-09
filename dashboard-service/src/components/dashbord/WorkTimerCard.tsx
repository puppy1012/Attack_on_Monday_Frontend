import React from "react";
import Card from "./Card";

// SVGR(default import) — 색/선두께 제어 가능
import MonitorIcon from "../../assets/Icons/monitor.svg";
import StartIcon   from "../../assets/Icons/출근 아이콘.svg";
import StopIcon    from "../../assets/Icons/퇴근 아이콘.svg";
import PauseIcon   from "../../assets/Icons/스탑 버튼.svg";

type Props = {
		timeText: string;        // 중앙 누적 근무시간 텍스트 (예: 06:54)
		dateText: string;        // 하단 날짜 (예: 2025.09.06(토))
		percent: number;         // 0~100 (8시간 기준 진행률)
		leftChipText?: string;   // 출근 칩에 표기 (예: "08:50" 또는 "출근")
		rightChipText?: string;  // 퇴근 칩에 표기 (예: "17:42" 또는 "퇴근")
		isWorking?: boolean;     // 출근 상태
		isPaused?: boolean;      // 외출(일시정지) 상태
		onTogglePause?: () => void; // 외출/복귀 토글 (퇴근 아님!)
		onLeftAction?: () => void;  // 출근
		onRightAction?: () => void; // 퇴근
		className?: string;
};

export default function WorkTimerCard({
																					timeText,
																					dateText,
																					percent,
																					leftChipText = "출근",
																					rightChipText = "퇴근",
																					isWorking = false,
																					isPaused = false,
																					onTogglePause,
																					onLeftAction,
																					onRightAction,
																					className = "",
																			}: Props) {
		// 중앙은 HH:MM만 사용
		const hhmm = timeText.slice(0, 5);
		const statusLabel = isWorking ? (isPaused ? "paused" : "working") : "paused";

		// 링
		const R = 46;
		const C = 2 * Math.PI * R;
		const dash = Math.max(0, Math.min(100, percent));
		const dashOffset = (1 - dash / 100) * C;

		return (
				<Card
						className={[
								"overflow-hidden",
								"px-9 py-7 bg-white rounded-[30px] shadow-[1px_1px_20px_rgba(112,124,154,0.10)]",
								"flex flex-col items-center gap-4",
								"w-full max-w-[420px] sm:max-w-[440px]",
								"h-full min-h-[330px]",
								className,
						].join(" ")}
				>
						{/* 링 + 중앙 콘텐츠 */}
						<div className="relative w-full max-w-[300px] aspect-square mx-auto">
								<svg viewBox="0 0 100 100" className="absolute inset-0">
										<circle cx="50" cy="50" r={R} fill="none" stroke="rgb(229,231,235)" strokeWidth={3} />
										<circle
												cx="50" cy="50" r={R}
												fill="none" stroke="rgb(129,140,248)" strokeWidth={6}
												strokeLinecap="round" strokeDasharray={C} strokeDashoffset={dashOffset}
												transform="rotate(-90 50 50)"
										/>
								</svg>

								<div className="absolute inset-0 grid place-items-center select-none">
										<div className="w-48 h-28 relative">
												{/* 상태 라벨 */}
												<div className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
														<MonitorIcon
																className="w-[18px] h-[18px] text-slate-400 [&_path]:fill-current [&_path]:stroke-current"
																style={{ strokeWidth: 1.2 }}
														/>
														<span className="text-slate-400 text-sm leading-tight">{statusLabel}</span>
												</div>

												{/* 시간(누적 근무) */}
												<div className="absolute top-7 left-1/2 -translate-x-1/2 text-slate-900 text-[48px] font-bold leading-[48px] tracking-[-0.02em]">
														{hhmm}
												</div>

												{/* 날짜 */}
												<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-medium leading-[14px]">
														{dateText}
												</div>
										</div>
								</div>

								{/* 외출/복귀 토글 — 출근 중일 때만 보이고, 링에 '걸쳐지게' 배치 */}
								{isWorking && (
										<button
												type="button"
												onClick={onTogglePause}
												className={[
														"absolute rounded-full w-14 h-14 bg-neutral-800 flex items-center justify-center shadow-md",
														"right-[-10px] bottom-[-10px]", // 링 테두리에 걸치게
												].join(" ")}
												title={isPaused ? "복귀" : "외출(일시정지)"}
												aria-label="pause-toggle"
										>
												{isPaused ? (
														// 복귀(재생)
														<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
																<polygon points="8,5 19,12 8,19" fill="white" />
														</svg>
												) : (
														// 일시정지
														<PauseIcon
																className="w-5 h-5 text-white [&_path]:fill-current [&_path]:stroke-current"
														/>
												)}
										</button>
								)}
						</div>

						{/* 아래 칩(출근/퇴근) — 버튼을 눌렀을 때의 시각을 그대로 표기 */}
						<div className="inline-flex justify-start items-start gap-3">
								<button
										type="button"
										onClick={onLeftAction}
										className="w-28 h-10 px-3 bg-zinc-100 rounded-2xl flex justify-center items-center gap-2 overflow-hidden"
								>
										<StartIcon
												className="w-4 h-4 text-zinc-700 [&_path]:fill-current [&_path]:stroke-current"
												style={{ strokeWidth: 1.2 }}
										/>
										<span className="text-zinc-700 text-xs leading-snug">{leftChipText}</span>
								</button>

								<button
										type="button"
										onClick={onRightAction}
										className="w-28 h-10 px-3 bg-neutral-800 rounded-2xl flex justify-center items-center gap-2"
								>
										<StopIcon
												className="w-4 h-4 text-white [&_path]:fill-current [&_path]:stroke-current"
												style={{ strokeWidth: 1.2 }}
										/>
										<span className="text-white text-xs tracking-widest leading-snug">{rightChipText}</span>
								</button>
						</div>
				</Card>
		);
}
