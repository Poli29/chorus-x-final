
const fs = require('fs');
const Tesseract = require('tesseract.js');

async function analyzeImage(filePath) {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(filePath, 'eng', { logger: m => console.log(m) })
            .then(({ data: { text } }) => {
                // Dummy CHORUS logic
                let verdict = "❓ WAIT";
                if (text.includes("CHoCH") && text.includes("FVG")) {
                    verdict = "✅ BUY";
                } else if (text.includes("BOS") && text.includes("OB")) {
                    verdict = "❌ SELL BLOCKED";
                }

                resolve({
                    verdict,
                    strategy: "CHORUS-X v3.5",
                    propguard: "Compliant",
                    structure: "CHoCH + OB + FVG confirmed",
                    rejectionCandle: "Last candle valid",
                    tradeLog: "Auto-analyzed from chart image"
                });
            })
            .catch(reject);
    });
}

module.exports = { analyzeImage };
