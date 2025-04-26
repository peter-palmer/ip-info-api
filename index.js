// index.js
// API Geo-IP en CommonJS con country name y flag emoji

const express = require("express");
const geoip = require("geoip-lite");
const countries = require("i18n-iso-countries");

// Registrar locales
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/es.json"));

const app = express();
const PORT = process.env.PORT || 3000;

// Convierte código ISO al emoji de bandera
function codeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65)
    );
}

app.get("/api/ip/:ip", (req, res) => {
  const ip = req.params.ip;
  const info = geoip.lookup(ip);

  if (!info) {
    return res.status(404).json({ error: "IP no válida o no encontrada" });
  }

  const code = info.country;
  // Nombre en español; si no existe, caerá a English
  const nameES = countries.getName(code, "es") || countries.getName(code, "en");
  const flag = codeToEmoji(code);

  res.json({
    ip,
    countryCode: code,
    country: nameES, // e.g. "España"
    flag, // e.g. "🇪🇸"
    region: info.region,
    city: info.city,
    ll: info.ll,
    timezone: info.timezone,
    as: info.as,
  });
});

// Añade esto después de tu ruta /api/ip/:ip
app.get("/api/me", (req, res) => {
  // Express obtiene la IP real en req.ip
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  res.json({ ip: clientIp });
});

app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
