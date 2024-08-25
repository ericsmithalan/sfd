import { ReactNode } from "react";
import { Flex, FlexProps } from "../flex";
import { ServiceCard } from "./card";
import classNames from "classnames";
import { Grid } from "../grid";

interface ServicesCardsProps {
    className?: string;
}

export const ServicesCards = ({ className }: ServicesCardsProps) => {
    return (
        <Grid
            cols={1}
            autoRows="min"
            as={"div"}
            gap={4}
            contain
            className={classNames(
                "grid-cols-1 mt-[-100px] relative z-10 gap-6 text-center ml-1 mr-1  pl-4 pr-4",
                "lg:grid-cols-3",
                "md:grid-cols-3",
                "sm:grid-cols-3 sm:gap-4",
                className
            )}
        >
            <ServiceCard
                image="/images/services/icn-woodworking.svg"
                title="Woodworking"
                description="Our custom-made furniture pieces are meticulously crafted with attention to detail and a dedication to quality that ensures each creation is a true work of art."
            />
            <ServiceCard
                image="/images/services/icn-3d-design.svg"
                title="3D Design"
                description="Transforming concepts into detailed digital models using advanced software, allowing for precise visualization and customization before the final creation."
            />
            <ServiceCard
                image="/images/services/icn-cnc.svg"
                title="CNC"
                description="Using state-of-the-art CNC technology, we bring your visions to life with unparalleled accuracy and creativity."
            />
        </Grid>
    );
};
