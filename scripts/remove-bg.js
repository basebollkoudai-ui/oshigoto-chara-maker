const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/characters');
const outputDir = path.join(__dirname, '../public/characters');

// 画像ファイルのリスト
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

async function removeWhiteBackground(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // 白い背景を透過に変換
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;
        const threshold = 240; // 白と判定する閾値

        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // 白っぽいピクセルを透明にする
          if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // アルファチャンネルを0に（完全透明）
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

    console.log(`✓ Processed: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function processAll() {
  console.log(`Processing ${files.length} images...\n`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await removeWhiteBackground(inputPath, outputPath);
  }

  console.log('\n✓ All images processed!');
}

processAll();
