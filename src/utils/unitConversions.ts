import { Vector3 } from "three";

const METERS_TO_INCHES = 39.3700787402;

export const convertMeterToInch = (vector: Vector3): Vector3 => {
    const arr: Array<number> = [vector.x, vector.y, vector.z].sort((a, b) => a - b);

    const thickness = arr[0];
    const width = arr[1];
    const length = arr[2];

    return new Vector3(
        Number((width * METERS_TO_INCHES).toFixed(2)),
        Number((length * METERS_TO_INCHES).toFixed(2)),
        Number((thickness * METERS_TO_INCHES).toFixed(2)),
    );
};

export const convertMeterToInchRaw = (vector: Vector3): Vector3 => {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;

    return new Vector3(
        Number((x * METERS_TO_INCHES).toFixed(2)),
        Number((y * METERS_TO_INCHES).toFixed(2)),
        Number((z * METERS_TO_INCHES).toFixed(2)),
    );
};

export const convertToBordFeet = (vector: Vector3) => {
    // board feet = length (ft) × width (in) × thickness (in) / 12
    const arr: Array<number> = [vector.x, vector.y, vector.z].sort((a, b) => a - b);

    const thickness = arr[0];
    const width = arr[1];
    const length = arr[2];

    return Number((((length / 12) * width * thickness) / 12).toFixed(1));
};

export const convertInchToMeter = (vector: Vector3): Vector3 => {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;

    return new Vector3(
        Number((x / METERS_TO_INCHES).toFixed(2)),
        Number((y / METERS_TO_INCHES).toFixed(2)),
        Number((z / METERS_TO_INCHES).toFixed(2)),
    );
};

interface Vector3Fraction {
    x: Fraction;
    y: Fraction;
    z: Fraction;
}

export const toFraction = (vector: Vector3, lowestD: number = 32): Vector3Fraction => {
    const vect = convertMeterToInch(vector);
    return {
        x: getFraction(vect.x, lowestD),
        y: getFraction(vect.y, lowestD),
        z: getFraction(vect.z, lowestD),
    };
};

interface Fraction {
    number: number;
    decimal: number;
    denominator: number;
    numerator: number;
    formatted: string;
}

const getFraction = (value: number, denominator: number = 32): Fraction => {
    const integer = Math.floor(value);
    let str = "";
    let numerator = Math.floor(((value - integer) * 1000) / denominator + 0.5);

    while (numerator % 2 == 0 && denominator % 2 == 0) {
        numerator /= 2;
        denominator /= 2;
    }

    if (denominator > 1)
        if (integer != 0) {
            str = `${integer} ${numerator}/${denominator}`;
        } else if (value < 0) {
            str = `-${numerator}/${denominator}`;
        } else {
            str = `${numerator}/${denominator}`;
        }
    else {
        str = `${integer}`;
    }

    return {
        decimal: value,
        number: integer,
        denominator: denominator,
        numerator: numerator,
        formatted: str,
    };
};
