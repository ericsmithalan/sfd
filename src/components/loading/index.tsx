import { useEffect } from "react";
import { Flex } from "../flex";
import { IconHelper } from "../icon";
import classNames from "classnames";

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
            <IconHelper
                width={100}
                height={100}
                name="blade"
                fill
                className={classNames("animate-spin", iconClassName)}
            />
            <div className="text-xs text-white/30 mt-2">loading...</div>
        </Flex>
    );
};
