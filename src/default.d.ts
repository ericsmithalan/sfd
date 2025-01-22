declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": ModelViewerJSX &
                React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

declare module "*.hdr" {
    const value: string;
    export default value;
}
declare module "*.png" {
    const value: string;
    export default value;
}
