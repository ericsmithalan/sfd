import { Flex, Model, ModelProps } from "@/components";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ModelViewer = ({ params }: { params: { slug: string } }) => {
    console.log(params);
    return (
        <Flex as="section">
            <Model modelPath={`/models/${params.slug}.glb`} />
        </Flex>
    );
};

export default ModelViewer;
