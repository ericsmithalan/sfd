import { Flex } from "../flex";
import { ServiceCard } from "./card";
import classNames from "classnames";

interface ServicesCardsProps {
    className?: string;
}

export const ServicesCards = ({ className }: ServicesCardsProps) => {
    return (
        <Flex as="div" contain className="">
            <div
                className={classNames(
                    "grid grid-cols-1 gap-4 relative z-10 mt-[-100px]",
                    "lg:grid-cols-3",
                    "md:grid-cols-3",
                    "sm:grid-cols-3",
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
            </div>
        </Flex>
    );
};
