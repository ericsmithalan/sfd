import { HomeHero, PageLayout, Alert, ServicesCards } from "@/components";

const Home = () => {
    return (
        <PageLayout
            as="div"
            dir="col"
            className="bg-sfdGray5"
            hero={<HomeHero />}
        >
            <ServicesCards />
            {/* <ProjectsHero /> */}
            <Alert />
        </PageLayout>
    );
};

export default Home;
