import Image from "next/image";
import { Flex } from "../flex";
import { Title } from "../title";
import { Text } from "../text";
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

            <h3 className="font-normal text-3xl lg:text-4xl md:text-2xl text-sfdPrimary2">
                {title}
            </h3>

            <p className="text-gray-500/70 mt-3">{description}</p>
        </Flex>
    );
};
