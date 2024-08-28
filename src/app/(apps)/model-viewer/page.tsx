import { Flex, Model, ModelProps } from "@/components";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ModelViewer = () => {
    return (
        <Flex as="section">
            <Model />
        </Flex>
    );
};

export default ModelViewer;
