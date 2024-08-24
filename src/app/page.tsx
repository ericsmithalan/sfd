import { HomeHero, PageLayout } from "@/components";
import { ServicesCards } from "@/components/services-cards";

const Home = () => {
    return (
        <PageLayout as="div" hero={<HomeHero />} title="home">
            <ServicesCards />
        </PageLayout>
    );
};

export default Home;
