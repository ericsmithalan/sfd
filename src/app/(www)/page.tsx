import { HomeHero, PageLayout } from "@/components";
import { Alert } from "@/components/alert";
import { ServicesCards } from "@/components/services-cards";
import "./style.scss";

const Home = () => {
    return (
        <PageLayout
            as="div"
            dir="col"
            className="bg-sfdGray5"
            hero={<HomeHero />}
        >
            <ServicesCards />
            {/* <Flex
                as="div"
                dir="row"
                flex="auto"
                className="w-[500px] h-[500px]"
            >
                <Model
                    modelPath="/models/case-1-light.glb"
                    loaderClass="text-black/60 mx-auto my-auto"
                    disableZoom={true}
                    autoRotate={false}
                    disablePan={true}
                    interactions={"none"}
                    disableTap={true}
                    cameraControls={true}
                />
            </Flex> */}

            <Alert />
        </PageLayout>
    );
};

export default Home;
