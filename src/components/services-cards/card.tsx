import Image from "next/image";
import { Flex } from "../flex";
import { Title } from "../title";
import { Text } from "../text";

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
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
            className="bg-white shadow-md p-14 rounded-md gap-7"
        >
            <Flex as="div">
                <Title
                    as="h3"
                    className="font-normal text-xl lg:text-4xl md:text-2xl text-sfdPrimary2"
                >
                    {title}
                </Title>
            </Flex>
            <Flex as="div">
                <Text as={"span"} className="text-gray-500">
                    {description}
                </Text>
            </Flex>
            <Flex as="div">
                <Image alt="" width={150} height={150} src={image} />
            </Flex>
        </Flex>
    );
};
