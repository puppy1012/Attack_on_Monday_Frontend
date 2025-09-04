// 기본 import: 컴포넌트
declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FC<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default ReactComponent;
}

// ?url: 파일 URL
declare module "*.svg?url" {
    const url: string;
    export default url;
}
