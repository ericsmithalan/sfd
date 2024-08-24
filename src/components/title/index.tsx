import classNames from "classnames";

interface TitleProps {
    children?: React.ReactNode;
    as: React.ElementType<{}, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
    className?: string;
}

export const Title = ({ children, className, ...props }: TitleProps) => {
    return (
        <props.as className={classNames("tracking-tight", className)}>
            {children}
        </props.as>
    );
};
