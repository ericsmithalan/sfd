import Image from "next/image";
import { Flex } from "../flex";
import classNames from "classnames";

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    className?: string;
}

export const ServiceCard = ({
    title,
    description,
    image,
}: ServiceCardProps) => {
    return (
        <Flex
            as="div"
            dir="col"
            flex="auto"
            full="w"
            align={["items", "center"]}
            className={classNames(
                "bg-white shadow-md p-7 pb-12 rounded-md",
                classNames
            )}
        >
            <Flex as="div">
                <Image
                    className="w-[120px] aspect-auto"
                    alt={title}
                    width={220}
                    height={160}
                    src={image}
                />
            </Flex>

            <h3
                className={classNames(
                    "font-normal text-2xl lg:text-4xl mt-3 md:text-2xl text-sfdPrimary2",
                    "sm:text-xl"
                )}
            >
                {title}
            </h3>

            <p className={classNames("text-gray-500/70 mt-3", "sm:text-sm")}>
                {description}
            </p>
        </Flex>
    );
};
