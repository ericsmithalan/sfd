import classNames from "classnames";

interface TitleProps {
    children?: React.ReactNode;
    as: React.ElementType<{}, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
    className?: string;
}

export const Title = ({ children, className, ...props }: TitleProps) => {
    return (
        <props.as
            className={classNames(
                props.as === "h1" && "font-thin leading-none tracking-tight",
                props.as === "h2" &&
                    "text-5xl font-thin leading-none tracking-tight",
                props.as === "h3" &&
                    "text-4xl font-thin leading-none tracking-tight",
                props.as === "h4" &&
                    "text-3xl font-thin leading-none tracking-tight",
                props.as === "h5" &&
                    "text-2xl font-thin leading-none tracking-tight",
                props.as === "h6" &&
                    "text-xl font-thin leading-none tracking-tight",
                className
            )}
        >
            {children}
        </props.as>
    );
};
