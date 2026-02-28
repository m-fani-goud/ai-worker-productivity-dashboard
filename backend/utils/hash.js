const crypto = require("crypto");

function generateHash(data) {
  return crypto
    .createHash("md5")
    .update(JSON.stringify(data))
    .digest("hex");
}

module.exports = { generateHash };