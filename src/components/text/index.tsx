import classNames from "classnames";

interface TextProps {
    children?: React.ReactNode;
    as: React.ElementType<{}, "span" | "div" | "label" | "p" | "i" | "b">;
    className?: string;
}

export const Text = ({ children, className, ...props }: TextProps) => {
    return (
        <props.as className={classNames("", className)}>{children}</props.as>
    );
};
