import { HomeHero, PageLayout, Alert, ServicesCards } from "@/components";

const Home = () => {
    return (
        <PageLayout as="div" dir="col" hero={<HomeHero />}>
            <ServicesCards />
            {/* <ProjectsHero /> */}
            <Alert />
        </PageLayout>
    );
};

export default Home;
