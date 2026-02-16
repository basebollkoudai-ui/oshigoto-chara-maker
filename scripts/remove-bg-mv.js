const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/mv-original.png');
const outputPath = path.join(__dirname, '../public/mv.png');

async function removeEdgeBackground() {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log('Processing MV image...');
    console.log(`Original size: ${metadata.width}x${metadata.height}`);

    // より緩い条件で外側の白背景のみを透過
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;

        // 非常に厳格な白色検出（外側のみ）
        const whiteThreshold = 250; // 250以上を白とみなす（より厳格）
        const colorDiffThreshold = 5; // RGB差が5以下で均一とみなす（より厳格）

        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // RGB値の差を計算
          const maxChannel = Math.max(r, g, b);
          const minChannel = Math.min(r, g, b);
          const colorDiff = maxChannel - minChannel;

          // 極めて純粋な白色のみを透明化（外側の背景）
          // 条件: 全てのRGB値が250以上 かつ RGB差が5以下
          if (r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold && colorDiff <= colorDiffThreshold) {
            data[i + 3] = 0; // 完全透明
          }
        }

        return sharp(data, {
          raw: {
            width,
            height,
            channels
          }
        })
        .png()
        .toFile(outputPath);
      });

    console.log('✓ MV image processed successfully!');
    console.log(`Output: ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

removeEdgeBackground();
