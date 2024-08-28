import { BladeIcon } from "./blade";
import { CloseIcon } from "./close";
import { EmailIcon } from "./email";
import { IconProps } from "./icon";
import { MenuIcon } from "./menu";
import { PhoneIcon } from "./phone";

export type IconNames = "blade" | "email" | "phone" | "menu" | "close";

interface IconHelperProps extends IconProps {
    name: IconNames;
}

export const IconHelper = ({ name, ...props }: IconHelperProps) => {
    const getIcon = () => {
        switch (name) {
            case "blade":
                return <BladeIcon {...props} />;
            case "email":
                return <EmailIcon {...props} />;
            case "phone":
                return <PhoneIcon {...props} />;
            case "menu":
                return <MenuIcon {...props} />;
            case "close":
                return <CloseIcon {...props} />;
        }
    };

    return getIcon();
};
