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

    // 白い背景のみを透過に変換（キャラクター部分は保持）
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;

        // より厳格な白色検出（ほぼ純粋な白のみ）
        const whiteThreshold = 245; // 245以上を白とみなす
        const colorDiffThreshold = 10; // RGB差が10以下で均一とみなす

        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // RGB値の差を計算
          const maxChannel = Math.max(r, g, b);
          const minChannel = Math.min(r, g, b);
          const colorDiff = maxChannel - minChannel;

          // ほぼ純粋な白色のみを透明化
          // 条件: 全てのRGB値が245以上 かつ RGB差が10以下
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
