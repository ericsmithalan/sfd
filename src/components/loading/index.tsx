import { Flex } from "../flex";
import classNames from "classnames";
import { Icon } from "../icon";

interface LoadingProps {
    className?: string;
    iconClassName?: string;
    loading?: boolean;
}

export const Loading = ({
    className,
    iconClassName,
    loading,
}: LoadingProps) => {
    return (
        <Flex
            as="div"
            dir="col"
            align={["items", "center"]}
            className={classNames("w-screen", !loading && "hidden", className)}
        >
            <Icon
                title="loading..."
                iconSize="xxxl"
                icon="blade"
                fill
                className={classNames("animate-spin", iconClassName)}
            />
            <div className="text-xs mt-2">loading...</div>
        </Flex>
    );
};
