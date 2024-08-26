"use client";
import classNames from "classnames";
import { ButtonLink } from "../button-link";
import { Flex } from "../flex";
import { useContactInfo } from "@/hooks";
import { ContactButtons } from "../contact-buttons";

export const Alert = () => {
    return (
        <Flex
            as="div"
            dir="col"
            className={classNames("bg-white rounded-md shadow-md p-10")}
        >
            <Flex as="p" dir="col" className="text-gray-600/50 max-w-prose">
                <i className="text-xs mb-2">Aug 25, 2024</i>
                My website is currently under construction . Please contact me
                directly if you have any questions. More will come soon...{" "}
                <br />
            </Flex>

            <ContactButtons
                variant="border"
                className="pt-8 text-gray-600/60"
            />
        </Flex>
    );
};
