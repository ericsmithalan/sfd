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
        <Flex as="div" className="h-fit mt-[-100px] relative z-1">
            <Grid
                as={"div"}
                autoRows="min"
                contain
                style={{
                    gridTemplateRows: "1fr min-content",
                }}
                className={classNames(
                    "h-[30%] gap-6 gap-x-6 grid-rows-3 grid-cols-1 text-center ml-1 mr-1 pl-4 pr-4",
                    "lg:grid-cols-3 lg:pl-0 lg:pr-0 lg:row-span-2",
                    "md:grid-cols-3 md:pl-0 md:pr-0 lg:row-span-2",
                    "sm:grid-cols-3 sm:gap-4 sm:pl-0 lg:row-span-2",
                    className
                )}
            >
                <ServiceCard
                    image="/images/services/icn-woodworking.svg"
                    title="Woodworking"
                    description="Custom-made furniture pieces are meticulously crafted with attention to detail and a dedication to quality that ensures each creation is a true work of art."
                />
                <ServiceCard
                    image="/images/services/icn-3d-design.svg"
                    title="3D Design"
                    description="Transforming concepts into detailed digital models using advanced software, allowing for precise visualization and customization before the final creation."
                />
                <ServiceCard
                    image="/images/services/icn-cnc.svg"
                    title="CNC"
                    description="Using state-of-the-art CNC technology, I bring your visions to life with unparalleled accuracy and creativity."
                />
            </Grid>
        </Flex>
    );
};
