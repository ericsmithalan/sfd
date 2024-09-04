import Image from "next/image";
import { Flex } from "../flex";
import classNames from "classnames";
import { CSSProperties } from "react";
import { Card } from "../card";

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    className?: string;
    style?: CSSProperties;
}

export const ServiceCard = ({
    title,
    description,
    image,
    style,
    className,
}: ServiceCardProps) => {
    return (
        <Card
            dir="col"
            style={style}
            className={classNames("bg-white", className)}
        >
            <Flex as="div">
                <Image
                    className="w-[120px] aspect-auto"
                    alt={title}
                    width={20}
                    height={20}
                    src={image}
                />
            </Flex>

            <h3
                className={classNames(
                    "font-normal text-2xl mt-3 text-sfdPrimary2",
                    "lg:text-4xl",
                    "md:text-2xl",
                    "sm:text-xl"
                )}
            >
                {title}
            </h3>

            <p
                className={classNames(
                    "text-gray-500/70 text-sm mt-2",
                    "lg:text-lg",
                    "md:text-lg"
                )}
            >
                {description}
            </p>
        </Card>
    );
};
