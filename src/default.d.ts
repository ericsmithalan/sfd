declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": ModelViewerJSX &
                React.DetailedHTMLProps<
                    React.HTMLAttributes<HTMLElement>,
                    HTMLElement
                >;
        }
    }
}
