import { Flex, IconHelper, Model, ModelProps } from "@/components";
import { BladeIcon } from "@/components/icon/blade";
import { Loading } from "@/components/loading";
import { Suspense, useEffect } from "react";

const ModelViewer = ({ params }: { params: { slug: string } }) => {
    console.log(params);
    return (
        <Flex as="section" dir="col">
            <Suspense fallback={<Loading />}>
                <Model modelPath={`/models/${params.slug}.glb`} />
            </Suspense>
        </Flex>
    );
};

export default ModelViewer;
