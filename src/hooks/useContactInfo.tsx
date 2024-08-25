import { Address } from "@/types";
import { useEffect, useState } from "react";

interface ContactInfo {
    email: string;
    phone: string;
    address?: Address;
}

export const useContactInfo = (): ContactInfo => {
    const [contactInfo, setContactInfo] = useState<ContactInfo>(
        {} as ContactInfo
    );
    useEffect(() => {
        const encEmail = atob(
            "aW5mb0BzbWl0aGZ1cm5pdHVyZWRlc2lnbi5jb20="
        ).concat();
        const encPhone = atob("MjUzLTIyOS0xNjc5").concat();
        setContactInfo({ email: encEmail, phone: encPhone });
    }, []);

    return contactInfo;
};
