const Jimp = require('jimp');
const path = require('path');

const files = ['gift-box.png', 'teddy-bear.png', 'two-cats.png', 'envelope.png'];
const assetsDir = path.join(__dirname, 'public', 'assets');

async function removeBackground() {
  for (const file of files) {
    try {
      const imagePath = path.join(assetsDir, file);
      const image = await Jimp.read(imagePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];
        
        // Checkerboard colors are usually around pure white (255) and light grey (204)
        // Check if the pixel is bright and grey-ish
        const isBright = r > 180 && g > 180 && b > 180;
        const isGreyish = Math.abs(r - g) < 20 && Math.abs(r - b) < 20 && Math.abs(g - b) < 20;
        
        if (isBright && isGreyish) {
          // Make it completely transparent
          this.bitmap.data[idx + 3] = 0;
        } else if (r > 150 && g > 150 && b > 150 && Math.abs(r - g) < 25 && Math.abs(r - b) < 25) {
          // Edge smoothing: semi-transparent for slightly darker greys
          this.bitmap.data[idx + 3] = Math.floor(a * 0.4);
        }
      });
      
      await image.writeAsync(imagePath);
      console.log(`Processed ${file}`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }
}

removeBackground();
