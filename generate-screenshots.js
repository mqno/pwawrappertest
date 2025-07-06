const fs = require("fs");
const { createCanvas } = require("canvas");

// Create a sample screenshot of the PWA
function generateScreenshot(width, height, isWide = false, isDark = false) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Color scheme based on theme
  const colors = isDark
    ? {
        background: ["#111827", "#1f2937"], // Dark gray to darker gray
        header: "#1e40af", // Darker blue
        content: "#374151", // Dark gray
        border: "#4b5563", // Medium gray
        text: "#f9fafb", // Light gray
        textSecondary: "#d1d5db", // Lighter gray
        button: "#3b82f6", // Blue
        imageBg: "#4b5563", // Medium gray
        imageBorder: "#6b7280", // Light gray
      }
    : {
        background: ["#ffffff", "#f3f4f6"], // White to light gray
        header: "#3B82F6", // Blue
        content: "#ffffff", // White
        border: "#e5e7eb", // Light gray
        text: "#1f2937", // Dark gray
        textSecondary: "#6b7280", // Medium gray
        button: "#3B82F6", // Blue
        imageBg: "#f3f4f6", // Light gray
        imageBorder: "#d1d5db", // Medium gray
      };

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.background[0]);
  gradient.addColorStop(1, colors.background[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Header bar
  ctx.fillStyle = colors.header;
  ctx.fillRect(0, 0, width, height * 0.08);

  // Header text
  ctx.fillStyle = "white";
  ctx.font = `bold ${width * 0.04}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Simple PWA", width / 2, height * 0.04);

  // Main content area
  const contentY = height * 0.12;
  const contentHeight = height * 0.7;

  // Content background
  ctx.fillStyle = colors.content;
  ctx.fillRect(width * 0.05, contentY, width * 0.9, contentHeight);

  // Content border
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(width * 0.05, contentY, width * 0.9, contentHeight);

  // Title
  ctx.fillStyle = colors.text;
  ctx.font = `bold ${width * 0.05}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("Welcome to Our PWA", width / 2, contentY + height * 0.08);

  // Subtitle
  ctx.fillStyle = colors.textSecondary;
  ctx.font = `${width * 0.025}px Arial`;
  ctx.fillText(
    "A beautiful image with descriptive text",
    width / 2,
    contentY + height * 0.12
  );

  // Image placeholder
  const imageWidth = width * 0.6;
  const imageHeight = height * 0.25;
  const imageX = (width - imageWidth) / 2;
  const imageY = contentY + height * 0.18;

  ctx.fillStyle = colors.imageBg;
  ctx.fillRect(imageX, imageY, imageWidth, imageHeight);

  // Image border
  ctx.strokeStyle = colors.imageBorder;
  ctx.lineWidth = 1;
  ctx.strokeRect(imageX, imageY, imageWidth, imageHeight);

  // Image icon
  ctx.fillStyle = colors.textSecondary;
  ctx.font = `${width * 0.08}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🖼️", width / 2, imageY + imageHeight / 2);

  // Description text
  ctx.fillStyle = colors.text;
  ctx.font = `${width * 0.025}px Arial`;
  ctx.textAlign = "left";

  const textX = width * 0.1;
  const textY = imageY + imageHeight + height * 0.05;
  const maxWidth = width * 0.8;

  const lines = [
    "This is a simple Progressive Web App that demonstrates",
    "how to display beautiful images with descriptive text.",
    "The app is designed to work seamlessly across all",
    "devices and provides an excellent user experience.",
  ];

  lines.forEach((line, index) => {
    ctx.fillText(line, textX, textY + index * height * 0.03);
  });

  // Button
  const buttonWidth = width * 0.3;
  const buttonHeight = height * 0.06;
  const buttonX = (width - buttonWidth) / 2;
  const buttonY = contentY + contentHeight - height * 0.08;

  ctx.fillStyle = colors.button;
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  // Button text
  ctx.fillStyle = "white";
  ctx.font = `bold ${width * 0.025}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Learn More", width / 2, buttonY + buttonHeight / 2);

  // Footer
  ctx.fillStyle = colors.textSecondary;
  ctx.font = `${width * 0.02}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("Built with Next.js and Tailwind CSS", width / 2, height * 0.95);

  return canvas.toBuffer("image/png");
}

// Generate screenshots
console.log("Generating PWA screenshots...");

// Light mode screenshots
console.log("\n📸 Generating Light Mode Screenshots...");

// Wide screenshot (1280x720) - Light mode
const wideScreenshotLight = generateScreenshot(1280, 720, true, false);
fs.writeFileSync("public/screenshot-wide-light.png", wideScreenshotLight);
console.log("✅ Generated public/screenshot-wide-light.png (1280x720)");

// Narrow screenshot (390x844 - iPhone 12 Pro size) - Light mode
const narrowScreenshotLight = generateScreenshot(390, 844, false, false);
fs.writeFileSync("public/screenshot-narrow-light.png", narrowScreenshotLight);
console.log("✅ Generated public/screenshot-narrow-light.png (390x844)");

// Dark mode screenshots
console.log("\n🌙 Generating Dark Mode Screenshots...");

// Wide screenshot (1280x720) - Dark mode
const wideScreenshotDark = generateScreenshot(1280, 720, true, true);
fs.writeFileSync("public/screenshot-wide-dark.png", wideScreenshotDark);
console.log("✅ Generated public/screenshot-wide-dark.png (1280x720)");

// Narrow screenshot (390x844 - iPhone 12 Pro size) - Dark mode
const narrowScreenshotDark = generateScreenshot(390, 844, false, true);
fs.writeFileSync("public/screenshot-narrow-dark.png", narrowScreenshotDark);
console.log("✅ Generated public/screenshot-narrow-dark.png (390x844)");

console.log("\n🎉 All screenshots generated successfully!");
console.log("\n📁 Generated files:");
console.log("   • screenshot-wide-light.png (Desktop Light)");
console.log("   • screenshot-narrow-light.png (Mobile Light)");
console.log("   • screenshot-wide-dark.png (Desktop Dark)");
console.log("   • screenshot-narrow-dark.png (Mobile Dark)");
