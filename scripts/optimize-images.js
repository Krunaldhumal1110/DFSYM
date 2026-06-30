import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "public/assets-original";
const OUTPUT_DIR = "public/assets-webp";

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const QUALITY = 82;

let converted = 0;
let skipped = 0;
let failed = 0;

async function processDirectory(inputDir, outputDir) {

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const items = fs.readdirSync(inputDir);

    for (const item of items) {

        const inputPath = path.join(inputDir, item);
        const outputPath = path.join(outputDir, item);

        const stat = fs.statSync(inputPath);

        if (stat.isDirectory()) {
            await processDirectory(inputPath, outputPath);
            continue;
        }

        const ext = path.extname(item).toLowerCase();

        // Convert only JPG/JPEG/PNG
        if (![".jpg", ".jpeg", ".png"].includes(ext)) {
            continue;
        }

        const webpOutput = outputPath.replace(ext, ".webp");

        if (fs.existsSync(webpOutput)) {
            skipped++;
            console.log("Skipped:", webpOutput);
            continue;
        }

        try {

            let image = sharp(inputPath, {
                failOn: "none"
            });

            // Read EXIF orientation and rotate correctly
            image = image.rotate();

            const metadata = await image.metadata();

            let resizeOptions = {
                fit: "inside",
                withoutEnlargement: true
            };

            // Resize while preserving portrait/landscape
            if ((metadata.width || 0) >= (metadata.height || 0)) {

                resizeOptions = {
                    ...resizeOptions,
                    width: MAX_WIDTH
                };

            } else {

                resizeOptions = {
                    ...resizeOptions,
                    height: MAX_HEIGHT
                };

            }

            await image
                .resize(resizeOptions)
                .webp({
                    quality: QUALITY,
                    effort: 6
                })
                .toFile(webpOutput);

            converted++;

            console.log("Converted:", webpOutput);

        } catch (err) {

            failed++;

            console.log("Failed:", inputPath);
            console.log(err.message);

        }

    }

}

(async () => {

    console.log("================================");
    console.log(" Optimizing Images to WebP");
    console.log("================================\n");

    await processDirectory(INPUT_DIR, OUTPUT_DIR);

    console.log("\n================================");
    console.log("Finished");
    console.log("================================");

    console.log("Converted :", converted);
    console.log("Skipped   :", skipped);
    console.log("Failed    :", failed);

})();