import { useEffect, useState } from "react";

/**
 * useActivePath
 * - SPA 내 history.pushState / replaceState 변화까지 감지
 * - 여러 MFE가 동시에 써도 1번만 패치되도록 전역 가드 포함
 */
const PATCH_KEY = "__NAV_PATCHED__";

export function useActivePath() {
    const [path, setPath] = useState<string>(() =>
        typeof window !== "undefined" ? window.location.pathname : "/"
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const update = () => setPath(window.location.pathname);

        // 뒤/앞으로 가기
        window.addEventListener("popstate", update);

        // history patch (중복 방지 + refCount)
        const w = window as any;
        if (!w[PATCH_KEY]) {
            const origPush = history.pushState;
            const origReplace = history.replaceState;

            const wrap =
                (orig: typeof history.pushState) =>
                    (...args: any[]) => {
                        const ret = (orig as any).apply(history, args as any);
                        window.dispatchEvent(new Event("locationchange"));
                        return ret;
                    };

            history.pushState = wrap(origPush) as any;
            history.replaceState = wrap(origReplace) as any;

            w[PATCH_KEY] = {
                pushState: origPush,
                replaceState: origReplace,
                refCount: 1,
            };
        } else {
            w[PATCH_KEY].refCount++;
        }

        // 커스텀 이벤트 구독
        const onLoc = () => update();
        window.addEventListener("locationchange", onLoc);

        return () => {
            window.removeEventListener("popstate", update);
            window.removeEventListener("locationchange", onLoc);

            const meta = (window as any)[PATCH_KEY];
            if (meta && --meta.refCount === 0) {
                history.pushState = meta.pushState;
                history.replaceState = meta.replaceState;
                delete (window as any)[PATCH_KEY];
            }
        };
    }, []);

    return path;
}
