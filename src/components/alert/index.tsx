"use client";
import classNames from "classnames";
import { Flex } from "../flex";
import { ContactButtons } from "../contact-buttons";

export const Alert = () => {
    return (
        <Flex
            as="div"
            dir="col"
            className={classNames("bg-white rounded-md shadow-md p-10")}
        >
            <Flex as="div" dir="col" className="text-gray-600/50 max-w-prose">
                <i className="text-xs mb-2">Aug 25, 2024</i>

                <p>
                    My website is currently under construction and will be
                    updated soon with the following:
                </p>
                <ul className="list-disc mt-3">
                    <li className="list-inside">
                        Woodworking portfolio with images
                    </li>
                    <li className="list-inside">Current projects</li>
                    <li className="list-inside">About me page</li>
                </ul>

                <p className="mt-3">
                    Please contact me directly if you have any questions. I can
                    send images of past work and provide you with more
                    information.
                </p>
            </Flex>

            <ContactButtons
                variant="border"
                className="pt-8 text-gray-600/60"
            />
        </Flex>
    );
};
