# TowWise

TowWise is a modern, high-performance web application designed to provide vehicle owners, renters, and road-trippers with precise information about safe towing capacities, trailer compatibility, and safety margins.

Built with Next.js 15, a 100% offline self-hosted US DOT NHTSA vPIC decoding engine, 2000–2026 full historical vehicle coverage, and dual MongoDB Atlas integration.

---

## Table of Contents
* [Background](#background)
* [Features](#features)
* [Architecture & 100% Offline Engine](#architecture--100-offline-engine)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Database Configuration](#database-configuration)
* [Performance Benchmarks](#performance-benchmarks)
* [Annual NHTSA vPIC Maintenance](#annual-nhtsa-vpic-maintenance)
* [Authors](#authors)

---

## Background

In vehicle and trailer rentals, customers frequently overestimate their vehicle's towing ability without considering transmission strain, braking distance, or dangerous trailer sway. TowWise bridges this gap by offering instant vehicle lookups, 100% offline US & Canadian VIN decoding, capacity guidelines for small cars, and an interactive safety advisor based on the industry-standard 80% continuous towing rule.

---

## Features

* **3 Ways to Look Up Towing Limits**:
  * 🚗 **Vehicle Selector**: Step-by-step selector from Model Year **2000 through 2026**, Make, Model, and Trim package with generational accuracy, reset controls, and visual breadcrumbs.
  * ⚡ **Instant Autocomplete Search**: Start typing any vehicle name or filter by category pills (🛻 Trucks, 🚙 SUVs, 🚘 Compacts, ⚡ EVs & Hybrids) for instant results.
  * 📋 **100% Offline US & Canadian VIN Decoder**: Enter any 17-character VIN with clipboard paste support, real-time character counter, country flags, and interactive WMI/VDS structural breakdown diagram.
* **Full 2000–2026 Model Year Coverage & Complete Brand Integrity**:
  * Over **2,510 verified vehicle documents** in MongoDB Atlas (`Towing/capacities`).
  * 100% full-span coverage across all 30 major manufacturers (Acura, Audi, BMW, Buick, Cadillac, Chevrolet, Chrysler, Dodge, Ford, GMC, Honda, Hyundai, Infiniti, Jeep, Kia, Land Rover, Lexus, Lincoln, Mazda, Mercedes-Benz, Mitsubishi, Nissan, Porsche, RAM, Rivian, Subaru, Tesla, Toyota, Volkswagen, Volvo).
  * Generational trim sanitization ensures trims reflect actual launch dates (e.g. Subaru Wilderness trims strictly 2022+, Ford PowerBoost 2021+, Ram Hurricane 2025+, MDX Gen 4 2022+).
* **Small Car & Compact Vehicle Towing Support**:
  * Dedicated Class I hitch specifications (1,000–1,500 lbs max gross trailer weight, 100–150 lbs tongue weight).
  * Guidance on unbraked vs. braked trailer limits and transmission cooling for compact cars (Corolla, Civic, Impreza, Mazda3, Jetta, Elantra, etc.).
* **Towing Specifications Card**:
  * Detailed breakdown of Engine, Transmission, Drivetrain, Max Towing Capacity, and manufacturer notes.
  * Instant unit toggle between **Pounds (lbs)** and **Kilograms (kg)**.
* **Trailer Category Compatibility**:
  * Real-time matching against standard trailer classes (Class I Light Utility up to Class V 5th Wheels).
* **The 80% Safety Rule Advisor**:
  * Calculates recommended continuous towing limits (80% margin) and safe tongue weight estimates (10–15%).
  * Interactive trailer + cargo weight calculator with color-coded safety gauge.
* **Feedback & Vehicle Inquiries System**:
  * In-app feedback form with category selection, 5-star ratings, and auto-attached vehicle context.
  * Persists directly to MongoDB Atlas (`Towing/contacts`) with graceful serverless logging fallback.

---

## Architecture & 100% Offline Engine

TowWise operates **100% offline** at runtime without relying on live government servers:
- **Self-Hosted NHTSA vPIC Engine** (`app/lib/nhtsa/localVpicDatabase.ts`):
  - Embedded World Manufacturer Identifier (WMI) registry covering 26+ makes and 70+ country codes.
  - 10th-character VIN model year map covering 1980 through 2039.
  - Vehicle Descriptor Section (VDS) pattern matcher for instant local identification.
  - Direct integration with MongoDB `Towing/capacities` (2,510+ vehicles) and embedded fallback catalogs.
  - **Zero runtime network calls** — eliminates API rate limits, latency, and government downtime.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 15 App Router](https://nextjs.org/) (`next@15.5.27`)
- **UI Library**: [HeroUI](https://heroui.com/) (formerly NextUI)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark mode)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend & Data
- **API Routes**: Next.js App Router (`/api/towing`, `/api/vin`, `/api/contact`)
- **VIN Engine**: 100% Offline Local US DOT NHTSA vPIC Engine
- **Database**: MongoDB Atlas (`Towing/capacities` and `Towing/contacts`) via Mongoose
- **Maintenance**: Annual NHTSA vPIC Dataset Updater CLI (`npm run update-vpic`)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
TowWise works out-of-the-box with zero configuration using its embedded catalog. To connect to MongoDB Atlas, create `.env.local`:

```bash
# Vehicle Towing Capacities (Database: Towing, Collection: capacities)
TOWING_URI="mongodb+srv://<username>:<password>@towinfo.3an5qxb.mongodb.net/Towing?retryWrites=true&w=majority&appName=TowInfo"

# Feedback & Inquiries (Database: Towing, Collection: contacts)
FEEDBACK_DB_URI="mongodb+srv://<username>:<password>@towinfo.3an5qxb.mongodb.net/Towing?retryWrites=true&w=majority&appName=TowInfo"
```

### 3. Verify Database Connection
Run the diagnostic test script:
```bash
node scripts/test-mongo.mjs
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Configuration

### Collections
- **`Towing/capacities`**: Stores verified vehicle towing specifications, engine options, drivetrains, and manufacturer notes.
- **`Towing/contacts`**: Captures user reviews, bug reports, and missing vehicle requests submitted via the contact form.

### Seeding Vehicles (Optional)
To populate or restore the `capacities` collection with the comprehensive vehicle catalog:
```bash
npm run seed
```

---

## Performance Benchmarks

TowWise includes an automated high-concurrency performance benchmark suite verifying sub-25ms response times across all endpoints:

```bash
npm run benchmark
```

### Benchmark Results (Next.js 15 Production Engine)
| Endpoint / Operation | Average Latency | P95 Latency | Concurrency / Load | Status |
|----------------------|-----------------|-------------|--------------------|--------|
| **Homepage UI Shell** | **1.89 ms** | 2.63 ms | Single / SSR | 200 OK |
| **Offline VIN Decoder** | **20.43 ms** | 25.30 ms | 30 concurrent reqs | 100% Success |
| **Filtered Towing Specs** | **23.03 ms** | 28.53 ms | 30 concurrent reqs | 100% Success |
| **MongoDB Atlas Capacities** | **20.40 ms** | 27.75 ms | Single / Live Atlas | 200 OK |
| **Full 2,510+ Catalog** | **175.42 ms** | 284.56 ms | 20 concurrent reqs | 100% Success |

---

## Annual NHTSA vPIC Maintenance

The application runtime is 100% offline. To update the local NHTSA dataset with newly registered manufacturer WMIs and model releases **once a year**:

```bash
npm run update-vpic
```

This CLI tool queries the US DOT NHTSA vPIC catalog, precompiles verified models, and updates `app/lib/nhtsa/vpicCache.json`, keeping the web app 100% offline for the remaining 364 days.

---

## Trim Accuracy & Generation Integrity

TowWise includes auditing and sanitization tools to guarantee trims accurately reflect vehicle release dates and generations across 2000–2026:

```bash
# Audit MongoDB for anachronistic trims or unreleased models
npm run audit-trims

# Sanitize database records to generation-accurate regular versions
npm run sanitize-trims
```

---

## Authors

- [Anderson Torres](https://www.github.com/and3rsontorres)
