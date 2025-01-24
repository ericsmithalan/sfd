export interface IElementCoordinate {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const availablePositions = (
    target: IElementCoordinate,
    popup: IElementCoordinate,
    container: IElementCoordinate,
) => {
    const position: Record<string, boolean> = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    };

    if (target.x + popup.width < container.width) {
        position.right = true;
    }

    if (target.x - popup.width > 0) {
        position.left = true;
    }

    if (target.y - popup.height > 0) {
        position.top = true;
    }

    if (target.y + popup.height < container.height) {
        position.bottom = true;
    }

    return position;
};

export const getElementCoordinates = (element: HTMLElement): DOMRect | null => {
    if (element) {
        return element.getBoundingClientRect();
    }

    return null;
};

export const getWindowCoordinates = (): IElementCoordinate | null => {
    return {
        x: 0,
        y: window.innerHeight,
        width: window.innerWidth,
        height: window.innerHeight,
    };
};
export const getPopupPosition = (
    target: IElementCoordinate,
    popup: IElementCoordinate,
    container: IElementCoordinate,
    placement: "side" | "bottom",
) => {
    let x = 0;
    let y = 0;

    const position = availablePositions(target, popup, container);

    if (placement === "bottom") {
        if (position.bottom) {
            x = target.x;
            y = target.y + target.height;
        } else if (position.top) {
            x = target.x;
            y = target.y - popup.height;
        } else {
            x = target.x;
            y = container.height - popup.height;
        }

        // if (!position.right) {
        //     x = container.width - popup.width;
        // }
    } else if (placement === "side") {
        if (position.right) {
            x = target.x + target.width;
            y = target.y;
        } else {
            x = target.x - popup.width;
            y = target.y;
        }

        if (!position.bottom) {
            y = container.height - popup.height;
        }
    } else {
        if (position.left && !position.right) {
            x = target.x - popup.width;
            y = target.y;
        } else {
            x = target.x + target.width;
            y = target.y;
        }
    }

    return { x: x, y: y };
};
