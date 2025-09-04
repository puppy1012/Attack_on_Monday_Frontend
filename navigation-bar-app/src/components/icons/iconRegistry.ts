import Bell from "../../assets/icons/bell.svg";
import Search from "../../assets/icons/search.svg";
import Dashboard from "../../assets/icons/대시보드.svg";
import Board from "../../assets/icons/게시판.svg";
import User from "../../assets/icons/사용자.svg";
import Contract from "../../assets/icons/계약서.svg";
import Logout from "../../assets/icons/log-out.svg";
import Plus from "../../assets/icons/플러스.svg";
import ArrowLeft from "../../assets/icons/ic-keyboard-arrow-left-24px.svg";

export const Icons = {
    Bell,
    Search,
    Dashboard,
    Board,
    User,
    Contract,
    Logout,
    Plus,
    ArrowLeft
} as const;

export type IconName = keyof typeof Icons;