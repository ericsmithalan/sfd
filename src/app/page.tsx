import { HomeHero, PageLayout } from "@/components";
import { ServicesCards } from "@/components/services-cards";

const Home = () => {
    return (
        <PageLayout
            as="div"
            className="bg-sfdGray5"
            hero={<HomeHero />}
            title="home"
        >
            <ServicesCards />
        </PageLayout>
    );
};

export default Home;
