"use client";
import classNames from "classnames";
import { ButtonLink } from "../button-link";
import { Flex } from "../flex";
import { useContactInfo } from "@/hooks";
import { IconSize } from "../icon";
import { IconLabel } from "../icon-label";

interface ContactButtonsProps {
    iconOnly?: boolean;
    dir?: "row" | "col";
    variant?: "border" | "fill";
    className?: string;
    iconSize?: IconSize;
    showLocation?: boolean;
}

export const ContactButtons = ({
    iconOnly,
    dir,
    variant,
    className,
    iconSize,
    showLocation,
}: ContactButtonsProps) => {
    const { email, phone } = useContactInfo();

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window) {
            document.location.href = `tel:${phone}`;
        }
    };

    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window) {
            document.location.href = `mailto:${email}`;
        }
    };

    return (
        <Flex
            as="div"
            full="w"
            flex="auto"
            className={classNames("gap-4", className)}
            dir={dir}
        >
            <ButtonLink
                iconSize={iconSize}
                title="Call Me"
                icon="phone"
                href={"#"}
                variant={variant}
                onClick={handlePhoneClick}
            >
                {!iconOnly && "Call"}
            </ButtonLink>
            <ButtonLink
                iconSize={iconSize}
                title="Email Me"
                icon="email"
                variant={variant}
                onClick={handleEmailClick}
                href={`#`}
            >
                {!iconOnly && "Email"}
            </ButtonLink>
            {showLocation && (
                <IconLabel
                    title="Location Icon"
                    iconSize={iconSize}
                    icon="location"
                >
                    Adrian, MI
                </IconLabel>
            )}
        </Flex>
    );
};
