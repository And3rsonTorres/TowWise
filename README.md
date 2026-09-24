# TowWise

TowWise is a modern web application designed to provide vehicle owners, renters, and road-trippers with precise information about safe towing capacities, trailer compatibility, and safety margins.

## Table of Contents
* [Background](#background)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Authors](#authors)

## Background

In vehicle and trailer rentals, customers frequently overestimate their vehicle's towing ability without considering transmission strain, braking distance, or dangerous trailer sway. TowWise bridges this gap by offering fast vehicle lookups, official US DOT VIN decoding, and an interactive safety advisor based on the industry-standard 80% towing rule.

## Features

* **3 Ways to Look Up Towing Limits**:
  * 🚗 **Vehicle Selector**: Filter by Model Year (2018–2024), Make, Model, and Trim package.
  * ⚡ **Instant Autocomplete Search**: Start typing any vehicle name (e.g. "F-150", "Tahoe", "Telluride") for instant results.
  * 📋 **US & Canadian VIN Decoder**: Enter any 17-character VIN to decode exact specifications (engine, cylinders, displacement, drive type, GVWR class) directly from the US Department of Transportation NHTSA vPIC API.
* **Towing Specifications Card**:
  * Detailed breakdown of Engine, Transmission, Drivetrain, Max Towing Capacity, and manufacturer notes.
  * Instant unit toggle between **Pounds (lbs)** and **Kilograms (kg)**.
* **Trailer Category Compatibility**:
  * Real-time matching against standard trailer classes (Class I Light Utility up to Class V 5th Wheels).
* **The 80% Safety Rule Advisor**:
  * Calculates recommended continuous towing limits (80% margin) and safe tongue weight estimates (10–15%).
  * Interactive trailer + cargo weight calculator with color-coded safety gauge.
* **Zero-Config Serverless Architecture**:
  * Works 100% serverless out-of-the-box using an embedded vehicle dataset.
  * Optional MongoDB Atlas integration for persistent custom data and contact messages (`npm run seed` included).

## Tech Stack

### Frontend
- **Framework**: [Next.js 14 App Router](https://nextjs.org/)
- **UI Library**: [HeroUI](https://heroui.com/) (formerly NextUI)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion v12)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark mode)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend & APIs
- **Serverless API Routes**: Next.js App Router (`/api/towing`, `/api/vin`, `/api/contact`)
- **VIN Decoding**: US DOT NHTSA vPIC API (free, public REST API)
- **Database (Optional)**: MongoDB Atlas & Mongoose

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Optional: MongoDB Atlas Setup
To connect to an external MongoDB database:
1. Copy `.env.example` to `.env.local`
2. Add your MongoDB connection string to `TOWING_URI`
3. Seed the database:
```bash
npm run seed
```

## Authors

- [Anderson Torres](https://www.github.com/and3rsontorres)
