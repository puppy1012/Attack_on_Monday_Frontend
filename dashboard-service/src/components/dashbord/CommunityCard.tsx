import {useMemo, useRef, useState} from "react";
import Card from "./Card"
import SegmentedTabs, { TabItem } from "./common/SegmentedTabs";
import SortSelect, { type SortValue } from "./common/SortSelect";
import { useCommunityFeed } from "../../hooks/useCommunityFeed";
import { timeAgo, type CommunityCategory } from "../../utils/community.service";

type Props = { className?: string };

const tabItems: TabItem<CommunityCategory>[] = [
		{ value: "ALL", label: "전체" },
		{ value: "LUNCH", label: "점심모임" },
		{ value: "ANON", label: "익명글" },
];

const SB_WIDTH = 10;               // index.css 의 스크롤바 width 와 동일
const CONTENT_RIGHT_INSET = 12;
const HEADER_RIGHT_PADDING = SB_WIDTH + CONTENT_RIGHT_INSET; // 헤더 우측 패딩
const SCROLL_SHOW_MS = 800;        // 스크롤 멈춘 뒤 스크롤바 숨길 때까지 시간

export default function CommunityCard({ className = "" }: Props) {
		const [category, setCategory] = useState<CommunityCategory>("ALL");
		const [sort, setSort] = useState<SortValue>("latest");
		const limit = 15;
		const { isLoading, data, error } = useCommunityFeed({ category, sort, limit: 6 });
		const items = useMemo(() => (data?.items ?? []).slice(0, limit), [data]); // 게시글 15개로 제한

		// 스크롤
		const scrollRef = useRef<HTMLDivElement>(null);
		const [scrolling, setScrolling] = useState(false);
		const timerRef = useRef<number | null>(null);
		const onScroll = () => {
				if (!scrolling) setScrolling(true);
				if (timerRef.current) window.clearTimeout(timerRef.current);
				timerRef.current = window.setTimeout(() => setScrolling(false), SCROLL_SHOW_MS);
		};


		return (
				<Card className={`w-full p-7 overflow-hidden ${className}`}>
						{/* 헤더 */}
						<h3 className="text-neutral-900 text-xl font-bold leading-7">커뮤니티</h3>

						{/* 탭 + 정렬 */}
						<div
								className="mt-3 flex items-center justify-between gap-6 md:gap-40"
								style={{ paddingRight: HEADER_RIGHT_PADDING }}
						>
								<SegmentedTabs items={tabItems} value={category} onChange={setCategory} className="w-96" />
								<SortSelect value={sort} onChange={setSort} />
						</div>

						{/* 목록 */}
						<div
								ref={scrollRef}
								onScroll={onScroll}
								className={`mt-4 max-h-[520px] overflow-y-auto sb-ghost 
									${scrolling ? "sb-ghost-active" : "sb-ghost-idle"} pr-3`}
						>
								<div className="space-y-3 pr-0">
										{isLoading && (
												<div className="space-y-3">
														{Array.from({ length: 3 }).map((_, i) => (
																<div key={i} className="h-24 bg-gray-100/60 rounded-lg animate-pulse" />
														))}
												</div>
										)}

										{error && <p className="text-sm text-red-500">피드를 불러오지 못했어요.</p>}

										{!isLoading && !error && items.map((p) => (
												<article
														key={p.id}
														className="px-5 py-4 bg-white rounded-lg shadow-[1px_1px_10px_-1px_rgba(125,125,125,0.10)] border border-neutral-200/80 overflow-hidden break-words"
												>
														<div className="space-y-2">
																<div className="flex flex-wrap items-center gap-1">
																		{p.tags.map((tag) => (
																				<span key={tag} className="px-2 py-[3px] rounded-2xl bg-gray-100 text-slate-400 text-xs">
																					{tag}
																				</span>
																		))}
																</div>
																<h4 className="text-neutral-900 text-lg font-bold">{p.title}</h4>
																<p className="text-stone-500 text-sm">{p.contentPreview}</p>
														</div>

														<div className="mt-3 flex items-center justify-between">
																<span className="text-neutral-400 text-xs">
																	{timeAgo(p.createdAt)} · 조회 {p.views}
																</span>

																{p.category === "LUNCH" ? (
																		<div className="flex items-center gap-2 text-stone-500 text-xs">
																				<GroupIcon />
																				<span>{p.participants?.joined ?? 0}/{p.participants?.capacity ?? 0}명</span>
																		</div>
																) : (
																		<div className="flex items-center gap-3 text-stone-500 text-xs">
																				<div className="flex items-center gap-1">
																						<LikeIcon /><span>{p.likes ?? 0}</span>
																				</div>
																				<div className="flex items-center gap-1">
																						<CommentIcon /><span>{p.comments ?? 0}</span>
																				</div>
																		</div>
																)}
														</div>
												</article>
										))}
								</div>
						</div>
				</Card>
		);
}

/* 아이콘 */
function GroupIcon() {
		return (
				<span className="relative inline-block w-4 h-3">
					<span className="absolute left-0 bottom-0 w-3 h-[5px] bg-stone-500 rounded-sm" />
					<span className="absolute left-[3px] top-0 w-1.5 h-1.5 bg-stone-500 rounded-sm" />
					<span className="absolute right-0 bottom-[2px] w-1 h-1 bg-stone-500 rounded-sm" />
					<span className="absolute right-[2px] top-0 w-1 h-1.5 bg-stone-500 rounded-sm" />
				</span>
		);
}
function LikeIcon() {
		return (
				<span className="inline-block w-3 h-3 relative overflow-hidden">
					<span className="absolute left-0 bottom-[2px] w-[3px] h-[6px] bg-stone-500 rounded-sm" />
					<span className="absolute left-[6px] top-0 w-[10px] h-[12px] bg-stone-500 rounded-[2px]" />
				</span>
		);
}
function CommentIcon() {
		return (
				<span className="inline-block w-3 h-3 relative">
					<span className="absolute inset-0 border border-stone-500 rounded-[2px]" />
					<span className="absolute left-1 bottom-[-2px] w-2 h-2 bg-white rotate-45 border-l border-b border-stone-500" />
				</span>
		);
}
