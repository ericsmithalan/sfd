import { ReactNode } from "react";
import { Flex, FlexProps } from "../flex";
import { ServiceCard } from "./card";
import classNames from "classnames";

interface ServicesCardsProps {
    className?: string;
}

export const ServicesCards = ({ className }: ServicesCardsProps) => {
    return (
        <Flex
            as={"div"}
            dir="col"
            contain
            className={classNames(
                "relative z-10 mt-[-100px] md:flex-row lg:flex-row gap-6 text-center",
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
                description="transforming concepts into detailed digital models using advanced software, allowing for precise visualization and customization before the final creation."
            />
            <ServiceCard
                image="/images/services/icn-cnc.svg"
                title="CNC"
                description="Using state-of-the-art CNC technology, we bring your visions to life with unparalleled accuracy and creativity."
            />
        </Flex>
    );
};
