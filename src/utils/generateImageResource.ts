import { IImageResource } from "../interface";

type ImageResource = {
    primary: string;
    images: Array<string>;
};

export const generateImageResource = (img?: IImageResource): ImageResource | null => {
    if (img) {
        const result: ImageResource = {
            primary: "",
            images: [],
        };

        for (let i = 0; i < img.count; i++) {
            if (i + 1 === img.primaryImg) {
                result.primary = `${img.path}${i + 1}_thumb.png`;
            }
            result.images.push(`${img.path}${i + 1}_thumb.png`);
        }

        return result;
    }
    return null;
};
