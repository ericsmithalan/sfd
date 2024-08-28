import { useEffect } from "react";
import { Flex } from "../flex";
import { IconHelper } from "../icon";

export const Loading = () => {
    return (
        <Flex as="div" className="absolute top-[50%] left-[50%]">
            <IconHelper
                width={40}
                height={40}
                name="blade"
                fill
                className="animate-spin"
            />
        </Flex>
    );
};
