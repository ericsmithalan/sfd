import { Flex, Model } from "@/components";
import "./style.scss";

const ModelViewer = ({ params }: { params: { slug: string } }) => {
    return (
        <Flex as="section" dir="col">
            <Model
                modelPath={`/models/${params.slug}.glb`}
                className="min-h-screen  min-w-[100vw]"
                loaderClass="text-white/30"
            />
        </Flex>
    );
};

export default ModelViewer;
