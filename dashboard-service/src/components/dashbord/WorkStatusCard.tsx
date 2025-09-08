/**
 * 근무현황 카드 (오른쪽 리스트)
 */
import Card from "./Card";
import type { WorkStatusItem } from "../../utils/types";

type Props = { items: WorkStatusItem[] | null; dateLabel?: string };

export default function WorkStatusCard({ items, dateLabel }: Props) {
		return (
				<Card className="flex flex-col gap-3">
						<div className="text-neutral-900 text-xl font-bold">근무현황</div>

						<div className="flex items-center justify-between">
								<div className="text-stone-500 text-sm">{dateLabel ?? "오늘"}</div>

								<div className="flex items-center gap-2 text-xs">
										<span className="px-2.5 py-1.5 rounded-2xl bg-indigo-500 text-white">출근</span>
										<span className="px-2.5 py-1.5 rounded-2xl border border-neutral-400/70 text-neutral-400">
            외근/출장
          </span>
										<span className="px-2.5 py-1.5 rounded-2xl border border-neutral-400/70 text-neutral-400">
            연차/휴가
          </span>
								</div>
						</div>

						<div className="h-px bg-zinc-100" />

						<div className="flex flex-col gap-3 pt-2">
								{(items ?? []).map((p) => (
										<div key={p.id} className="flex items-center gap-3">
												<div className="relative w-14 h-14">
														<div className="w-12 h-12 bg-zinc-300 rounded-2xl absolute left-1 top-0" />
														{/* presence dot */}
														<div className="absolute -left-0.5 bottom-1 w-3 h-3 bg-white rounded-full" />
														<div
																className={`absolute bottom-1 left-1.5 w-2 h-2 rounded-full ${
																		p.isOnline ? "bg-green-400" : "bg-neutral-300"
																}`}
														/>
												</div>

												<div className="flex-1 flex flex-col">
														<div className="flex items-end gap-1">
																<div className="text-neutral-900 text-sm font-medium leading-none">{p.name}</div>
																{p.role && (
																		<div className="text-neutral-400 text-xs leading-none">{p.role}</div>
																)}
														</div>
														{p.note && (
																<div className="text-stone-500 text-xs">{p.note}</div>
														)}
												</div>
										</div>
								))}
						</div>
				</Card>
		);
}
