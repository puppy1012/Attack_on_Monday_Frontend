/**
 * 잔여연차 요약 카드 (가운데 작은 카드)
 */
import Card from "./Card";
import type { LeaveSummary } from "../../utils/types";

type Props = { leave: LeaveSummary | null };

export default function LeaveCard({ leave }: Props) {
		const item = (label: string, value?: string | number, dotClass = "bg-blue-500") => (
				<div className="flex items-end gap-3">
						<div className="w-4 h-4 rounded-sm border border-white relative">
								<div className={`absolute inset-0 ${dotClass} opacity-90 rounded-sm`} />
						</div>
						<div className="text-stone-500 text-xs">{label}</div>
						<div className="text-neutral-900 text-2xl font-semibold">{value ?? "—"}</div>
				</div>
		);

		return (
				<Card className="flex flex-col gap-4">
						<div className="text-neutral-900 text-xl font-bold">잔여연차</div>
						<div className="flex items-center gap-4">
								<div className="flex items-end gap-3">{item("총연차", leave?.total ?? "—", "bg-blue-500")}</div>
								<div className="w-px h-12 bg-gray-200" />
								<div className="flex items-end gap-3">{item("사용연차", leave?.used ?? "—", "bg-red-500")}</div>
								<div className="w-px h-12 bg-gray-200" />
								<div className="flex items-end gap-3">{item("잔여연차", leave?.remaining ?? "—", "bg-green-600")}</div>
						</div>
				</Card>
		);
}
