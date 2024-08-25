import Image from "next/image";
import { Flex } from "../flex";
import { Title } from "../title";
import { Text } from "../text";

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
            className="bg-white shadow-md p-7 rounded-md gap-7"
        >
            <Flex as="div">
                <Image
                    className="w-[100px] h-[100px]"
                    alt={title}
                    width={100}
                    height={100}
                    src={image}
                />
            </Flex>
            <Flex as="div">
                <Title
                    as="h3"
                    className="font-normal text-3xl lg:text-4xl md:text-2xl text-sfdPrimary2"
                >
                    {title}
                </Title>
            </Flex>

            <Flex as="div">
                <Text as={"span"} className="text-gray-500/70">
                    {description}
                </Text>
            </Flex>
        </Flex>
    );
};
