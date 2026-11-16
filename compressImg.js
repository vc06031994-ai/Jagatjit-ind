import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import path from 'path';
import fs from 'fs/promises';

const compressImages = async () => {
    const inputDir = path.join('src', 'assets');
    const outputDir = path.join('imagecompress', 'assets');

    try {
        const files = await imagemin(['src/assets/**/*.{jpg,jpeg,png,gif,svg}'], {
            destination: outputDir,
            plugins: [
                imageminMozjpeg({ quality: 70 }),
                imageminPngquant({
                    quality: [0.6, 0.8]
                }),
                imageminGifsicle({
                    optimizationLevel: 2
                }),
                imageminSvgo({
                    plugins: [
                        { removeViewBox: false }
                    ]
                })
            ]
        });

        if (files.length === 0) {
            console.log('No images found to compress.');
            return;
        }

        console.log(`Compressed ${files.length} images.`);
    } catch (error) {
        console.error('Error compressing images:', error.message);
    }
};

compressImages();
