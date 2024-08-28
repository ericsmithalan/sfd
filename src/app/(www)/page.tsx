import { HomeHero, PageLayout } from "@/components";
import { Alert } from "@/components/alert";
import { ServicesCards } from "@/components/services-cards";

const Home = () => {
    return (
        <PageLayout
            as="div"
            dir="col"
            className="bg-sfdGray5"
            hero={<HomeHero />}
        >
            <ServicesCards />
            {/* <Flex as="div">
                <Model
                    modelPath="/models/case-1-light.glb"
                    className="w-[300px] h-[300px]"
                    loaderClass="text-black/60"
                    cameraControls={false}
                />
            </Flex> */}

            <Alert />
        </PageLayout>
    );
};

export default Home;
