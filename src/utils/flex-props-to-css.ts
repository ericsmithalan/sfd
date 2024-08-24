import { FlexProps } from "../components";

export const flexPropsToCss = (props: FlexProps) => {
    const cn: Array<string> = [];

    if (props.dir) {
        cn.push(`flex-${props.dir}`);
    }

    if (props.wrap !== undefined) {
        if (props.wrap) {
            cn.push(`flex-wrap`);
        } else {
            cn.push(`flex-nowrap`);
        }
    }

    if (props.basis) {
        cn.push(`basis-${props.basis}`);
    }

    if (props.gap) {
        cn.push(`gap-${props.gap}`);
    }

    if (props.full) {
        switch (props.full) {
            case "w":
                cn.push("w-full");
                break;
            case "h":
                cn.push("h-full");
                break;
            case "both":
                cn.push("w-full h-full");
                break;
        }
    }

    if (props.grow !== undefined) {
        if (props.grow) {
            cn.push("flex-grow");
        } else {
            cn.push("flex-grow-0");
        }
    }

    if (props.shrink !== undefined) {
        if (props.shrink) {
            cn.push("flex-shrink");
        } else {
            cn.push("flex-shrink-0");
        }
    }

    if (props.screen) {
        switch (props.screen) {
            case "w":
                cn.push("w-screen");
                break;
            case "h":
                cn.push("h-screen");
                break;
            case "both":
                cn.push("w-screen h-screen");
                break;
        }
    }

    if (props.justify) {
        const type = props.justify[0];
        let prefix = "";

        if (type === "content") {
            prefix = `justify-`;
        } else {
            prefix = `justify-${type}-`;
        }

        switch (props.justify[1]) {
            case "start":
                cn.push(`${prefix}start`);
                break;
            case "center":
                cn.push(`${prefix}center`);
                break;
            case "end":
                cn.push(`${prefix}end`);
                break;
            case "between":
                cn.push(`${prefix}between`);
                break;
            case "around":
                cn.push(`${prefix}around`);
                break;
            case "stretch":
                cn.push(`${prefix}stretch`);
                break;
            case "evenly":
                cn.push(`${prefix}evenly`);
                break;
        }
    }

    if (props.flex) {
        cn.push(`flex-${props.flex}`);
    }

    if (props.align) {
        const type = props.align[0];

        switch (props.align[1]) {
            case "start":
                cn.push(`${type}-start`);
                break;
            case "center":
                cn.push(`${type}-center`);
                break;
            case "end":
                cn.push(`${type}-end`);
                break;
            case "between":
                cn.push(`${type}-between`);
                break;
            case "around":
                cn.push(`${type}-around`);
                break;
            case "stretch":
                cn.push(`${type}-stretch`);
                break;
            case "evenly":
                cn.push(`align-evenly`);
                break;
        }
    }

    return cn.join(" ");
};
