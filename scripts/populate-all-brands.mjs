import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;
if (!uri) {
  console.error("No TOWING_URI found.");
  process.exit(1);
}

// Brand expansions to ensure full 2000-2026 coverage for all brands
const BRAND_EXPANSIONS = [
  // ==========================================
  // ACURA
  // ==========================================
  {
    make: "Acura",
    model: "MDX",
    years: [2001, 2026],
    getTrims: (year) => {
      if (year === 2021) return null; // Skipped 2021 MY
      if (year <= 2006) {
        return [
          { TrimName: "Standard / Regular Model (3.5L V6 AWD Tow Package)", Engine: "3.5L V6 VTEC (240–265 hp)", Transmission: "5-Speed Automatic with Heavy-Duty ATF & PS Coolers", Drivetrain: "VTM-4 AWD", "Max Towing Capacity": 4500, Notes: "Class III receiver hitch with factory auxiliary ATF and power steering fluid coolers. Rated for 4,500 lbs for boats / aerodynamic trailers (3,500 lbs for box trailers)." }
        ];
      }
      if (year <= 2013) {
        return [
          { TrimName: "Standard / Regular Model (3.7L V6 SH-AWD Tow Package)", Engine: "3.7L V6 VTEC (300 hp / 270 lb-ft)", Transmission: "5-Speed / 6-Speed Automatic with ATF Cooler", Drivetrain: "Super Handling All-Wheel Drive (SH-AWD)", "Max Towing Capacity": 5000, Notes: "Class III receiver hitch with transmission fluid cooler required for 5,000 lbs." }
        ];
      }
      if (year <= 2020) {
        return [
          { TrimName: "Standard / Regular Model (3.5L V6 SH-AWD Tow Package)", Engine: "3.5L Direct Injection V6 (290 hp / 267 lb-ft)", Transmission: "9-Speed / 6-Speed Automatic with ATF Cooler", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Accessory transmission fluid cooler required for 5,000 lbs (3,500 lbs standard)." },
          { TrimName: "Standard / Regular Model (3.5L V6 FWD)", Engine: "3.5L V6", Transmission: "9-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
        ];
      }
      // 2022+ (4th Gen)
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 SH-AWD Factory Tow Package)", Engine: "3.5L DOHC V6 (290 hp / 267 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with integrated trailer wiring and ATF cooler standard." },
        { TrimName: "Type S 3.0L Turbo V6 SH-AWD", Engine: "3.0L Turbocharged V6 (355 hp / 354 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Type S high-output performance hauler with adaptive air suspension." },
        { TrimName: "Standard / Regular Model (3.5L V6 FWD)", Engine: "3.5L V6", Transmission: "10-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
      ];
    }
  },
  {
    make: "Acura",
    model: "RDX",
    years: [2007, 2026],
    getTrims: (year) => {
      if (year <= 2012) {
        return [
          { TrimName: "Standard / Regular Model (2.3L Turbo SH-AWD Class I Tow)", Engine: "2.3L Turbocharged K23A1 (240 hp / 260 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch. Maximum tongue weight: 150 lbs." }
        ];
      }
      if (year <= 2018) {
        return [
          { TrimName: "Standard / Regular Model (3.5L V6 AWD Class I Tow)", Engine: "3.5L SOHC V6 (273–279 hp / 251–252 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch with trailer brakes." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (2.0L VTEC Turbo SH-AWD Class I Tow)", Engine: "2.0L Direct Injection Turbo (272 hp / 280 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating for teardrop camper, bike rack, or kayak trailer." }
      ];
    }
  },

  // ==========================================
  // AUDI
  // ==========================================
  {
    make: "Audi",
    model: "Q7",
    years: [2007, 2026],
    getTrims: (year) => {
      if (year <= 2015) {
        return [
          { TrimName: "Standard / Regular Model (3.0L / 4.2L Tow Package)", Engine: "3.0T Supercharged V6 / 4.2L V8 (280–350 hp)", Transmission: "8-Speed / 6-Speed Tiptronic Automatic", Drivetrain: "quattro AWD", "Max Towing Capacity": 6600, Notes: "Factory Class III/IV hitch receiver with adaptive air suspension." },
          { TrimName: "3.0L TDI Turbo Diesel", Engine: "3.0L V6 Turbo Diesel (240 hp / 406 lb-ft)", Transmission: "8-Speed Tiptronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 6600, Notes: "High torque clean diesel towing configuration." }
        ];
      }
      return [
        { TrimName: "55 TFSI 3.0L Turbo V6 (Factory Tow Package)", Engine: "3.0L Turbocharged V6 (335 hp / 369 lb-ft)", Transmission: "8-Speed Tiptronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 7700, Notes: "Factory trailer hitch with 7,700 lbs rating and trailer stability program." },
        { TrimName: "45 TFSI 2.0L Turbo (Standard Tow)", Engine: "2.0L Turbo I-4 (248–261 hp)", Transmission: "8-Speed Tiptronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 4400, Notes: "Class III hitch rating." }
      ];
    }
  },
  {
    make: "Audi",
    model: "Q5",
    years: [2009, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (2.0L Turbo / 3.0T quattro Tow Package)", Engine: "2.0L Turbo / 3.0T V6 (211–349 hp)", Transmission: "8-Speed Tiptronic / 7-Speed S tronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 4400, Notes: "Factory Class III receiver hitch rating with trailer stability control." }
    ]
  },

  // ==========================================
  // BMW
  // ==========================================
  {
    make: "BMW",
    model: "X5",
    years: [2000, 2026],
    getTrims: (year) => {
      if (year <= 2006) {
        return [
          { TrimName: "Standard / Regular Model (4.4L / 3.0L xDrive Tow Package)", Engine: "4.4L V8 / 3.0L Inline-6 (225–315 hp)", Transmission: "5-Speed / 6-Speed Steptronic Automatic", Drivetrain: "xDrive AWD", "Max Towing Capacity": 6000, Notes: "Class III receiver hitch with self-leveling rear air suspension." }
        ];
      }
      if (year <= 2018) {
        return [
          { TrimName: "Standard / Regular Model (3.0L Turbo / 4.4L Twin-Turbo xDrive Tow Package)", Engine: "3.0L Turbo I-6 / 4.4L V8 (300–445 hp)", Transmission: "8-Speed / 6-Speed Steptronic", Drivetrain: "xDrive AWD", "Max Towing Capacity": 6000, Notes: "Factory Class III hitch with stability control." },
          { TrimName: "xDrive35d Turbo Diesel", Engine: "3.0L I-6 Turbo Diesel (255 hp / 413 lb-ft)", Transmission: "8-Speed Steptronic", Drivetrain: "xDrive AWD", "Max Towing Capacity": 6000, Notes: "High torque diesel hauler." }
        ];
      }
      // 2019+ (G05)
      return [
        { TrimName: "Standard / Regular Model (xDrive40i / M50i / M60i Factory Tow Package)", Engine: "3.0L Turbo I-6 / 4.4L Twin-Turbo V8 (335–523 hp)", Transmission: "8-Speed Sport Steptronic", Drivetrain: "xDrive AWD", "Max Towing Capacity": 7200, Notes: "Factory 2-inch receiver hitch rating with dynamic stability control trailer mode." }
      ];
    }
  },
  {
    make: "BMW",
    model: "X3",
    years: [2004, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (xDrive Factory Tow Package)", Engine: "2.0L Turbo / 3.0L Turbo Inline-6", Transmission: "8-Speed / 6-Speed Steptronic", Drivetrain: "xDrive AWD", "Max Towing Capacity": 4400, Notes: "Factory Class III hitch receiver with trailer stability control (3,500 lbs on earlier generations)." }
    ]
  },

  // ==========================================
  // LEXUS
  // ==========================================
  {
    make: "Lexus",
    model: "GX",
    years: [2003, 2026],
    getTrims: (year) => {
      if (year <= 2009) {
        return [
          { TrimName: "GX 470 (4.7L V8 Factory Tow Package)", Engine: "4.7L 2UZ-FE V8 (235–263 hp / 320–323 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 6500, Notes: "Body-on-frame platform with Class IV receiver hitch, transmission cooler, and rear air suspension." }
        ];
      }
      if (year <= 2023) {
        return [
          { TrimName: "GX 460 (4.6L V8 Factory Tow Package)", Engine: "4.6L 1UR-FE V8 (301 hp / 329 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 6500, Notes: "Class IV hitch with trailer sway control standard on premium/luxury trims." }
        ];
      }
      // 2024+ (GX 550)
      return [
        { TrimName: "GX 550 (3.4L Twin-Turbo V6 Tow Package)", Engine: "3.4L Twin-Turbo V6 (349 hp / 479 lb-ft)", Transmission: "10-Speed Direct-Shift Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 9096, Notes: "Introduced in 2024: Class-leading midsize luxury body-on-frame towing up to 9,096 lbs (Overtrail trim)." }
      ];
    }
  },
  {
    make: "Lexus",
    model: "LX",
    years: [2000, 2026],
    getTrims: (year) => {
      if (year <= 2007) {
        return [
          { TrimName: "LX 470 (4.7L V8 Tow Package)", Engine: "4.7L 2UZ-FE V8 (230–268 hp)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 6500, Notes: "Land Cruiser luxury platform with Class IV hitch and height control." }
        ];
      }
      if (year <= 2021) {
        return [
          { TrimName: "LX 570 (5.7L V8 Tow Package)", Engine: "5.7L 3UR-FE V8 (383 hp / 403 lb-ft)", Transmission: "6-Speed / 8-Speed Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 7000, Notes: "Heavy-duty full-size luxury hauler with integrated trailer hitch." }
        ];
      }
      // 2022+ (LX 600)
      return [
        { TrimName: "LX 600 (3.4L Twin-Turbo V6 Tow Package)", Engine: "3.4L Twin-Turbo V6 (409 hp / 479 lb-ft)", Transmission: "10-Speed Direct-Shift Automatic", Drivetrain: "Full-Time 4WD", "Max Towing Capacity": 8000, Notes: "Class IV hitch with active height control and multi-terrain select." }
      ];
    }
  },
  {
    make: "Lexus",
    model: "RX",
    years: [2000, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Tow Prep Package)", Engine: "3.0L / 3.3L / 3.5L V6 / 2.4L Turbo (220–295 hp)", Transmission: "Automatic with Heavy-Duty Radiator & Cooler", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Tow Prep Package with heavy-duty radiator, transmission cooler, and engine oil cooler required for 3,500 lbs." }
    ]
  },

  // ==========================================
  // LINCOLN
  // ==========================================
  {
    make: "Lincoln",
    model: "Navigator",
    years: [2000, 2026],
    getTrims: (year) => {
      if (year <= 2014) {
        return [
          { TrimName: "Standard / Regular Model (5.4L 3V Triton V8 Heavy-Duty Tow Package)", Engine: "5.4L V8 (300–310 hp / 365 lb-ft)", Transmission: "6-Speed / 4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9000, Notes: "Class IV receiver hitch with heavy-duty cooling and rear load-leveling suspension." }
        ];
      }
      if (year <= 2017) {
        return [
          { TrimName: "Standard / Regular Model (3.5L EcoBoost Heavy-Duty Tow Package)", Engine: "3.5L Twin-Turbo V6 (380 hp / 460 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9000, Notes: "Heavy-duty trailer tow package with integrated trailer brake controller." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (3.5L Twin-Turbo V6 Heavy-Duty Tow Package)", Engine: "3.5L Twin-Turbo V6 (450 hp / 510 lb-ft)", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8700, Notes: "Heavy-Duty Trailer Tow Package with Pro Trailer Backup Assist and 3.73 axle ratio." },
        { TrimName: "Standard / Regular Model (Base Tow)", Engine: "3.5L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6200, Notes: "Standard towing without heavy-duty tow package." }
      ];
    }
  },

  // ==========================================
  // CADILLAC
  // ==========================================
  {
    make: "Cadillac",
    model: "Escalade",
    years: [2000, 2026],
    getTrims: (year) => {
      if (year <= 2006) {
        return [
          { TrimName: "Standard / Regular Model (6.0L / 5.3L Vortec V8 Tow Package)", Engine: "6.0L / 5.3L V8 (285–345 hp)", Transmission: "4-Speed Heavy-Duty Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 8100, Notes: "Class IV hitch with heavy-duty transmission fluid cooler." }
        ];
      }
      if (year <= 2014) {
        return [
          { TrimName: "Standard / Regular Model (6.2L Vortec V8 Heavy-Duty Tow Package)", Engine: "6.2L V8 (403 hp / 417 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 8300, Notes: "Heavy-duty cooling and integrated trailer brake controller." }
        ];
      }
      if (year <= 2020) {
        return [
          { TrimName: "Standard / Regular Model (6.2L EcoTec3 V8 Trailering Package)", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "8-Speed / 10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8300, Notes: "Class IV hitch with Magnetic Ride Control and 2-speed transfer case." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (6.2L V8 Heavy-Duty Trailering Package)", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8200, Notes: "Heavy-Duty Trailering Package with 2-speed transfer case and trailer tire pressure monitoring." },
        { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L Inline-6 Turbo-Diesel (277 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8000, Notes: "High efficiency diesel highway hauler." }
      ];
    }
  },

  // ==========================================
  // INFINITI
  // ==========================================
  {
    make: "Infiniti",
    model: "QX80",
    years: [2004, 2026],
    getTrims: (year) => {
      if (year <= 2010) {
        return [
          { TrimName: "QX56 (5.6L Endurance V8 Tow Package)", Engine: "5.6L V8 (315–320 hp / 390–393 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9000, Notes: "Class IV receiver hitch with auto-leveling rear suspension." }
        ];
      }
      if (year <= 2024) {
        return [
          { TrimName: "Standard / Regular Model (5.6L V8 Factory Tow Package)", Engine: "5.6L V8 (400 hp / 413 lb-ft)", Transmission: "7-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8500, Notes: "Class IV hitch with integrated trailer brake controller and hydraulic body motion control." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (3.5L Twin-Turbo V6 Tow Package)", Engine: "3.5L Twin-Turbo V6 (450 hp / 516 lb-ft)", Transmission: "9-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8500, Notes: "Introduced in 2025: All-new twin-turbo V6 with electronic air suspension." }
      ];
    }
  },
  {
    make: "Infiniti",
    model: "QX60",
    years: [2013, 2026],
    getTrims: (year) => {
      if (year <= 2021) {
        return [
          { TrimName: "Standard / Regular Model (3.5L V6 Factory Tow Package)", Engine: "3.5L V6 (265–295 hp)", Transmission: "CVT with Auxiliary Cooler", Drivetrain: "AWD / FWD", "Max Towing Capacity": 5000, Notes: "Factory hitch receiver and transmission fluid cooler." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Factory Tow Package)", Engine: "3.5L V6 (295 hp / 270 lb-ft)", Transmission: "9-Speed Automatic with Transmission Cooler", Drivetrain: "AWD", "Max Towing Capacity": 6000, Notes: "Class III hitch rating with 9-speed automatic and trailer sway control." },
        { TrimName: "Standard / Regular Model (Base Tow)", Engine: "3.5L V6", Transmission: "9-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Standard front-wheel drive rating." }
      ];
    }
  },

  // ==========================================
  // MERCEDES-BENZ
  // ==========================================
  {
    make: "Mercedes-Benz",
    model: "GLE",
    years: [2000, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "3.2L / 3.5L / 4.7L / 3.0L Turbo (215–385 hp)", Transmission: "Automatic with 4MATIC AWD", Drivetrain: "4MATIC AWD", "Max Towing Capacity": 7700, Notes: "Factory Class III/IV receiver hitch with Trailer Stability Assist." }
    ]
  },
  {
    make: "Mercedes-Benz",
    model: "GLS",
    years: [2007, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "4.7L / 5.5L / 3.0L Turbo / 4.0L V8 (335–510 hp)", Transmission: "Automatic with 4MATIC", Drivetrain: "4MATIC AWD", "Max Towing Capacity": 7700, Notes: "Factory Class IV hitch with AIRMATIC air suspension and Crosswind Assist." }
    ]
  },

  // ==========================================
  // VOLVO
  // ==========================================
  {
    make: "Volvo",
    model: "XC90",
    years: [2003, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "2.5T / 3.2L / 4.4L V8 / 2.0L Turbo (208–316 hp)", Transmission: "Automatic with AWD", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Factory Class III 2-inch receiver hitch with trailer stability assist (4,000 lbs on first generation)." }
    ]
  },

  // ==========================================
  // PORSCHE
  // ==========================================
  {
    make: "Porsche",
    model: "Cayenne",
    years: [2003, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "3.2L / 3.6L / 4.5L / 4.8L / 3.0L Turbo V6 (247–550 hp)", Transmission: "Tiptronic S Automatic", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 7716, Notes: "Class-leading unibody towing capacity (3,500 kg / 7,716 lbs) with factory tow package." }
    ]
  },

  // ==========================================
  // LAND ROVER
  // ==========================================
  {
    make: "Land Rover",
    model: "Range Rover",
    years: [2000, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "4.6L / 4.4L / 5.0L Supercharged / 3.0L Turbo", Transmission: "Automatic with Heavy-Duty 4WD", Drivetrain: "4WD", "Max Towing Capacity": 7716, Notes: "Class IV hitch with electronic air suspension and trailer reverse park assist." }
    ]
  },
  {
    make: "Land Rover",
    model: "Discovery",
    years: [2000, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "4.0L / 4.4L / 5.0L V8 / 3.0L Turbo", Transmission: "Automatic with 4WD", Drivetrain: "4WD", "Max Towing Capacity": 7716, Notes: "Heavy-duty all-terrain towing capacity with terrain response." }
    ]
  },

  // ==========================================
  // KIA
  // ==========================================
  {
    make: "Kia",
    model: "Sorento",
    years: [2003, 2026],
    getTrims: (year) => {
      if (year <= 2009) {
        return [
          { TrimName: "Standard / Regular Model (3.5L / 3.8L V6 Tow Package)", Engine: "3.5L / 3.8L V6 (192–262 hp)", Transmission: "5-Speed Automatic with Low Range", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Body-on-frame platform with Class III receiver hitch." }
        ];
      }
      return [
        { TrimName: "Standard / Regular Model (V6 / 2.5L Turbo Factory Tow Package)", Engine: "3.3L V6 / 2.5L Turbo I-4 (281–290 hp)", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 4500, Notes: "X-Line / X-Pro trim rated up to 4,500 lbs (3,500 lbs standard)." },
        { TrimName: "Standard / Regular Model (Base 4-Cylinder)", Engine: "2.5L 4-Cylinder", Transmission: "Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 2000, Notes: "Standard 4-cylinder limit." }
      ];
    }
  },

  // ==========================================
  // BUICK
  // ==========================================
  {
    make: "Buick",
    model: "Enclave",
    years: [2008, 2026],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Trailering Package)", Engine: "3.6L V6 / 2.5L Turbo (288–328 hp)", Transmission: "9-Speed / 6-Speed Automatic with Heavy-Duty Cooling", Drivetrain: "AWD / FWD", "Max Towing Capacity": 5000, Notes: "Factory trailering package with heavy-duty cooling system and hitch receiver." }
    ]
  },

  // ==========================================
  // MAZDA
  // ==========================================
  {
    make: "Mazda",
    model: "CX-9",
    years: [2007, 2023],
    getTrims: (year) => [
      { TrimName: "Standard / Regular Model (Factory Tow Package)", Engine: "3.5L / 3.7L V6 / 2.5L Turbo (250–273 hp)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Factory Class II receiver hitch with transmission cooler." }
    ]
  }
];

async function populateAllBrands() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  // 1. Fix typos / casing in existing records
  console.log("Cleaning up brand typos / casing in existing records...");
  const volksResult = await col.updateMany({ Make: "Volkswagon" }, { $set: { Make: "Volkswagen" } });
  if (volksResult.modifiedCount > 0) {
    console.log(`  ✓ Converted ${volksResult.modifiedCount} 'Volkswagon' records to 'Volkswagen'.`);
  }

  const ramResult = await col.updateMany({ Make: "Ram" }, { $set: { Make: "RAM" } });
  if (ramResult.modifiedCount > 0) {
    console.log(`  ✓ Unified ${ramResult.modifiedCount} 'Ram' records to 'RAM'.`);
  }

  // 2. Iterate through each brand expansion and populate missing years
  console.log("\nPopulating missing brand years across 2000-2026...");
  let addedCount = 0;
  let updatedCount = 0;

  for (const expansion of BRAND_EXPANSIONS) {
    const [startYear, endYear] = expansion.years;
    for (let y = startYear; y <= endYear; y++) {
      const trims = expansion.getTrims(y);
      if (!trims) continue; // Model did not exist in this year

      // Check if document already exists for this exact Make, Model, and Year
      const existing = await col.findOne({
        Year: y,
        Make: expansion.make,
        Model: expansion.model,
      });

      if (!existing) {
        await col.insertOne({
          Year: y,
          Make: expansion.make,
          Model: expansion.model,
          Trim: trims,
        });
        addedCount++;
      } else {
        // Ensure trims are generation-accurate
        await col.updateOne(
          { _id: existing._id },
          { $set: { Trim: trims } }
        );
        updatedCount++;
      }
    }
  }

  console.log(`\n==============================================`);
  console.log(`Brand Population Complete:`);
  console.log(`  Added new brand year documents: ${addedCount}`);
  console.log(`  Updated existing records: ${updatedCount}`);
  console.log(`==============================================\n`);

  const total = await col.countDocuments({});
  console.log(`Total valid documents now in MongoDB capacities: ${total}`);

  await mongoose.disconnect();
}

populateAllBrands().catch(console.error);
