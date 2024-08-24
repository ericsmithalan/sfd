import { useEffect, useState } from "react";

export const useEmail = (): string => {
    const [email, setEmail] = useState<string>("");
    useEffect(() => {
        var encEmail = "ZXJpY3NtaXRoYWxhbkBnbWFpbC5jb20=";
        setEmail(atob(encEmail).concat());
    }, []);

    return email;
};
