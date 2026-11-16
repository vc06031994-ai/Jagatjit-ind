// compress-images.js

import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import path from 'path';
import fs from 'fs/promises';

// समर्थित इमेज एक्सटेंशन
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

/**
 * दिए गए डिरेक्टरी से सभी इमेज फाइल्स प्राप्त करें।
 * @param {string} dir - डिरेक्टरी पथ।
 * @returns {Promise<string[]>} - इमेज फाइल पाथ्स की लिस्ट।
 */
const getImageFiles = async (dir) => {
    let files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            const nestedFiles = await getImageFiles(fullPath);
            files = files.concat(nestedFiles);
        } else if (item.isFile()) {
            const ext = path.extname(item.name).toLowerCase();
            if (SUPPORTED_EXTENSIONS.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
};

/**
 * एक इमेज को कंप्रेस करें और उसी पाथ पर ओवरराइट करें।
 * @param {string} file - इमेज फाइल पाथ।
 */
const compressAndOverwrite = async (file) => {
    const ext = path.extname(file).toLowerCase();

    try {
        const plugins = [];

        if (['.jpg', '.jpeg'].includes(ext)) {
            plugins.push(imageminMozjpeg({ quality: 70 }));
        } else if (ext === '.png') {
            plugins.push(imageminPngquant({ quality: [0.6, 0.8] }));
        } else if (ext === '.gif') {
            plugins.push(imageminGifsicle({ optimizationLevel: 2 }));
        } else if (ext === '.svg') {
            plugins.push(imageminSvgo({
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeViewBox: false,
                                cleanupIDs: false,
                                // अन्य आवश्यक SVGO प्लगइन्स जोड़ें
                            }
                        }
                    }
                ]
            }));
        }

        const compressedFiles = await imagemin([file], {
            plugins: plugins
        });

        if (compressedFiles.length > 0) {
            await fs.writeFile(file, compressedFiles[0].data);
            console.log(`Compressed and replaced: ${file}`);
        } else {
            console.warn(`No compression applied for: ${file}`);
        }
    } catch (error) {
        console.error(`Error compressing ${file}: ${error.message}`);
    }
};

/**
 * मुख्य फंक्शन जो सभी इमेजेज को कंप्रेस करता है।
 */
const compressImages = async () => {
    const inputDir = path.join('src', 'assets');

    try {
        const imageFiles = await getImageFiles(inputDir);
        console.log(`Found ${imageFiles.length} images to compress.`);

        if (imageFiles.length === 0) {
            console.log('No images found to compress.');
            return;
        }

        for (const file of imageFiles) {
            await compressAndOverwrite(file);
        }

        console.log('All images have been compressed and replaced successfully.');
    } catch (error) {
        console.error('Error during image compression:', error.message);
    }
};

// स्क्रिप्ट को चलाएं
compressImages();
