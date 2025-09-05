// 공용 카드 래퍼
import { PropsWithChildren } from "react";
import { cn } from "../../utils/cn";

type Props = {
		className?: string;
};

export default function Card({className, children}: PropsWithChildren<Props>){
		return(
				<div
						className={cn(
								"bg-white rounded-[30px] p-7 shadow-[1px_1px_20px_0_rgba(112,124,154,0.10)]",
								className
						)}
				>
						{children}

				</div>
		);
}