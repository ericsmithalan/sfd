"use client";
import classNames from "classnames";
import { ButtonLink } from "../button-link";
import { Flex } from "../flex";
import { useContactInfo } from "@/hooks";

export const Alert = () => {
    const { email, phone } = useContactInfo();

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`tel:${phone}`);
    };
    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open(`mailto:${email}`);
    };
    return (
        <Flex
            as="div"
            dir="col"
            className={classNames("bg-white rounded-md shadow-md p-7 mt-8")}
        >
            <p className="text-gray-600/50">
                My website is currently under construction . Please contact me
                directly if you have any questions. More will come soon...{" "}
                <br />
                <i className="text-xs">Aug 25, 2024</i>
            </p>
            <Flex
                as="div"
                dir="row"
                className={classNames("gap-4 mt-10 pb-4 text-xl")}
            >
                <ButtonLink
                    href={`#`}
                    onClick={handlePhoneClick}
                    variant="border"
                    icon="phone-line"
                    className="text-sm"
                >
                    Call
                </ButtonLink>
                <ButtonLink
                    href={`#`}
                    variant="border"
                    onClick={handleEmailClick}
                    icon="mail-line"
                    className="text-sm"
                >
                    Email
                </ButtonLink>
            </Flex>
        </Flex>
    );
};
