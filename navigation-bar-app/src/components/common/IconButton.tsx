import React from "react";
import {Button} from "@mui/material";

type Props = React.BaseHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    size?: number;
};

export default function IconButton({ children, size = 36, className = "", ...rest }: Props) {
    return(
        <button
            {...rest}
            className={`inline-flex items-center justify-center rounded-xl bg-white shadow 
                  border border-neutral-200 hover:bg-neutral-50 active:scale-[0.98] transition
                  ${className}`}
            style={{ width: size, height: size }}
        >
            { children }
        </button>
    );
}