/**
 * 결제문서 카드 (목록)
 */
import Card from "./Card";
import type { ApprovalItem } from "../../utils/types";

type Props = { approvals: ApprovalItem[] | null };

export default function ApprovalListCard({ approvals }: Props) {
		return (
				<Card className="flex flex-col gap-4">
						<div className="text-neutral-900 text-xl font-bold">결제문서</div>

						{(approvals ?? []).map((a) => (
								<div
										key={a.id}
										className="p-5 rounded-lg shadow-[1px_1px_10px_-1px_rgba(125,125,125,0.10)] border border-neutral-200/60 flex items-start justify-between"
								>
										<div className="opacity-80">
												<div className="text-neutral-900 text-lg font-medium">{a.title}</div>
												<div className="mt-1 flex items-center gap-9 text-xs">
														<div className="text-neutral-400">진행상태</div>
														<div className={statusColor(a.status)}>{a.status}</div>
												</div>
										</div>

										<div className="w-5 h-2 relative opacity-70">
												{/* row ... : 단순 아이콘 자리 */}
												<div className="w-full h-px bg-gray-300 absolute top-1/2" />
												<div className="w-1 h-2 bg-gray-300 absolute right-0 top-0" />
										</div>
								</div>
						))}
				</Card>
		);
}

function statusColor(s: ApprovalItem["status"]) {
		if (s === "완료") return "text-green-600";
		if (s === "진행") return "text-blue-600";
		return "text-orange-500";
}
