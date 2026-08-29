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

declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}
