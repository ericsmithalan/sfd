import { HomeHero, PageLayout } from "@/components";
import { Alert } from "@/components/alert";
import { ServicesCards } from "@/components/services-cards";
import { Metadata } from "next";

const Home = () => {
    return (
        <PageLayout
            as="div"
            dir="col"
            className="bg-sfdGray5"
            hero={<HomeHero />}
        >
            <ServicesCards />
            <Alert />
        </PageLayout>
    );
};

export default Home;
