import fs from "fs";
import path from "path";

const run = () => {
    const dir = path.join(__dirname, "../public/textures/wood/cedar");

    fs.rename("oldFileName.txt", "newFileName.txt", (err) => {
        if (err) throw err;
        console.log("File renamed successfully");
    });
};
