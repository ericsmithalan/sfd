import classNames from "classnames";

interface TitleProps {
    children?: React.ReactNode;
    as: React.ElementType<{}, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
}

export const Title = ({ children, ...props }: TitleProps) => {
    const classes = () => {
        switch (props.as) {
            case "h1":
                return "mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white";
            case "h2":
                return "mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white";
            case "h3":
                return "mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white";
            case "h4":
                return "mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white";
            case "h5":
                return "mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white";
            case "h6":
                return "mb-4 text-m font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-xl dark:text-white";
        }
    };

    return (
        <props.as className={classNames(classes(), "")}>{children}</props.as>
    );
};
