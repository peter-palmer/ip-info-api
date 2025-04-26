# IP-Info-API

API REST en Node.js para obtener información geográfica de una dirección IP, incluyendo nombre completo del país y emoji de la bandera.

---

## 📋 Contenido

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Ejecutar localmente](#ejecutar-localmente)
  - [Ejemplo de petición](#ejemplo-de-petición)
- [CI/CD](#cicd)
- [Variables de entorno](#variables-de-entorno)
- [Licencia](#licencia)

---

## 📝 Descripción

Esta API ofrece un endpoint REST que, dado un parámetro IP, devuelve datos geográficos como el país (nombre completo en español, con fallback a inglés) y el emoji de la bandera, junto con región, ciudad, coordenadas, timezone y ASN.

---

## ⚙️ Características

- Resuelve la IP usando **geoip-lite**.
- Traduce el código ISO de país a nombre completo en Español (o Inglés) con **i18n-iso-countries**.
- Convierte el código de país a emoji de bandera.
- Implementación en **CommonJS**.
- Despliegue sencillo en Railway.

---

## 🛠 Tecnologías

- [Node.js](https://nodejs.org) v16+
- [Express](https://expressjs.com)
- [geoip-lite](https://www.npmjs.com/package/geoip-lite)
- [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries)
- [GitHub Actions](https://github.com/features/actions) (opcional)
- [Railway](https://railway.app)

---

## 🚀 Prerequisitos

- **Node.js** y **npm** instalados.
- Cuenta en **Railway**.
- (Opcional) GitHub CLI o acceso al repositorio público.

---

## 🔧 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/ip-info-api.git
   cd ip-info-api
   ```
2. Instala dependencias:
   ```bash
   npm ci
   ```
3. (Opcional) Configura variables de entorno en `.env`:
   ```ini
   # Para servicios externos (si se usan)
   IPINFO_TOKEN=tu_token_aqui
   ```

---

## 📦 Uso

### Ejecutar localmente

```bash
npm start
```

Por defecto escucha en el puerto `3000`. Puedes cambiarlo con la variable `PORT`.

### Ejemplo de petición

```bash
curl http://localhost:3000/api/ip/8.8.8.8
```

```json
{
  "ip": "8.8.8.8",
  "countryCode": "US",
  "country": "Estados Unidos",
  "flag": "🇺🇸",
  "region": "CA",
  "city": "Mountain View",
  "ll": [37.386, -122.0838],
  "timezone": "America/Los_Angeles",
  "as": "AS15169 Google LLC"
}
```

---

## 🔄 CI/CD

Si conectas tu repositorio a Railway, cada _push_ a `main` desplegará automáticamente la app.

Si quieres incorporar un workflow con GitHub Actions, añade `.github/workflows/deploy.yml` con:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: node-version: '16'
      - run: npm ci
      - name: Deploy to Railway
        uses: railwayapp/railway-action@v1
        with:
          railwayToken: ${{ secrets.RAILWAY_TOKEN }}
          projectId:  ${{ secrets.RAILWAY_PROJECT_ID }}
          environment: production
```

---

## 🔑 Variables de entorno

- `PORT`: Puerto donde escucha la API (por defecto `3000`).
- `IPINFO_TOKEN`: Token de servicios externos si se integran.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ve el archivo [LICENSE](LICENSE) para más detalles.
