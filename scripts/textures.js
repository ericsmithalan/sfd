const path = require("path");
const fs = require("fs");

async function walkDir(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            walkDir(fullPath); // Recursive call for subdirectories
        } else {
            //1-roughness-1k.png
            const regex = /^(\d)[-](.*[a-zA-z])[-](\d[k]).(png)$/;
            let match = regex.exec(entry.name);

            if (!match) {
                //1-2k_coatRoughness
                const regex2 = /^(\d)(?:-)(\d[k])(?:_)(.*)(.png)/;
                match = regex2.exec(entry.name);

                if (match) {
                    newName = `${match[1]}-${match[3]}-${match[2]}.png`.trim();

                    fs.rename(fullPath, `${dirPath}/${newName}`, function (err) {
                        if (err) console.log("ERROR: " + err);
                    });

                    if (match[3] === "diffuse" && match[2] === "1k") {
                        fs.copyFile(fullPath, `${dirPath}/${match[1]}-thumb.png`, (err) => {
                            if (err) throw err;
                            console.log("File copied successfully!");
                        });
                    }
                }
            }
        }
    }
}

walkDir(path.join(__dirname, "../public/textures"));
