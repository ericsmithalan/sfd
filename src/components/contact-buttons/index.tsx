"use client";
import classNames from "classnames";
import { ButtonLink } from "../button-link";
import { Flex } from "../flex";
import { useContactInfo } from "@/hooks";

interface ContactButtonsProps {
    iconOnly?: boolean;
    dir?: "row" | "col";
    variant?: "border" | "fill";
    className?: string;
}

export const ContactButtons = ({
    iconOnly,
    dir,
    variant,
    className,
}: ContactButtonsProps) => {
    const { email, phone } = useContactInfo();

    const handlePhoneClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window) {
            window.open(`tel:${phone}`);
        }
    };

    const handleEmailClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (window) {
            window.open(`mailto:${email}`);
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
                title="Call Me"
                icon="email"
                href={"#"}
                variant={variant}
                onClick={handlePhoneClick}
            >
                {!iconOnly && "Call"}
            </ButtonLink>
            <ButtonLink
                title="Email Me"
                icon="phone"
                variant={variant}
                onClick={handleEmailClick}
                href={`#`}
            >
                {!iconOnly && "Email"}
            </ButtonLink>
        </Flex>
    );
};
