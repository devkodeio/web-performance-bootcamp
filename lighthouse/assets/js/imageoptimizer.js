const path = require('path');
const fs = require('fs').promises;
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
 
(async () => {
    const files = await imagemin(['assets/images/*.{jpg,png}'], {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    }).then((files) => {
      files.forEach(async (file) => {
        const source = path.parse(file.sourcePath);
        file.destinationPath = `${source.dir}/${source.name}.min${source.ext}`;
        await fs.writeFile(file.destinationPath, file.data);
      });
    });
  })();


  // https://www.npmjs.com/package/imagemin
  // https://www.npmjs.com/package/imagemin-jpegtran