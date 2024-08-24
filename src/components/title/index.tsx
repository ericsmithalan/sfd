import classNames from "classnames";

interface TitleProps {
    children?: React.ReactNode;
    as: React.ElementType<{}, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
    className?: string;
}

export const Title = ({ children, className, ...props }: TitleProps) => {
    const classes = () => {
        switch (props.as) {
            case "h1":
                return "text-6xl font-thin leading-none tracking-tight";
            case "h2":
                return "text-5xl font-thin leading-none tracking-tight";
            case "h3":
                return "text-4xl font-thin leading-none tracking-tight";
            case "h4":
                return "text-3xl font-thin leading-none tracking-tight";
            case "h5":
                return "text-2xl font-thin leading-none tracking-tight";
            case "h6":
                return "text-xl font-thin leading-none tracking-tight";
        }
    };

    return (
        <props.as className={classNames(classes(), className)}>
            {children}
        </props.as>
    );
};
