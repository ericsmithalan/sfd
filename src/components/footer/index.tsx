"use-client";

import classNames from "classnames";
import { Flex } from "../flex";
import { Logo } from "../logo";
import { ContactButtons } from "../contact-buttons";

interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    return (
        <Flex
            as="footer"
            dir="col"
            className={classNames("bg-sfdSecondary0 p-8", className)}
        >
            <Flex as="div" contain dir="row" className={classNames("gap-12")}>
                <Logo className={classNames("w-60 aspect-auto")} />
                <Flex as="div" className={classNames("text-white")}>
                    <ContactButtons dir="col" />
                </Flex>
                <Flex as="div" className={classNames("")}></Flex>
            </Flex>
            <Flex
                contain
                as="div"
                dir="col"
                className={classNames(
                    "text-white text-sm mt-10 font-extralight gap-2"
                )}
            >
                <h6 className="font-medium text-sfdPrimary2">
                    Proud to Serve Lenawee County
                </h6>
                <Flex as="div" dir="row">
                    <h6 className="text-white/70 min-w-[100px]">Cities:</h6>
                    <p className="text-white/50">
                        Adrian, Hudson, Morenci, Tecumseh.
                    </p>
                </Flex>
                <Flex as="div" dir="row">
                    <h6 className="text-white/70 min-w-[100px]">Villages:</h6>
                    <p className="text-white/50">
                        Addison, Blissfield, Britton, Cement City, Clayton,
                        Deerfield, Onsted.
                    </p>
                </Flex>
                <Flex as="div" dir="row">
                    <h6 className="text-white/70 min-w-[100px]">Townships:</h6>
                    <p className="text-white/50">
                        Addison, Blissfield, Britton, Cement City, Adrian
                        Township, Blissfield Township, Cambridge Township,
                        Clinton Township, Deerfield Township, Dover Township,
                        Fairfield Township, Franklin Township, Hudson Township,
                        Macon Township, Madison Township, Medina Township, Ogden
                        Township, Palmyra Township, Raisin Township, Ridgeway
                        Township, Rollin Township, Rome Township, Seneca
                        Township, Tecumseh Township, Woodstock Township.
                    </p>
                </Flex>
            </Flex>
        </Flex>
    );
};
