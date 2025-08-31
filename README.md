# 🍹 Gifthütte Backend

Backend für die **Gifthütte** – die mobile Cocktail-Bar mit Tour-Seite, Drinks, Kategorien, Highlights, Newsletter & Social Feed.  
Implementiert mit **NestJS**, **Prisma** und **MariaDB/MySQL** (lokal) bzw. **PostgreSQL** (für Deployment auf Debian-Server).

---

## 🚀 Features

- **Auth & RBAC**: Login, Register, Rollen (Admin, Manager, Customer)
- **Drinks & Kategorien**: Cocktails/Drinks mit Varianten & Kategorien
- **Locations**: Kommende Standorte + aktueller Standort („Wo sind wir heute?“)
- **Highlights**: Aktionen, Specials, Happy Hour
- **Newsletter**: Subscribe / Confirm / Unsubscribe
- **Social**: Instagram Feed Integration mit Caching
- **Swagger**: API-Dokumentation unter `/docs`

---

## 📦 Tech Stack

- [NestJS](https://nestjs.com/) – API Framework
- [Prisma](https://www.prisma.io/) – ORM
- [MariaDB/MySQL](https://mariadb.org/) – Lokale Datenbank
- [PostgreSQL](https://www.postgresql.org/) – Produktionsdatenbank (Debian-Server):contentReference[oaicite:1]{index=1}
- [Docker Compose](https://docs.docker.com/compose/) – DB & Services
- [Swagger](https://swagger.io/) – API Dokumentation

---

## ⚙️ Setup (Entwicklung lokal)

### 1) Repository klonen & Dependencies installieren

```bash
git clone https://github.com/<dein-github-user>/gifthuette-backend.git
cd gifthuette-backend
npm install
```
