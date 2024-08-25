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
            title="home"
        >
            <ServicesCards />
            <Alert />
        </PageLayout>
    );
};

export default Home;
