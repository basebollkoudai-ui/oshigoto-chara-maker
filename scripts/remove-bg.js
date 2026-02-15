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

    // 白い背景を透過に変換（より厳密な処理）
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;
        const threshold = 230; // より低い閾値で白を検出

        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // 白、グレー、明るい色を全て透明化
          // RGBの差が小さく（色が均一）、かつ明度が高い場合
          const maxChannel = Math.max(r, g, b);
          const minChannel = Math.min(r, g, b);
          const colorDiff = maxChannel - minChannel;
          const brightness = (r + g + b) / 3;

          // 白っぽい色（色差が小さく、明度が高い）を透明にする
          if (brightness > threshold && colorDiff < 30) {
            data[i + 3] = 0; // 完全透明
          }
          // グレー系の色も透明にする
          else if (colorDiff < 15 && brightness > 200) {
            data[i + 3] = 0;
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
