import { Vehicles } from "@/app/lib/Types";

/**
 * Comprehensive embedded serverless vehicle towing database (2015–2024).
 * Covers North America's most popular full-size and mid-size trucks, heavy-duty trucks,
 * 3-row SUVs, crossovers, luxury haulers, and modern electric towing vehicles.
 */
const BASE_VEHICLES: Vehicles[] = [
  // ==========================================
  // FORD TRUCKS & SUVS (2015–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Ford",
    Model: "F-150",
    Trim: [
      {
        TrimName: "3.5L EcoBoost V-6 Max Trailer Tow",
        Engine: "3.5L EcoBoost Twin-Turbo V6 (400 hp / 500 lb-ft)",
        Transmission: "10-Speed SelectShift Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 13500,
        Notes: "Class-leading conventional towing with Max Trailer Tow Package, 3.73 rear axle, and 20-inch wheels.",
      },
      {
        TrimName: "5.0L Ti-VCT V-8",
        Engine: "5.0L Coyote V8 (400 hp / 410 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 13000,
        Notes: "Equipped with Heavy-Duty Payload Package and trailer brake controller.",
      },
      {
        TrimName: "3.5L PowerBoost Full Hybrid V-6",
        Engine: "3.5L PowerBoost Turbo Hybrid (430 hp / 570 lb-ft)",
        Transmission: "10-Speed Hybrid Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 12700,
        Notes: "Includes 7.2 kW Pro Power Onboard mobile power plant in truck bed.",
      },
      {
        TrimName: "2.7L EcoBoost V-6",
        Engine: "2.7L EcoBoost Twin-Turbo V6 (325 hp / 400 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "RWD / 4WD",
        "Max Towing Capacity": 10100,
        Notes: "Standard trailer tow package.",
      },
      {
        TrimName: "F-150 Lightning (Extended Range Battery)",
        Engine: "Dual Electric Motors (580 hp / 775 lb-ft)",
        Transmission: "Single-Speed Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 10000,
        Notes: "Requires Max Trailer Tow Package on XLT and Lariat trims.",
      },
      {
        TrimName: "F-150 Lightning (Standard Range Battery)",
        Engine: "Dual Electric Motors (452 hp / 775 lb-ft)",
        Transmission: "Single-Speed Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 7700,
        Notes: "Standard battery pack with Class IV hitch receiver.",
      },
    ],
  },
  {
    Year: 2023,
    Make: "Ford",
    Model: "F-150",
    Trim: [
      {
        TrimName: "3.5L EcoBoost V-6 Max Tow",
        Engine: "3.5L EcoBoost V6 (400 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 14000,
        Notes: "SuperCrew or SuperCab 8-ft bed configuration with Max Trailer Tow.",
      },
      {
        TrimName: "5.0L V-8 Tow Package",
        Engine: "5.0L V8 (400 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 13000,
        Notes: "Class IV hitch receiver and trailer brake controller.",
      },
      {
        TrimName: "Raptor 3.5L High-Output V-6",
        Engine: "3.5L Twin-Turbo EcoBoost (450 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 8200,
        Notes: "Off-road long travel Fox Live Valve shocks tuned for desert running.",
      },
    ],
  },
  {
    Year: 2021,
    Make: "Ford",
    Model: "F-150",
    Trim: [
      {
        TrimName: "3.5L EcoBoost V-6 Max Tow",
        Engine: "3.5L EcoBoost V6 (400 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 14000,
        Notes: "Class-leading 14,000 lbs conventional rating.",
      },
      {
        TrimName: "5.0L Coyote V-8",
        Engine: "5.0L V8 (400 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 13000,
        Notes: "Standard trailer tow package.",
      },
    ],
  },
  {
    Year: 2018,
    Make: "Ford",
    Model: "F-150",
    Trim: [
      {
        TrimName: "3.5L EcoBoost V-6 Max Trailer Tow",
        Engine: "3.5L Twin-Turbo V6 (375 hp / 470 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 13200,
        Notes: "SuperCrew with 20-inch wheels and Max Trailer Tow Package.",
      },
      {
        TrimName: "5.0L V-8 (3.73 Axle)",
        Engine: "5.0L V8 (395 hp / 400 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11600,
        Notes: "Tow package with heavy duty cooling.",
      },
      {
        TrimName: "2.7L EcoBoost V-6",
        Engine: "2.7L Twin-Turbo V6 (325 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "RWD / 4WD",
        "Max Towing Capacity": 9000,
        Notes: "Mid-level trailer tow package.",
      },
    ],
  },
  {
    Year: 2016,
    Make: "Ford",
    Model: "F-150",
    Trim: [
      {
        TrimName: "3.5L EcoBoost V-6 Max Tow",
        Engine: "3.5L EcoBoost V6 (365 hp / 420 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 12200,
        Notes: "First generation aluminum body with Max Trailer Tow.",
      },
      {
        TrimName: "5.0L V-8",
        Engine: "5.0L V8 (385 hp / 387 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11100,
        Notes: "Regular and SuperCab 4x4 configurations.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "F-250 Super Duty",
    Trim: [
      {
        TrimName: "6.7L High Output Power Stroke Turbo Diesel",
        Engine: "6.7L Power Stroke V8 Turbo Diesel (500 hp / 1,200 lb-ft)",
        Transmission: "TorqShift 10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 22000,
        Notes: "Conventional towing limit. Gooseneck / 5th-wheel capability reaches 23,000 lbs.",
      },
      {
        TrimName: "7.3L Godzilla V-8 Gas",
        Engine: "7.3L OHV V8 Gas (430 hp / 485 lb-ft)",
        Transmission: "TorqShift 10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 17200,
        Notes: "Gas heavy duty rating with 4.30 axle ratio.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "Expedition",
    Trim: [
      {
        TrimName: "Heavy-Duty Trailer Tow Package (3.5L EcoBoost)",
        Engine: "3.5L EcoBoost Twin-Turbo V6 (380-440 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 9300,
        Notes: "Features Pro Trailer Backup Assist 2.0, 3.73 e-LSD, and integrated brake controller.",
      },
      {
        TrimName: "Expedition MAX (Extended Length)",
        Engine: "3.5L EcoBoost V6 (400 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9000,
        Notes: "Long wheelbase version with heavy-duty cooling.",
      },
      {
        TrimName: "Standard Class IV (Without Heavy-Duty Tow)",
        Engine: "3.5L EcoBoost V6 (380 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6000,
        Notes: "Factory standard rating without auxiliary transmission cooler.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "Ford",
    Model: "Expedition",
    Trim: [
      {
        TrimName: "Heavy-Duty Trailer Tow Package (3.5L EcoBoost)",
        Engine: "3.5L Twin-Turbo EcoBoost V6 (375 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD / 4WD",
        "Max Towing Capacity": 9300,
        Notes: "2WD rated at 9,300 lbs; 4WD rated at 9,200 lbs.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "Explorer",
    Trim: [
      {
        TrimName: "Class IV Trailer Tow (3.0L EcoBoost ST / Platinum)",
        Engine: "3.0L Twin-Turbo EcoBoost V6 (400 hp / 415 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 5600,
        Notes: "Explorer ST with standard Class IV hitch and sport-tuned suspension.",
      },
      {
        TrimName: "Class IV Trailer Tow (2.3L EcoBoost)",
        Engine: "2.3L Turbo I-4 (300 hp / 310 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 5300,
        Notes: "XLT and Limited with factory Class IV hitch package.",
      },
    ],
  },
  {
    Year: 2018,
    Make: "Ford",
    Model: "Explorer",
    Trim: [
      {
        TrimName: "Class III Trailer Tow (3.5L EcoBoost Twin-Turbo)",
        Engine: "3.5L Twin-Turbo V6 (365 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 5000,
        Notes: "Explorer Sport and Platinum models.",
      },
      {
        TrimName: "Class III Trailer Tow (3.5L Ti-VCT V-6)",
        Engine: "3.5L V6 (290 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD / FWD",
        "Max Towing Capacity": 5000,
        Notes: "Factory tow package with oil cooler.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "Bronco",
    Trim: [
      {
        TrimName: "Bronco Raptor (3.0L EcoBoost V-6)",
        Engine: "3.0L Twin-Turbo EcoBoost V6 (418 hp / 440 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 4500,
        Notes: "Reinforced frame and Fox Live Valve 3.1 dampers yield 4,500 lbs limit.",
      },
      {
        TrimName: "4-Door Standard (2.7L / 2.3L EcoBoost)",
        Engine: "2.7L or 2.3L EcoBoost",
        Transmission: "10-Speed Automatic / 7-Speed Manual",
        Drivetrain: "4WD",
        "Max Towing Capacity": 3500,
        Notes: "Class II trailer hitch with 4-pin wiring connector.",
      },
      {
        TrimName: "2-Door Standard",
        Engine: "2.3L or 2.7L EcoBoost",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 3500,
        Notes: "Short wheelbase limits high-speed towing stability.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "Ranger",
    Trim: [
      {
        TrimName: "Trailer Tow Package (2.7L EcoBoost / 2.3L I-4)",
        Engine: "2.3L or 2.7L EcoBoost",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7500,
        Notes: "Includes Class IV receiver hitch and 4/7-pin connector.",
      },
      {
        TrimName: "Ranger Raptor (3.0L EcoBoost)",
        Engine: "3.0L Twin-Turbo EcoBoost V6 (405 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 5510,
        Notes: "Watts link rear suspension limits max tow rating compared to leaf spring models.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Ford",
    Model: "Maverick",
    Trim: [
      {
        TrimName: "4K Tow Package (2.0L EcoBoost AWD)",
        Engine: "2.0L EcoBoost Turbo I-4 (250 hp / 277 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 4000,
        Notes: "Requires 4K Tow Package (upgraded radiator, transmission cooler, lower axle gearing, trailer brake controller).",
      },
      {
        TrimName: "2.5L Hybrid (Standard)",
        Engine: "2.5L Atkinson 4-Cylinder Hybrid (191 hp)",
        Transmission: "e-CVT",
        Drivetrain: "FWD",
        "Max Towing Capacity": 2000,
        Notes: "Standard light utility rating for utility trailers or jet skis.",
      },
    ],
  },

  // ==========================================
  // CHEVROLET TRUCKS & SUVS (2015–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Silverado 1500",
    Trim: [
      {
        TrimName: "6.2L EcoTec3 V-8 Max Trailering",
        Engine: "6.2L V8 (420 hp / 460 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 13300,
        Notes: "Max Trailering Package, 3.42 axle ratio, heavy-duty rear springs, and 20-inch wheels.",
      },
      {
        TrimName: "3.0L Duramax Turbo-Diesel I-6",
        Engine: "3.0L LZ0 Duramax Inline-6 Turbo Diesel (305 hp / 495 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD / 4WD",
        "Max Towing Capacity": 13300,
        Notes: "Exceptional towing fuel economy and massive 495 lb-ft low-RPM torque.",
      },
      {
        TrimName: "5.3L EcoTec3 V-8 Trailering Package",
        Engine: "5.3L V8 (355 hp / 383 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11300,
        Notes: "Standard trailer tow package with integrated brake controller.",
      },
      {
        TrimName: "TurboMax 2.7L High-Output I-4",
        Engine: "2.7L Turbo High-Output I-4 (310 hp / 430 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9500,
        Notes: "Generates 430 lb-ft of torque at just 1,500 RPM.",
      },
      {
        TrimName: "Silverado EV (Work Truck / RST)",
        Engine: "Dual Ultium Electric Motors (Up to 754 hp / 785 lb-ft)",
        Transmission: "Single-Speed Direct Drive",
        Drivetrain: "e4WD",
        "Max Towing Capacity": 10000,
        Notes: "Air suspension with four-wheel steer and 200 kWh battery pack.",
      },
    ],
  },
  {
    Year: 2021,
    Make: "Chevrolet",
    Model: "Silverado 1500",
    Trim: [
      {
        TrimName: "6.2L V-8 Max Trailering Package",
        Engine: "6.2L EcoTec3 V8 (420 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 13300,
        Notes: "Requires Max Trailering package with enhanced cooling.",
      },
      {
        TrimName: "5.3L V-8 Trailering Package",
        Engine: "5.3L V8 (355 hp)",
        Transmission: "8-Speed / 10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11500,
        Notes: "Double Cab or Crew Cab with 3.42 axle ratio.",
      },
      {
        TrimName: "3.0L Duramax Diesel",
        Engine: "3.0L Turbo Diesel I-6 (277 hp / 460 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9500,
        Notes: "First generation LM2 Duramax engine.",
      },
    ],
  },
  {
    Year: 2017,
    Make: "Chevrolet",
    Model: "Silverado 1500",
    Trim: [
      {
        TrimName: "6.2L V-8 Max Trailering",
        Engine: "6.2L EcoTec3 V8 (420 hp / 460 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 12500,
        Notes: "Double Cab 4x4 with Max Trailering Package and 3.42 rear axle.",
      },
      {
        TrimName: "5.3L V-8 Trailering Package",
        Engine: "5.3L V8 (355 hp / 383 lb-ft)",
        Transmission: "6-Speed / 8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11100,
        Notes: "With factory hitch and integrated trailer brake controller.",
      },
      {
        TrimName: "4.3L EcoTec3 V-6",
        Engine: "4.3L V6 (285 hp / 305 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "RWD / 4WD",
        "Max Towing Capacity": 7600,
        Notes: "Standard entry V6 towing configuration.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Silverado 2500HD",
    Trim: [
      {
        TrimName: "6.6L Duramax Turbo-Diesel V-8",
        Engine: "6.6L Duramax Turbo-Diesel V8 (470 hp / 975 lb-ft)",
        Transmission: "Allison 10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 22500,
        Notes: "Conventional towing limit. Max 5th-wheel/gooseneck reaches 22,500 lbs on 2500HD.",
      },
      {
        TrimName: "6.6L Gas V-8",
        Engine: "6.6L OHV V8 Gas (401 hp / 464 lb-ft)",
        Transmission: "Allison 10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 18700,
        Notes: "Paired with Allison 10-speed transmission for 2024+.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Tahoe",
    Trim: [
      {
        TrimName: "Max Trailering Package (5.3L / 6.2L V-8 2WD)",
        Engine: "5.3L or 6.2L EcoTec3 V8",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD",
        "Max Towing Capacity": 8400,
        Notes: "8,400 lbs for 2WD 5.3L; 8,200 lbs for 4WD 5.3L; 8,300 lbs for 2WD 6.2L; 8,100 lbs for 4WD 6.2L.",
      },
      {
        TrimName: "3.0L Duramax Turbo-Diesel",
        Engine: "3.0L Duramax Diesel I-6 (305 hp / 495 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD / 4WD",
        "Max Towing Capacity": 8200,
        Notes: "High torque low-RPM towing with enhanced cooling.",
      },
      {
        TrimName: "Standard Trailering (Without Max Trailering)",
        Engine: "5.3L V8",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7700,
        Notes: "Factory standard hitch without 2-speed transfer case or heavy-duty radiator.",
      },
    ],
  },
  {
    Year: 2018,
    Make: "Chevrolet",
    Model: "Tahoe",
    Trim: [
      {
        TrimName: "Max Trailering Package (5.3L V-8 2WD)",
        Engine: "5.3L EcoTec3 V8 (355 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "2WD",
        "Max Towing Capacity": 8600,
        Notes: "8,600 lbs 2WD; 8,400 lbs 4WD with 3.42 axle ratio and auxiliary cooler.",
      },
      {
        TrimName: "Tahoe Premier 6.2L V-8",
        Engine: "6.2L EcoTec3 V8 (420 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 8100,
        Notes: "RST 6.2L Performance Edition.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Suburban",
    Trim: [
      {
        TrimName: "Max Trailering Package (5.3L V-8 2WD)",
        Engine: "5.3L EcoTec3 V8",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD",
        "Max Towing Capacity": 8300,
        Notes: "8,200 lbs on 4WD 5.3L; 8,100 lbs on 6.2L V8.",
      },
      {
        TrimName: "Standard Equipment (Without Max Trailering)",
        Engine: "5.3L V8",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7600,
        Notes: "Standard factory equipment rating.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Colorado",
    Trim: [
      {
        TrimName: "2.7L Turbo Plus / Turbo High-Output",
        Engine: "2.7L Turbocharged I-4 (310 hp / 391-430 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 7700,
        Notes: "Class-leading midsize pickup capacity with Trailering Package.",
      },
      {
        TrimName: "Colorado ZR2",
        Engine: "2.7L Turbo High-Output (430 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6000,
        Notes: "Multimatic DSSV spool-valve dampers alter capacity.",
      },
    ],
  },
  {
    Year: 2018,
    Make: "Chevrolet",
    Model: "Colorado",
    Trim: [
      {
        TrimName: "2.8L Duramax Turbo-Diesel",
        Engine: "2.8L 4-Cylinder Turbo Diesel (181 hp / 369 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD / 2WD",
        "Max Towing Capacity": 7700,
        Notes: "Includes exhaust brake and integrated trailer brake controller.",
      },
      {
        TrimName: "3.6L V-6 Trailering Package",
        Engine: "3.6L DOHC V6 (308 hp / 275 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / 2WD",
        "Max Towing Capacity": 7000,
        Notes: "Standard V6 towing package.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Chevrolet",
    Model: "Traverse",
    Trim: [
      {
        TrimName: "Factory Trailering Package (2.5L Turbo I-4)",
        Engine: "2.5L Turbocharged Inline-4 (328 hp / 326 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD / FWD",
        "Max Towing Capacity": 5000,
        Notes: "Standard 5,000 lbs on Z71 trim with twin-clutch AWD.",
      },
      {
        TrimName: "Base Model (Without Trailering Package)",
        Engine: "2.5L Turbo I-4",
        Transmission: "8-Speed Automatic",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1500,
        Notes: "Standard light utility rating.",
      },
    ],
  },

  // ==========================================
  // RAM TRUCKS (2015–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "RAM",
    Model: "1500",
    Trim: [
      {
        TrimName: "5.7L HEMI V-8 with eTorque (3.92 Axle)",
        Engine: "5.7L HEMI V8 eTorque Mild Hybrid (395 hp / 410 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "RWD / 4WD",
        "Max Towing Capacity": 12750,
        Notes: "Max Tow Package in Quad Cab 4x2 with 3.92 axle ratio.",
      },
      {
        TrimName: "5.7L HEMI V-8 (3.21 Highway Axle)",
        Engine: "5.7L HEMI V8 (395 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 8420,
        Notes: "Standard 3.21 axle ratio optimizes highway mileage over towing capacity.",
      },
      {
        TrimName: "3.6L Pentastar V-6 with eTorque",
        Engine: "3.6L Pentastar V6 (305 hp / 269 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7730,
        Notes: "Great balance of fuel economy and medium trailer hauling.",
      },
      {
        TrimName: "1500 TRX 6.2L Supercharged HEMI",
        Engine: "6.2L Supercharged HEMI V8 (702 hp / 650 lb-ft)",
        Transmission: "8-Speed Heavy-Duty Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 8100,
        Notes: "Final edition supercharged truck with Bilstein Black Hawk e2 dampers.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "RAM",
    Model: "1500",
    Trim: [
      {
        TrimName: "3.0L EcoDiesel V-6",
        Engine: "3.0L EcoDiesel V6 (260 hp / 480 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 12560,
        Notes: "Class-leading half-ton diesel towing capacity with 480 lb-ft of torque.",
      },
      {
        TrimName: "5.7L HEMI V-8 (3.92 Axle)",
        Engine: "5.7L HEMI V8 (395 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 12750,
        Notes: "Equipped with factory Class IV hitch and 3.92 rear differential.",
      },
    ],
  },
  {
    Year: 2016,
    Make: "RAM",
    Model: "1500",
    Trim: [
      {
        TrimName: "5.7L HEMI V-8 (3.92 Axle)",
        Engine: "5.7L HEMI V8 (395 hp / 410 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 10650,
        Notes: "Regular Cab 4x2 8-ft bed.",
      },
      {
        TrimName: "3.0L EcoDiesel V-6",
        Engine: "3.0L EcoDiesel (240 hp / 420 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9290,
        Notes: "High efficiency diesel.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "RAM",
    Model: "2500",
    Trim: [
      {
        TrimName: "6.7L Cummins Turbo Diesel",
        Engine: "6.7L Inline-6 Cummins Turbo Diesel (370 hp / 850 lb-ft)",
        Transmission: "6-Speed Heavy Duty Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 19980,
        Notes: "Conventional towing rating with factory rear auto-level air suspension.",
      },
      {
        TrimName: "6.4L Heavy-Duty HEMI V-8",
        Engine: "6.4L HEMI V8 (410 hp / 429 lb-ft)",
        Transmission: "8-Speed Heavy Duty Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 17730,
        Notes: "Heavy duty gas capability.",
      },
    ],
  },

  // ==========================================
  // TOYOTA TRUCKS & SUVS (2015–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Tundra",
    Trim: [
      {
        TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid (SR5 / Limited)",
        Engine: "3.4L Twin-Turbo V6 Hybrid (437 hp / 583 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 12000,
        Notes: "SR5, Limited, Platinum with Tow Package and integrated trailer brake controller.",
      },
      {
        TrimName: "i-FORCE 3.4L Twin-Turbo V-6 (Gas)",
        Engine: "3.4L Twin-Turbo V6 (389 hp / 479 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "RWD",
        "Max Towing Capacity": 12000,
        Notes: "Double Cab 6.5ft bed with Tow Package.",
      },
      {
        TrimName: "TRD Pro (i-FORCE MAX Hybrid)",
        Engine: "3.4L Twin-Turbo Hybrid (437 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 11175,
        Notes: "FOX internal bypass coilovers slightly reduce capacity.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "Toyota",
    Model: "Tundra",
    Trim: [
      {
        TrimName: "5.7L i-FORCE V-8 Tow Package",
        Engine: "5.7L 32-Valve DOHC V8 (381 hp / 401 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "RWD / 4WD",
        "Max Towing Capacity": 10200,
        Notes: "Legendary bulletproof 5.7L 3UR-FE engine with heavy-duty engine oil and transmission coolers.",
      },
      {
        TrimName: "TRD Pro 5.7L V-8",
        Engine: "5.7L V8 (381 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9200,
        Notes: "With factory tuned dual exhaust and Fox shocks.",
      },
    ],
  },
  {
    Year: 2016,
    Make: "Toyota",
    Model: "Tundra",
    Trim: [
      {
        TrimName: "5.7L V-8 Tow Package",
        Engine: "5.7L V8 (381 hp / 401 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 10500,
        Notes: "Regular Cab 4x2 with 4.30 axle ratio.",
      },
      {
        TrimName: "4.6L V-8",
        Engine: "4.6L V8 (310 hp / 327 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6800,
        Notes: "Standard entry V8.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Tacoma",
    Trim: [
      {
        TrimName: "i-FORCE 2.4L Turbocharged I-4",
        Engine: "2.4L Turbo I-4 (278 hp / 317 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 6500,
        Notes: "SR5, TRD Sport, and TRD Off-Road with tow prep package.",
      },
      {
        TrimName: "i-FORCE MAX 2.4L Hybrid",
        Engine: "2.4L Turbo Hybrid (326 hp / 465 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6000,
        Notes: "Trailhunter and TRD Pro hybrid battery placement adjusts tow rating to 6,000 lbs.",
      },
    ],
  },
  {
    Year: 2021,
    Make: "Toyota",
    Model: "Tacoma",
    Trim: [
      {
        TrimName: "3.5L V-6 with Tow Package",
        Engine: "3.5L V6 (278 hp / 265 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 6800,
        Notes: "Access Cab 4x2; Double Cab models rated up to 6,400–6,700 lbs with factory receiver hitch.",
      },
      {
        TrimName: "2.7L 4-Cylinder",
        Engine: "2.7L I-4 (159 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "RWD",
        "Max Towing Capacity": 3500,
        Notes: "Bumper ball hitch rating without auxiliary engine oil cooler.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Sequoia",
    Trim: [
      {
        TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid (SR5 2WD)",
        Engine: "3.4L Twin-Turbo Hybrid V6 (437 hp / 583 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "2WD",
        "Max Towing Capacity": 9520,
        Notes: "Class-leading full-size SUV towing capacity with factory tow hitch.",
      },
      {
        TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid (Limited/Platinum 4WD)",
        Engine: "3.4L Twin-Turbo Hybrid V6",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 9010,
        Notes: "Includes Load-Leveling Rear Air Suspension and Adaptive Variable Suspension.",
      },
    ],
  },
  {
    Year: 2019,
    Make: "Toyota",
    Model: "Sequoia",
    Trim: [
      {
        TrimName: "5.7L V-8 (All Trims with Tow Package)",
        Engine: "5.7L V8 (381 hp / 401 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "2WD / 4WD",
        "Max Towing Capacity": 7400,
        Notes: "2WD rated at 7,400 lbs; 4WD rated at 7,100 lbs with factory hitch and transmission cooler.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Toyota",
    Model: "4Runner",
    Trim: [
      {
        TrimName: "4.0L V-6 (All Trims)",
        Engine: "4.0L DOHC V6 (270 hp / 278 lb-ft)",
        Transmission: "5-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 5000,
        Notes: "Consistent 5,000 lb rating across SR5, TRD Off-Road, Limited, and TRD Pro with standard integrated receiver hitch.",
      },
    ],
  },
  {
    Year: 2018,
    Make: "Toyota",
    Model: "4Runner",
    Trim: [
      {
        TrimName: "4.0L V-6 (All Trims)",
        Engine: "4.0L V6 (270 hp)",
        Transmission: "5-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 5000,
        Notes: "Full frame construction with integrated hitch receiver.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Land Cruiser",
    Trim: [
      {
        TrimName: "i-FORCE MAX 2.4L Turbo Hybrid",
        Engine: "2.4L Turbo Hybrid (326 hp / 465 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "Full-Time 4WD",
        "Max Towing Capacity": 6000,
        Notes: "TNGA-F truck platform with integrated hitch and trailer brake controller.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "Toyota",
    Model: "Land Cruiser",
    Trim: [
      {
        TrimName: "200 Series 5.7L V-8",
        Engine: "5.7L V8 (381 hp / 401 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "Full-Time 4WD",
        "Max Towing Capacity": 8100,
        Notes: "Heritage Edition and standard 200 Series with factory integrated Class IV tow hitch.",
      },
    ],
  },

  // ==========================================
  // JEEP & DODGE (2015–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Jeep",
    Model: "Grand Cherokee",
    Trim: [
      {
        TrimName: "5.7L HEMI V-8 (Trailer Tow Package)",
        Engine: "5.7L HEMI V8 (357 hp / 390 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7200,
        Notes: "Best-in-class midsize SUV towing with Quadra-Lift air suspension.",
      },
      {
        TrimName: "3.6L Pentastar V-6 (Trailer Tow Package)",
        Engine: "3.6L V6 (293 hp / 260 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 6200,
        Notes: "Includes Class IV receiver, 4- and 7-pin harness, and full-size spare.",
      },
      {
        TrimName: "4xe 2.0L Turbo Plug-In Hybrid",
        Engine: "2.0L Turbo Hybrid (375 hp / 470 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6000,
        Notes: "Instant electric torque assists trailer launch.",
      },
    ],
  },
  {
    Year: 2019,
    Make: "Jeep",
    Model: "Grand Cherokee",
    Trim: [
      {
        TrimName: "5.7L HEMI V-8",
        Engine: "5.7L V8 (360 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7200,
        Notes: "With factory Class IV hitch.",
      },
      {
        TrimName: "3.0L EcoDiesel V-6",
        Engine: "3.0L EcoDiesel (240 hp / 420 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7400,
        Notes: "Highest towing capacity for WK2 generation.",
      },
      {
        TrimName: "3.6L Pentastar V-6",
        Engine: "3.6L V6 (295 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 6200,
        Notes: "Standard V6 with tow package.",
      },
      {
        TrimName: "Grand Cherokee Trackhawk 6.2L Supercharged",
        Engine: "6.2L Supercharged Hellcat V8 (707 hp / 645 lb-ft)",
        Transmission: "8-Speed Heavy Duty Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 7200,
        Notes: "World's fastest production tow vehicle.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Jeep",
    Model: "Wagoneer / Grand Wagoneer",
    Trim: [
      {
        TrimName: "Heavy-Duty Trailer Tow Package (Hurricane Twin-Turbo I-6)",
        Engine: "3.0L Hurricane Twin-Turbo Inline-6 (420-510 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 10000,
        Notes: "Best-in-class full-size luxury SUV towing rating (10,000 lbs).",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Dodge",
    Model: "Durango",
    Trim: [
      {
        TrimName: "SRT Hellcat / SRT 392 (Tow N Go Package)",
        Engine: "6.2L Supercharged (710 hp) or 6.4L 392 HEMI (475 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 8700,
        Notes: "Class-leading 3-row crossover towing capacity (8,700 lbs) with Brembo brakes and active damping.",
      },
      {
        TrimName: "R/T 5.7L HEMI (Tow N Go Package)",
        Engine: "5.7L HEMI V8 (360 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 8700,
        Notes: "Includes SRT drive modes, Bilstein dampers, and electronic limited-slip differential.",
      },
      {
        TrimName: "3.6L Pentastar V-6",
        Engine: "3.6L V6 (295 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD / RWD",
        "Max Towing Capacity": 6200,
        Notes: "With factory Class IV hitch receiver.",
      },
    ],
  },

  // ==========================================
  // ELECTRIC TOWING VEHICLES (RIVIAN, TESLA, FORD)
  // ==========================================
  {
    Year: 2024,
    Make: "Rivian",
    Model: "R1T",
    Trim: [
      {
        TrimName: "Quad-Motor AWD / Performance Dual-Motor (Max Pack)",
        Engine: "Quad-Motor / Dual-Motor AWD (Up to 835 hp / 908 lb-ft)",
        Transmission: "Direct Drive Independent Motors",
        Drivetrain: "AWD",
        "Max Towing Capacity": 11000,
        Notes: "Class-leading electric truck capacity with air suspension, auto-leveling, and dedicated Tow Mode with range estimation.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Rivian",
    Model: "R1S",
    Trim: [
      {
        TrimName: "Dual-Motor / Quad-Motor AWD",
        Engine: "Electric Motors (Up to 835 hp)",
        Transmission: "Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 7700,
        Notes: "3-row electric SUV with 7,700 lbs towing capacity.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Tesla",
    Model: "Cybertruck",
    Trim: [
      {
        TrimName: "All-Wheel Drive / Cyberbeast",
        Engine: "Dual / Tri Electric Motors (600 - 845 hp)",
        Transmission: "Single-Speed Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 11000,
        Notes: "4-wheel steer and adaptive air suspension with up to 12 inches of travel.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Tesla",
    Model: "Model X",
    Trim: [
      {
        TrimName: "Long Range / Plaid (Factory Tow Package)",
        Engine: "Dual / Tri Motor AWD (Up to 1,020 hp)",
        Transmission: "Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 5000,
        Notes: "Includes Class III high-strength steel tow bar and Trailer Mode software.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Tesla",
    Model: "Model Y",
    Trim: [
      {
        TrimName: "Long Range / Performance (Tow Hitch Option)",
        Engine: "Dual Motor AWD",
        Transmission: "Direct Drive",
        Drivetrain: "AWD",
        "Max Towing Capacity": 3500,
        Notes: "Includes 2-inch receiver hitch and Trailer Mode brake management.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Kia",
    Model: "EV9",
    Trim: [
      {
        TrimName: "Land / GT-Line (Dual Motor AWD)",
        Engine: "Dual Electric Motors (379 hp / 516 lb-ft)",
        Transmission: "Direct Drive",
        Drivetrain: "e-AWD",
        "Max Towing Capacity": 5000,
        Notes: "3-row electric SUV with self-leveling rear suspension and 5,000 lbs towing capacity.",
      },
    ],
  },

  // ==========================================
  // HYUNDAI, KIA & MAZDA (2018–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Kia",
    Model: "Telluride",
    Trim: [
      {
        TrimName: "X-Pro (3.8L V-6 with Heavy-Duty Cooling)",
        Engine: "3.8L Lambda II V6 (291 hp / 262 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 5500,
        Notes: "X-Pro trim adds upgraded radiator fan and heavy-duty transmission cooler for 5,500 lbs.",
      },
      {
        TrimName: "Standard AWD / FWD (Tow Package)",
        Engine: "3.8L V6 (291 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD / FWD",
        "Max Towing Capacity": 5000,
        Notes: "Self-leveling rear suspension on EX and SX trims.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Hyundai",
    Model: "Palisade",
    Trim: [
      {
        TrimName: "3.8L V-6 (Factory Heavy-Duty Tow Package)",
        Engine: "3.8L Atkinson V6 (291 hp / 262 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "HTRAC AWD",
        "Max Towing Capacity": 5000,
        Notes: "Includes auto-leveling rear suspension and pre-wired harness.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Hyundai",
    Model: "Santa Cruz",
    Trim: [
      {
        TrimName: "2.5L Turbo AWD (Tow Package)",
        Engine: "2.5L Turbocharged Inline-4 (281 hp / 311 lb-ft)",
        Transmission: "8-Speed Wet Dual-Clutch",
        Drivetrain: "HTRAC AWD",
        "Max Towing Capacity": 5000,
        Notes: "Compact pickup with 5,000 lbs capacity and auto-leveling rear suspension.",
      },
      {
        TrimName: "2.5L Naturally Aspirated",
        Engine: "2.5L 4-Cylinder (191 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "FWD / AWD",
        "Max Towing Capacity": 3500,
        Notes: "Standard entry model.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Mazda",
    Model: "CX-90",
    Trim: [
      {
        TrimName: "e-SKYACTIV G 3.3L Turbo Inline-6 (Tow Package)",
        Engine: "3.3L Turbocharged Inline-6 (280-340 hp / 332-369 lb-ft)",
        Transmission: "8-Speed Multi-Plate Wet-Clutch Automatic",
        Drivetrain: "i-ACTIV AWD",
        "Max Towing Capacity": 5000,
        Notes: "Rear-biased AWD platform with dedicated Towing Drive Mode.",
      },
      {
        TrimName: "e-SKYACTIV PHEV (Plug-In Hybrid)",
        Engine: "2.5L 4-Cylinder + 68 kW Electric Motor (323 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "i-ACTIV AWD",
        "Max Towing Capacity": 3500,
        Notes: "Plug-in hybrid capacity.",
      },
    ],
  },

  // ==========================================
  // LEXUS & ACURA (2018–2024)
  // ==========================================
  {
    Year: 2024,
    Make: "Lexus",
    Model: "GX 550",
    Trim: [
      {
        TrimName: "3.4L Twin-Turbo V-6 (Overtrail / Premium)",
        Engine: "3.4L Twin-Turbo V6 (349 hp / 479 lb-ft)",
        Transmission: "10-Speed Direct-Shift Automatic",
        Drivetrain: "Full-Time 4WD with Torsen Differential",
        "Max Towing Capacity": 9063,
        Notes: "Class-leading luxury midsize SUV towing (up to 9,063 lbs on Premium and Overtrail).",
      },
    ],
  },
  {
    Year: 2021,
    Make: "Lexus",
    Model: "GX 460",
    Trim: [
      {
        TrimName: "4.6L V-8 (Tow Hitch Option)",
        Engine: "4.6L 32-Valve V8 (301 hp / 329 lb-ft)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "Full-Time 4WD",
        "Max Towing Capacity": 6500,
        Notes: "Body-on-frame platform with trailer sway control.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Lexus",
    Model: "LX 600",
    Trim: [
      {
        TrimName: "3.4L Twin-Turbo V-6",
        Engine: "3.4L Twin-Turbo V6 (409 hp / 479 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "Full-Time 4WD",
        "Max Towing Capacity": 8000,
        Notes: "Active Height Control hydraulic suspension with integrated hitch.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Acura",
    Model: "MDX",
    Trim: [
      {
        TrimName: "SH-AWD with ATF Cooler (3.5L V-6 / Type S 3.0L Turbo)",
        Engine: "3.5L V6 (290 hp) or 3.0L Turbo V6 (355 hp)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "Super Handling All-Wheel Drive (SH-AWD)",
        "Max Towing Capacity": 5000,
        Notes: "Requires Acura accessory trailer hitch and transmission fluid cooler (FWD models rated at 3,500 lbs).",
      },
    ],
  },

  // ==========================================
  // EUROPEAN LUXURY (BMW, AUDI, MERCEDES, PORSCHE, LAND ROVER, VOLVO)
  // ==========================================
  {
    Year: 2024,
    Make: "BMW",
    Model: "X7",
    Trim: [
      {
        TrimName: "xDrive40i / M60i (Factory Trailer Hitch)",
        Engine: "3.0L Turbo I-6 (375 hp) or 4.4L Twin-Turbo V8 (523 hp)",
        Transmission: "8-Speed Sport Automatic",
        Drivetrain: "xDrive AWD",
        "Max Towing Capacity": 7500,
        Notes: "2-axle air suspension with dynamic stability control trailer stability program.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "BMW",
    Model: "X5",
    Trim: [
      {
        TrimName: "xDrive40i / xDrive50e PHEV / M60i",
        Engine: "3.0L Turbo I-6 or 4.4L Twin-Turbo V8",
        Transmission: "8-Speed Automatic",
        Drivetrain: "xDrive AWD",
        "Max Towing Capacity": 7200,
        Notes: "Factory electrically deployable or 2-inch receiver hitch.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Audi",
    Model: "Q7",
    Trim: [
      {
        TrimName: "55 TFSI (3.0L Turbo V-6)",
        Engine: "3.0L Turbocharged V6 (335 hp / 369 lb-ft)",
        Transmission: "8-Speed Tiptronic",
        Drivetrain: "quattro AWD",
        "Max Towing Capacity": 7700,
        Notes: "Adaptive air suspension with factory Class III hitch.",
      },
      {
        TrimName: "45 TFSI (2.0L Turbo I-4)",
        Engine: "2.0L Turbo I-4 (261 hp)",
        Transmission: "8-Speed Tiptronic",
        Drivetrain: "quattro AWD",
        "Max Towing Capacity": 4400,
        Notes: "Entry 4-cylinder quattro rating.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Porsche",
    Model: "Cayenne",
    Trim: [
      {
        TrimName: "Cayenne / Cayenne S / Turbo E-Hybrid",
        Engine: "3.0L Turbo V6 (348 hp) or 4.0L Twin-Turbo V8 (468-729 hp)",
        Transmission: "8-Speed Tiptronic S",
        Drivetrain: "AWD",
        "Max Towing Capacity": 7716,
        Notes: "Class-leading sports SUV towing stability with adaptive air suspension and PASM.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Mercedes-Benz",
    Model: "GLS",
    Trim: [
      {
        TrimName: "GLS 450 / GLS 580 4MATIC",
        Engine: "3.0L Inline-6 (375 hp) or 4.0L Twin-Turbo V8 (510 hp)",
        Transmission: "9G-TRONIC 9-Speed Automatic",
        Drivetrain: "4MATIC AWD",
        "Max Towing Capacity": 7700,
        Notes: "AIRMATIC air suspension with ESP Trailer Stability Assist.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Mercedes-Benz",
    Model: "G-Class",
    Trim: [
      {
        TrimName: "G 550 / AMG G 63",
        Engine: "4.0L Twin-Turbo V8 (416 - 577 hp)",
        Transmission: "9-Speed Automatic",
        Drivetrain: "Full-Time 4WD with 3 Locking Differentials",
        "Max Towing Capacity": 7700,
        Notes: "Ladder frame construction with integrated heavy-duty trailer hitch.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Land Rover",
    Model: "Defender",
    Trim: [
      {
        TrimName: "Defender 110 / 130 (3.0L I-6 / 5.0L V-8)",
        Engine: "3.0L Mild-Hybrid Turbo I-6 (395 hp) or 5.0L Supercharged V8 (518 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD with Low Range",
        "Max Towing Capacity": 8201,
        Notes: "Advanced Tow Assist software with configurable terrain response.",
      },
    ],
  },

  // ==========================================
  // SMALL CARS, COMPACT SEDANS & HATCHBACKS
  // ==========================================
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Corolla",
    Trim: [
      {
        TrimName: "2.0L Dynamic Force I-4 (Class I Hitch)",
        Engine: "2.0L 4-Cylinder (169 hp / 151 lb-ft)",
        Transmission: "Dynamic-Shift CVT",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1500,
        Notes: "Maximum trailer rating with aftermarket Class I 1.25-inch receiver hitch. Suitable for jet ski, single motorcycle trailer, or light teardrop camper under 1,500 lbs. Max tongue weight: 150 lbs.",
      },
      {
        TrimName: "Corolla Hybrid (AWD / FWD)",
        Engine: "1.8L 4-Cylinder Hybrid (138 hp)",
        Transmission: "e-CVT",
        Drivetrain: "AWD / FWD",
        "Max Towing Capacity": 1200,
        Notes: "Electric motor assist allows light utility towing. Keep tongue weight under 120 lbs.",
      },
      {
        TrimName: "GR Corolla (1.6L Turbo All-Wheel Drive)",
        Engine: "1.6L Turbocharged 3-Cylinder (300 hp / 273 lb-ft)",
        Transmission: "6-Speed Manual",
        Drivetrain: "GR-FOUR AWD",
        "Max Towing Capacity": 1200,
        Notes: "Track-focused performance hatchback. Light duty utility or tire trailer only.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "Toyota",
    Model: "Corolla",
    Trim: [
      {
        TrimName: "1.8L / 2.0L (Class I Hitch)",
        Engine: "1.8L or 2.0L 4-Cylinder",
        Transmission: "CVT / 6-Speed Manual",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1500,
        Notes: "Max 1,500 lbs trailer weight with trailer brakes (1,000 lbs unbraked). Tongue weight limit: 150 lbs.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Toyota",
    Model: "Camry",
    Trim: [
      {
        TrimName: "2.5L 4-Cylinder / 3.5L V-6 (Class I Receiver)",
        Engine: "2.5L 4-Cyl (203 hp) or 3.5L V6 (301 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "FWD / AWD",
        "Max Towing Capacity": 1000,
        Notes: "Class I hitch rating (1.25-inch receiver). Recommended for cargo carriers, bike racks, and small 4x8 utility trailers.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Honda",
    Model: "Civic",
    Trim: [
      {
        TrimName: "1.5L Turbo / 2.0L Naturally Aspirated",
        Engine: "1.5L Turbo (180 hp) or 2.0L 4-Cylinder (158 hp)",
        Transmission: "CVT / 6-Speed Manual",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "North American rating with Class I receiver hitch. Great for bike racks, hitch carriers, or light utility trailers up to 1,000 lbs. Max tongue weight: 100 lbs.",
      },
      {
        TrimName: "Civic Type R (2.0L Turbo)",
        Engine: "2.0L Turbocharged 4-Cylinder (315 hp)",
        Transmission: "6-Speed Manual",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "Center triple exhaust requires specialized hitch mount. Light tire trailer capable.",
      },
    ],
  },
  {
    Year: 2020,
    Make: "Honda",
    Model: "Civic",
    Trim: [
      {
        TrimName: "Sedan / Hatchback (1.5L Turbo / 2.0L)",
        Engine: "1.5L Turbo or 2.0L I-4",
        Transmission: "CVT / 6-Speed Manual",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "Class I hitch rating (1,000 lbs max gross trailer weight, 100 lbs tongue weight).",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Honda",
    Model: "Accord",
    Trim: [
      {
        TrimName: "1.5L Turbo / 2.0L Hybrid (Class I Hitch)",
        Engine: "1.5L Turbo (192 hp) or 2.0L Hybrid (204 hp)",
        Transmission: "CVT / e-CVT",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "Maximum 1,000 lbs gross trailer weight. Max tongue weight: 100 lbs.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Subaru",
    Model: "Impreza",
    Trim: [
      {
        TrimName: "2.5L RS / 2.0L Base (Symmetrical AWD)",
        Engine: "2.5L Boxer (182 hp) or 2.0L Boxer (152 hp)",
        Transmission: "Lineartronic CVT",
        Drivetrain: "Symmetrical AWD",
        "Max Towing Capacity": 1500,
        Notes: "1,500 lbs trailer rating with trailer brakes (1,000 lbs without brakes). Standard AWD provides excellent traction on boat ramps and gravel.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Subaru",
    Model: "Crosstrek",
    Trim: [
      {
        TrimName: "Crosstrek Wilderness (Heavy-Duty Transmission Cooler)",
        Engine: "2.5L SUBARU BOXER (182 hp / 178 lb-ft)",
        Transmission: "Lineartronic CVT with aux transmission oil cooler",
        Drivetrain: "Symmetrical AWD",
        "Max Towing Capacity": 3500,
        Notes: "Wilderness trim doubles towing capacity to 3,500 lbs with heavy-duty transmission cooler and 4.111 final drive ratio.",
      },
      {
        TrimName: "Standard Crosstrek (2.0L / 2.5L)",
        Engine: "2.0L or 2.5L Boxer 4-Cylinder",
        Transmission: "Lineartronic CVT",
        Drivetrain: "Symmetrical AWD",
        "Max Towing Capacity": 1500,
        Notes: "Standard 1,500 lbs rating with trailer brakes. Max tongue weight: 150 lbs.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Subaru",
    Model: "WRX",
    Trim: [
      {
        TrimName: "2.4L Turbocharged SUBARU BOXER",
        Engine: "2.4L Turbo Boxer (271 hp / 258 lb-ft)",
        Transmission: "6-Speed Manual / Subaru Performance Transmission",
        Drivetrain: "Symmetrical AWD",
        "Max Towing Capacity": 1500,
        Notes: "High-power sports sedan capable of towing small utility and motorcycle trailers up to 1,500 lbs with trailer brakes.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Mazda",
    Model: "Mazda3",
    Trim: [
      {
        TrimName: "2.5L Turbo AWD / 2.5L FWD",
        Engine: "2.5L Turbo (250 hp / 320 lb-ft) or 2.5L SkyActiv-G (191 hp)",
        Transmission: "6-Speed Automatic",
        Drivetrain: "i-ACTIV AWD / FWD",
        "Max Towing Capacity": 1500,
        Notes: "Conventional 6-speed torque converter automatic handles towing stress better than CVTs. Rated up to 1,500 lbs braked (1,000 lbs unbraked).",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Volkswagen",
    Model: "Jetta",
    Trim: [
      {
        TrimName: "1.5L TSI / GLI 2.0L Turbo",
        Engine: "1.5L Turbo (158 hp) or 2.0L Turbo GLI (228 hp)",
        Transmission: "8-Speed Automatic / 7-Speed DSG",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1500,
        Notes: "European engineered chassis. Max 1,500 lbs with trailer brakes; 1,000 lbs unbraked.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Volkswagen",
    Model: "Golf",
    Trim: [
      {
        TrimName: "Golf GTI / Golf R (2.0L TSI)",
        Engine: "2.0L Turbocharged Inline-4 (241 - 315 hp)",
        Transmission: "7-Speed DSG Dual-Clutch / 6-Speed Manual",
        Drivetrain: "FWD / 4MOTION AWD",
        "Max Towing Capacity": 1650,
        Notes: "Euro tow spec up to 1,650 lbs (750 kg unbraked) with Class I receiver. Capable of towing small camper or tire hauler.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Hyundai",
    Model: "Elantra",
    Trim: [
      {
        TrimName: "2.0L I-4 / 1.6L Turbo (N Line)",
        Engine: "2.0L (147 hp) or 1.6L Turbo (201 hp)",
        Transmission: "Intelligent Variable / 7-Speed Dual Clutch",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "Class I receiver hitch rating for cargo trays, bike racks, and small yard trailers under 1,000 lbs.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Kia",
    Model: "Forte",
    Trim: [
      {
        TrimName: "2.0L / GT 1.6L Turbo",
        Engine: "2.0L (147 hp) or 1.6L Turbo (201 hp)",
        Transmission: "IVT / 7-Speed Dual Clutch",
        Drivetrain: "FWD",
        "Max Towing Capacity": 1000,
        Notes: "Max 1,000 lbs trailer weight with 100 lbs tongue limit.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Tesla",
    Model: "Model 3",
    Trim: [
      {
        TrimName: "Rear-Wheel Drive / Long Range AWD (Tow Hitch Option)",
        Engine: "Single / Dual Electric Motors (272 - 394 hp)",
        Transmission: "Direct Drive",
        Drivetrain: "RWD / AWD",
        "Max Towing Capacity": 2000,
        Notes: "Factory tow hitch option rated up to 1,000 kg (2,200 lbs) in Europe; 2,000 lbs in North America. Features active Trailer Mode trailer sway damping.",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Volvo",
    Model: "V60 / S60",
    Trim: [
      {
        TrimName: "B5 / T8 Recharge AWD (Factory Foldable Hitch)",
        Engine: "2.0L Turbo / Plug-In Hybrid (247 - 455 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 3500,
        Notes: "Best-in-class compact luxury sedan/wagon towing capacity (3,500 lbs with factory hitch and trailer brakes).",
      },
    ],
  },
  {
    Year: 2024,
    Make: "BMW",
    Model: "3 Series",
    Trim: [
      {
        TrimName: "330i / M340i xDrive",
        Engine: "2.0L Turbo I-4 (255 hp) or 3.0L Turbo I-6 (382 hp)",
        Transmission: "8-Speed Sport Automatic",
        Drivetrain: "xDrive AWD / RWD",
        "Max Towing Capacity": 2000,
        Notes: "Rated up to 2,000 lbs with Class I/II receiver hitch in North America (up to 3,500 lbs Euro braked spec).",
      },
    ],
  },
  {
    Year: 2024,
    Make: "Audi",
    Model: "A4",
    Trim: [
      {
        TrimName: "40 TFSI / 45 TFSI quattro",
        Engine: "2.0L Turbocharged Inline-4 (201 - 261 hp)",
        Transmission: "7-Speed S tronic Dual-Clutch",
        Drivetrain: "quattro AWD",
        "Max Towing Capacity": 2500,
        Notes: "quattro all-wheel drive provides confident traction with trailers up to 2,500 lbs with trailer brakes.",
      },
    ],
  },
];

// Historical templates to guarantee complete coverage from 2000 to present year (2026)
const HISTORICAL_TEMPLATES = [
  // Full-Size & Heavy-Duty Pickups
  {
    make: "Ford",
    model: "F-150",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "3.5L V6 EcoBoost (Max Trailer Tow)", Engine: "3.5L V6 Twin-Turbo", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 14000, Notes: "Class IV hitch required. 80% continuous safety limit: 11,200 lbs." },
      { TrimName: "5.0L V8", Engine: "5.0L V8 Coyote", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13000, Notes: "Standard factory tow package. Tongue weight limit: 1,300 lbs." },
      { TrimName: "2.7L V6 EcoBoost", Engine: "2.7L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10100, Notes: "Mid-tier towing configuration. Recommended for boat or camper haulers." },
    ],
  },
  {
    make: "Ford",
    model: "F-250 Super Duty",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "6.7L Power Stroke V8 Turbo Diesel", Engine: "6.7L V8 Turbo Diesel", Transmission: "10-Speed Heavy-Duty TorqShift", Drivetrain: "4WD", "Max Towing Capacity": 22000, Notes: "Class V receiver hitch. Conventional towing limit." },
      { TrimName: "7.3L V8 Gas (Godzilla)", Engine: "7.3L V8 Gas", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 18200, Notes: "Heavy-duty gas powertrain with auxiliary oil cooling." },
    ],
  },
  {
    make: "Chevrolet",
    model: "Silverado 1500",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering Package)", Engine: "6.2L V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13300, Notes: "Max Trailering Package with enhanced cooling and 3.42 rear axle ratio." },
      { TrimName: "5.3L EcoTec3 V8", Engine: "5.3L V8", Transmission: "10-Speed / 8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11500, Notes: "Class IV receiver hitch. Recommended tongue weight: 1,150 lbs." },
      { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L Inline-6 Turbo-Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13300, Notes: "High fuel efficiency and steady torque for highway hauling." },
    ],
  },
  {
    make: "GMC",
    model: "Sierra 1500",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering)", Engine: "6.2L V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13200, Notes: "Class IV hitch with enhanced cooling." },
      { TrimName: "5.3L V8", Engine: "5.3L V8", Transmission: "Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11200, Notes: "Standard V8 tow package." },
    ],
  },
  {
    make: "RAM",
    model: "1500",
    years: [2011, 2026] as [number, number],
    trims: [
      { TrimName: "5.7L HEMI V8 with eTorque (Max Tow Package)", Engine: "5.7L HEMI V8", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12750, Notes: "Class IV hitch receiver. 3.92 axle ratio required." },
      { TrimName: "3.6L Pentastar V6 with eTorque", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7730, Notes: "Light duty utility hauling." },
    ],
  },
  {
    make: "Dodge",
    model: "Ram 1500",
    years: [2000, 2010] as [number, number],
    trims: [
      { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9100, Notes: "Class IV hitch with factory heavy-duty transmission cooler." },
    ],
  },
  {
    make: "Toyota",
    model: "Tacoma",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "V6 / Turbo Tow Package", Engine: "V6 / 2.4L Turbo", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6500, Notes: "Factory Class IV hitch, engine oil cooler, and trailer sway control." },
      { TrimName: "Standard 4-Cylinder", Engine: "4-Cyl Gas", Transmission: "Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Bumper-rated light utility towing." },
    ],
  },
  {
    make: "Toyota",
    model: "Tundra",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "i-FORCE / 5.7L V8 (Tow Package)", Engine: "Twin-Turbo V6 / V8 Gas", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12000, Notes: "Factory integrated trailer brake controller and Class IV hitch." },
    ],
  },
  // Full-Size & Mid-Size SUVs
  {
    make: "Chevrolet",
    model: "Tahoe",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "5.3L / 6.2L V8 with Max Trailering Package", Engine: "V8 EcoTec3", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8400, Notes: "Full-size body-on-frame SUV with 2-speed transfer case." },
      { TrimName: "Standard Tow Configuration", Engine: "5.3L V8", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Standard Class IV hitch receiver." },
    ],
  },
  {
    make: "Ford",
    model: "Expedition",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "3.5L EcoBoost / 5.4L V8 Heavy-Duty Tow Package", Engine: "Twin-Turbo V6 / V8", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9300, Notes: "Heavy-Duty Trailer Tow Package with auxiliary oil cooling." },
    ],
  },
  {
    make: "Ford",
    model: "Explorer",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class III Trailer Tow Package", Engine: "EcoBoost Turbo / V6", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD / AWD", "Max Towing Capacity": 5600, Notes: "Factory Class III receiver hitch and oil cooler." },
      { TrimName: "Standard Trim (No Tow Package)", Engine: "Standard Gas", Transmission: "Automatic", Drivetrain: "FWD / RWD", "Max Towing Capacity": 3000, Notes: "Standard bumper pull rating." },
    ],
  },
  {
    make: "Toyota",
    model: "4Runner",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "4.0L V6 / 4.7L V8 (Tow Package)", Engine: "V6 / V8 Gas", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5000, Notes: "Rugged body-on-frame SUV with Class III/IV hitch receiver." },
    ],
  },
  {
    make: "Toyota",
    model: "Highlander",
    years: [2001, 2026] as [number, number],
    trims: [
      { TrimName: "V6 / 2.4L Turbo Factory Tow Package", Engine: "V6 / Turbo Gas", Transmission: "Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with heavy-duty radiator and oil cooler." },
    ],
  },
  {
    make: "Honda",
    model: "Pilot",
    years: [2003, 2026] as [number, number],
    trims: [
      { TrimName: "3.5L V6 AWD (Transmission Cooler)", Engine: "3.5L V6 i-VTEC", Transmission: "Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Factory Class III hitch and auxiliary ATF cooler required." },
    ],
  },
  {
    make: "Jeep",
    model: "Grand Cherokee",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Trailer Tow Group IV", Engine: "HEMI V8 / Pentastar V6", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7200, Notes: "Class IV hitch with load-leveling suspension." },
    ],
  },
  {
    make: "Subaru",
    model: "Outback",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "2.4L Turbo XT / Wilderness", Engine: "2.4L Turbo Boxer-4", Transmission: "CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with upgraded transmission oil cooler." },
      { TrimName: "2.5L Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "CVT / Auto", Drivetrain: "AWD", "Max Towing Capacity": 2700, Notes: "Standard crossover rating with trailer brakes." },
    ],
  },
  {
    make: "Acura",
    model: "MDX",
    years: [2001, 2026] as [number, number],
    trims: [
      { TrimName: "SH-AWD (Factory Tow Package)", Engine: "3.5L V6 / 3.7L V6", Transmission: "Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Class III receiver hitch with factory auxiliary transmission fluid cooler." },
      { TrimName: "Standard / Regular Model (FWD)", Engine: "3.5L V6", Transmission: "Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." },
    ],
  },
  {
    make: "Acura",
    model: "RDX",
    years: [2007, 2026] as [number, number],
    trims: [
      { TrimName: "SH-AWD / FWD (Class I Hitch)", Engine: "2.0L Turbo / 3.5L V6 / 2.3L Turbo", Transmission: "Automatic", Drivetrain: "SH-AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch with trailer brakes." },
    ],
  },
  // Compact Sedans & Small Cars (Class I Hitch: 1,000 - 1,500 lbs)
  {
    make: "Toyota",
    model: "Corolla",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch (Trailer Brakes Recommended)", Engine: "1.8L / 2.0L 4-Cylinder", Transmission: "CVT / Manual", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch. Tongue weight limit: 150 lbs. Ideal for single motorcycle, kayak hauler, or light cargo trailer." },
      { TrimName: "Unbraked Trailer Rating", Engine: "1.8L / 2.0L 4-Cylinder", Transmission: "CVT", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1000, Notes: "Unbraked utility trailer towing limit. Ensure strict adherence to 100 lbs tongue weight." },
    ],
  },
  {
    make: "Toyota",
    model: "Camry",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "2.5L 4-Cyl / 3.5L V6", Transmission: "Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. Maximum gross trailer weight: 1,500 lbs with auxiliary trailer brakes." },
    ],
  },
  {
    make: "Honda",
    model: "Civic",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch (Trailer Brakes Recommended)", Engine: "1.5L Turbo / 2.0L 4-Cylinder", Transmission: "CVT / Manual", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch. Tongue weight limit: 150 lbs. Auxiliary trailer brakes strongly advised." },
    ],
  },
  {
    make: "Honda",
    model: "Accord",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "1.5L / 2.0L Turbo / V6", Transmission: "Automatic / CVT", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I hitch. Tongue weight limit: 150 lbs." },
    ],
  },
  {
    make: "Subaru",
    model: "Impreza",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch (Symmetrical AWD)", Engine: "2.0L / 2.5L Boxer-4", Transmission: "CVT / Manual", Drivetrain: "Symmetrical All-Wheel Drive", "Max Towing Capacity": 1500, Notes: "AWD provides excellent traction on boat ramps and gravel roads. Tongue weight: 150 lbs." },
    ],
  },
  {
    make: "Mazda",
    model: "Mazda3",
    years: [2004, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch (SkyActiv)", Engine: "2.0L / 2.5L SkyActiv-G", Transmission: "Automatic / Manual", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. Maximum tongue weight: 150 lbs." },
    ],
  },
  {
    make: "Volkswagen",
    model: "Jetta",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "1.4L / 1.5L / 2.0L TSI", Transmission: "Automatic / Manual", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I hitch rated for light utility towing up to 1,500 lbs with trailer brakes." },
    ],
  },
  {
    make: "Hyundai",
    model: "Elantra",
    years: [2000, 2026] as [number, number],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "2.0L 4-Cyl", Transmission: "Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch with trailer brakes." },
    ],
  },
  // Modern EVs
  {
    make: "Tesla",
    model: "Model Y",
    years: [2020, 2026] as [number, number],
    trims: [
      { TrimName: "Long Range / Performance (Tow Package)", Engine: "Dual Electric Motors (AWD)", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 3500, Notes: "Factory Class III 2-inch hitch with Trailer Mode software. Max tongue weight: 350 lbs." },
    ],
  },
  {
    make: "Tesla",
    model: "Cybertruck",
    years: [2024, 2026] as [number, number],
    trims: [
      { TrimName: "Cyberbeast / Dual-Motor AWD", Engine: "Dual / Tri Electric Motors", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 11000, Notes: "Class IV integrated hitch with active air suspension." },
    ],
  },
  {
    make: "Rivian",
    model: "R1T",
    years: [2022, 2026] as [number, number],
    trims: [
      { TrimName: "Quad-Motor / Dual-Motor Max Pack", Engine: "Electric Motors", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 11000, Notes: "Class IV hitch with built-in trailer safety profiles." },
    ],
  },
  {
    make: "Ford",
    model: "F-150 Lightning",
    years: [2022, 2026] as [number, number],
    trims: [
      { TrimName: "Extended Range Battery", Engine: "Dual Electric Motors", Transmission: "Single-Speed", Drivetrain: "4WD", "Max Towing Capacity": 10000, Notes: "Class IV receiver hitch. Expect range reduction under full trailer load." },
    ],
  },
];

function getGenerationalTrims(make: string, model: string, year: number): any[] | "UNRELEASED" | null {
  const mk = make.trim();
  const m = model.trim();
  const mkL = mk.toLowerCase();
  const mL = m.toLowerCase();

  // ==========================================
  // UNRELEASED YEAR GATES (Model did not exist)
  // ==========================================
  if (mL === "telluride" && year < 2020) return "UNRELEASED";
  if (mL === "palisade" && year < 2020) return "UNRELEASED";
  if (mL === "ascent" && year < 2019) return "UNRELEASED";
  if (mL === "crosstrek" && year < 2013) return "UNRELEASED";
  if (mL === "atlas" && year < 2018) return "UNRELEASED";
  if (mL === "gladiator" && year < 2020) return "UNRELEASED";
  if (mL === "maverick" && year >= 2000 && year < 2022) return "UNRELEASED";
  if (mL.includes("lightning") && year >= 2005 && year < 2022) return "UNRELEASED";
  if (mL === "model y" && year < 2020) return "UNRELEASED";
  if (mL === "model x" && year < 2016) return "UNRELEASED";
  if (mL === "cybertruck" && year < 2024) return "UNRELEASED";
  if ((mL === "r1t" || mL === "r1s") && year < 2022) return "UNRELEASED";
  if (mL === "ev9" && year < 2024) return "UNRELEASED";
  if (mL === "titan" && (year < 2004 || year > 2024)) return "UNRELEASED";
  if (mL === "cx-5" && year < 2013) return "UNRELEASED";
  if (mL === "ridgeline" && (year < 2006 || year === 2015 || year === 2016)) return "UNRELEASED";
  if (mL === "pacifica" && (year < 2004 || (year >= 2009 && year <= 2016))) return "UNRELEASED";
  if (mL === "ranger" && mkL === "ford" && year >= 2012 && year <= 2018) return "UNRELEASED";
  if (mL === "colorado" && mkL === "chevrolet" && (year < 2004 || year === 2013 || year === 2014)) return "UNRELEASED";
  if (mL === "durango" && year === 2010) return "UNRELEASED";
  if (mL === "highlander" && year < 2001) return "UNRELEASED";
  if (mL === "sequoia" && year < 2001) return "UNRELEASED";
  if (mL === "pilot" && year < 2003) return "UNRELEASED";
  if (mL === "mazda3" && year < 2004) return "UNRELEASED";
  if (mL === "forte" && year < 2010) return "UNRELEASED";
  if (mL === "mdx" && (year < 2001 || year === 2021)) return "UNRELEASED";
  if (mL === "rdx" && year < 2007) return "UNRELEASED";

  // ==========================================
  // 1. FORD F-150
  // ==========================================
  if (mkL === "ford" && mL === "f-150") {
    if (year <= 2003) {
      return [
        { TrimName: "5.4L Triton V8 (Heavy Duty Tow Package)", Engine: "5.4L Triton V8 (260 hp / 350 lb-ft)", Transmission: "4-Speed 4R70W / 4R100 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8800, Notes: "Class IV hitch with auxiliary transmission cooler and 3.55/3.73 rear axle." },
        { TrimName: "Standard / Regular Model (4.6L Triton V8)", Engine: "4.6L Triton V8 (220 hp / 290 lb-ft)", Transmission: "4-Speed 4R70W Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7200, Notes: "Standard V8 towing configuration." },
        { TrimName: "Standard / Regular Model (4.2L Essex V6)", Engine: "4.2L Essex V6 (205 hp / 255 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "RWD", "Max Towing Capacity": 5800, Notes: "Base work truck towing limit." }
      ];
    }
    if (year <= 2008) {
      return [
        { TrimName: "5.4L 3V Triton V8 (Tow Package)", Engine: "5.4L 3-Valve V8 (300 hp / 365 lb-ft)", Transmission: "4-Speed 4R75E Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9900, Notes: "Class IV receiver hitch with upgraded radiator and transmission fluid cooler." },
        { TrimName: "Standard / Regular Model (4.6L Triton V8)", Engine: "4.6L 2-Valve V8 (231 hp / 293 lb-ft)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Standard factory tow configuration." }
      ];
    }
    if (year <= 2010) {
      return [
        { TrimName: "5.4L 3V Triton V8 (Max Tow Package)", Engine: "5.4L 3V V8 (310 hp / 365 lb-ft)", Transmission: "6-Speed 6R80 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11300, Notes: "Max Trailer Tow package with integrated trailer brake controller." },
        { TrimName: "Standard / Regular Model (4.6L 3V V8)", Engine: "4.6L 3-Valve V8 (292 hp / 320 lb-ft)", Transmission: "6-Speed 6R80 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9500, Notes: "Standard 6-speed V8 configuration." }
      ];
    }
    if (year <= 2014) {
      return [
        { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow Package)", Engine: "3.5L Twin-Turbo V6 (365 hp / 420 lb-ft)", Transmission: "6-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11300, Notes: "Twin-turbo power with 3.73 axle ratio." },
        { TrimName: "5.0L Coyote V8", Engine: "5.0L V8 (360 hp / 380 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10000, Notes: "Naturally aspirated V8 hauler." },
        { TrimName: "Standard / Regular Model (3.7L V6)", Engine: "3.7L Ti-VCT V6 (302 hp / 278 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 6100, Notes: "Standard base utility limit." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow Package)", Engine: "3.5L Twin-Turbo V6 (365 hp / 420 lb-ft)", Transmission: "6-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12200, Notes: "High-strength military-grade aluminum-alloy body." },
        { TrimName: "5.0L Coyote V8", Engine: "5.0L V8 (385 hp / 387 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11100, Notes: "Standard heavy hauler." },
        { TrimName: "Standard / Regular Model (2.7L EcoBoost)", Engine: "2.7L Twin-Turbo V6 (325 hp / 375 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8500, Notes: "Efficient light-duty utility limit." }
      ];
    }
    if (year <= 2020) {
      return [
        { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow Package)", Engine: "3.5L Twin-Turbo V6 (375 hp / 470 lb-ft)", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13200, Notes: "10-speed transmission with Pro Trailer Backup Assist." },
        { TrimName: "5.0L Coyote V8", Engine: "5.0L V8 (395 hp / 400 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11600, Notes: "Heavy-duty payload package available." },
        { TrimName: "3.0L Power Stroke Turbo Diesel", Engine: "3.0L V6 Turbo Diesel (250 hp / 440 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11400, Notes: "High fuel efficiency highway hauler." },
        { TrimName: "Standard / Regular Model (2.7L EcoBoost)", Engine: "2.7L Twin-Turbo V6 (325 hp / 400 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9000, Notes: "Standard light-duty configuration." }
      ];
    }
    // 2021+ (PowerBoost introduced in 2021!)
    return [
      { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow Package)", Engine: "3.5L Twin-Turbo V6 (400 hp / 500 lb-ft)", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 14000, Notes: "Class-leading conventional towing with 3.73 rear axle." },
      { TrimName: "3.5L PowerBoost Full Hybrid V6", Engine: "3.5L PowerBoost Turbo Hybrid (430 hp / 570 lb-ft)", Transmission: "10-Speed Hybrid Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12700, Notes: "Launched in 2021: Features 7.2 kW Pro Power Onboard mobile generator." },
      { TrimName: "5.0L Coyote V8", Engine: "5.0L V8 (400 hp / 410 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13000, Notes: "Standard heavy hauler." },
      { TrimName: "Standard / Regular Model (2.7L EcoBoost)", Engine: "2.7L Twin-Turbo V6 (325 hp / 400 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10100, Notes: "Mid-tier towing configuration." }
    ];
  }

  // ==========================================
  // 2. FORD F-250 & F-350 SUPER DUTY
  // ==========================================
  if (mkL === "ford" && (mL.includes("f-250") || mL.includes("f-350"))) {
    const is350 = mL.includes("f-350");
    if (year <= 2003) {
      return [
        { TrimName: "7.3L Power Stroke Turbo Diesel V8", Engine: "7.3L V8 Turbo Diesel (250 hp / 525 lb-ft)", Transmission: "4-Speed 4R100 Automatic / 6-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 15000 : 12500, Notes: "Legendary 7.3L diesel workhorse with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (6.8L Triton V10)", Engine: "6.8L Triton V10 (310 hp / 425 lb-ft)", Transmission: "4-Speed 4R100 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 13000 : 10000, Notes: "Heavy-duty gas workhorse." },
        { TrimName: "Standard / Regular Model (5.4L Triton V8)", Engine: "5.4L Triton V8 (260 hp / 350 lb-ft)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 9500 : 8000, Notes: "Standard commercial work truck spec." }
      ];
    }
    if (year <= 2007) {
      return [
        { TrimName: "6.0L Power Stroke Turbo Diesel V8", Engine: "6.0L V8 Turbo Diesel (325 hp / 570 lb-ft)", Transmission: "5-Speed TorqShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 16000 : 12500, Notes: "TorqShift transmission with tow/haul mode." },
        { TrimName: "Standard / Regular Model (6.8L 3V Triton V10)", Engine: "6.8L 3-Valve V10 (362 hp / 457 lb-ft)", Transmission: "5-Speed TorqShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 15000 : 12500, Notes: "High-output gas powertrain." },
        { TrimName: "Standard / Regular Model (5.4L 3V Triton V8)", Engine: "5.4L 3-Valve V8 (300 hp / 365 lb-ft)", Transmission: "5-Speed TorqShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 10500 : 9500, Notes: "Standard commercial spec." }
      ];
    }
    if (year <= 2010) {
      return [
        { TrimName: "6.4L Power Stroke Turbo Diesel V8", Engine: "6.4L Twin-Turbo Diesel V8 (350 hp / 650 lb-ft)", Transmission: "5-Speed TorqShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 18000 : 15000, Notes: "Common-rail twin-turbo diesel hauler." },
        { TrimName: "Standard / Regular Model (6.8L 3V Triton V10)", Engine: "6.8L 3-Valve V10 (362 hp / 457 lb-ft)", Transmission: "5-Speed TorqShift", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 15000 : 12500, Notes: "Heavy-duty gas hauler." },
        { TrimName: "Standard / Regular Model (5.4L 3V Triton V8)", Engine: "5.4L 3-Valve V8 (300 hp / 365 lb-ft)", Transmission: "5-Speed TorqShift", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 11000 : 10000, Notes: "Standard commercial spec." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "6.7L Power Stroke Turbo Diesel V8", Engine: "6.7L Power Stroke V8 Turbo Diesel (440 hp / 925 lb-ft)", Transmission: "6-Speed TorqShift Heavy-Duty Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 21000 : 18000, Notes: "In-house Ford Scorpion diesel with exhaust brake." },
        { TrimName: "Standard / Regular Model (6.2L Boss V8 Gas)", Engine: "6.2L Boss V8 (385 hp / 430 lb-ft)", Transmission: "6-Speed TorqShift-G Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 16000 : 15000, Notes: "Heavy-duty gas workhorse." }
      ];
    }
    // 2020+ (10-speed TorqShift & 7.3L Godzilla introduced in 2020!)
    return [
      { TrimName: "6.7L Power Stroke Turbo Diesel V8", Engine: "6.7L V8 Turbo Diesel (475 hp / 1,050 lb-ft)", Transmission: "10-Speed TorqShift Heavy-Duty", Drivetrain: "4WD", "Max Towing Capacity": is350 ? 28000 : 22000, Notes: "Class V receiver hitch with smart trailer tow software." },
      { TrimName: "7.3L Godzilla V8 Gas (Heavy-Duty Tow)", Engine: "7.3L V8 Gas (430 hp / 475 lb-ft)", Transmission: "10-Speed TorqShift Automatic", Drivetrain: "4WD", "Max Towing Capacity": is350 ? 18900 : 18200, Notes: "Introduced in 2020: Heavy-duty gas powertrain with auxiliary oil cooling." },
      { TrimName: "Standard / Regular Model (6.8L / 6.2L V8 Gas)", Engine: "V8 Gas Engine", Transmission: "10-Speed TorqShift-G", Drivetrain: "4WD / RWD", "Max Towing Capacity": is350 ? 16000 : 15000, Notes: "Standard commercial work truck specification." }
    ];
  }

  // ==========================================
  // 3. FORD RANGER
  // ==========================================
  if (mkL === "ford" && mL === "ranger") {
    if (year <= 2011) {
      return [
        { TrimName: "Standard / Regular Model (4.0L Cologne V6 Tow Package)", Engine: "4.0L SOHC V6 (207 hp / 238 lb-ft)", Transmission: "5-Speed Automatic / 5-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5880, Notes: "Class III hitch with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (3.0L Vulcan V6)", Engine: "3.0L Vulcan V6 (148 hp / 180 lb-ft)", Transmission: "5-Speed Automatic / Manual", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3900, Notes: "Light duty utility limit." },
        { TrimName: "Standard / Regular Model (2.3L / 2.5L 4-Cylinder)", Engine: "4-Cylinder Gas", Transmission: "5-Speed Manual", Drivetrain: "RWD", "Max Towing Capacity": 2240, Notes: "Base 4-cylinder bumper pull limit." }
      ];
    }
    // 2019+ (reintroduced in 2019!)
    return [
      { TrimName: "2.3L EcoBoost with Factory Tow Package", Engine: "2.3L Turbo I-4 (270 hp / 310 lb-ft)", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7500, Notes: "Class IV hitch receiver with trailer sway control." },
      { TrimName: "Standard / Regular Model (Bumper Pull)", Engine: "2.3L Turbo I-4", Transmission: "10-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Standard bumper pull limit without auxiliary tow package." }
    ];
  }

  // ==========================================
  // 4. CHEVROLET SILVERADO 1500 / GMC SIERRA 1500
  // ==========================================
  if ((mkL === "chevrolet" || mkL === "gmc") && (mL.includes("silverado 1500") || mL.includes("sierra 1500"))) {
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (5.3L Vortec V8 Tow Package)", Engine: "5.3L Vortec V8 (285–295 hp / 325–335 lb-ft)", Transmission: "4-Speed 4L60-E Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8400, Notes: "Class IV hitch with factory heavy-duty transmission fluid cooler." },
        { TrimName: "6.0L Vortec V8 (VortecMax Tow Package)", Engine: "6.0L High-Output V8 (345 hp / 380 lb-ft)", Transmission: "4-Speed 4L80-E Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10000, Notes: "Enhanced cooling, 3.73 axle ratio, and 14-bolt rear axle." },
        { TrimName: "Standard / Regular Model (4.8L Vortec V8)", Engine: "4.8L Vortec V8 (270–285 hp)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7500, Notes: "Standard V8 configuration." },
        { TrimName: "Standard / Regular Model (4.3L Vortec V6)", Engine: "4.3L Vortec V6 (200 hp / 260 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "RWD", "Max Towing Capacity": 5000, Notes: "Standard base work truck limit." }
      ];
    }
    if (year <= 2013) {
      return [
        { TrimName: "6.2L Vortec V8 (Max Trailering Package)", Engine: "6.2L V8 (403 hp / 417 lb-ft)", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10700, Notes: "Available 2009–2013: Max Trailering Package with 3.73 rear axle." },
        { TrimName: "Standard / Regular Model (5.3L Vortec V8)", Engine: "5.3L V8 (315 hp / 338 lb-ft)", Transmission: "4-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9600, Notes: "Standard V8 trailering package with auxiliary cooler." },
        { TrimName: "Standard / Regular Model (4.8L Vortec V8)", Engine: "4.8L V8 (295–302 hp)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7200, Notes: "Standard V8 utility limit." }
      ];
    }
    if (year <= 2018) {
      return [
        { TrimName: "6.2L EcoTec3 V8 (Max Trailering Package)", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "8-Speed Hydra-Matic Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12000, Notes: "Max Trailering Package with integrated trailer brake controller." },
        { TrimName: "Standard / Regular Model (5.3L EcoTec3 V8)", Engine: "5.3L V8 (355 hp / 383 lb-ft)", Transmission: "6-Speed / 8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11100, Notes: "Standard V8 towing configuration." },
        { TrimName: "Standard / Regular Model (4.3L EcoTec3 V6)", Engine: "4.3L V6 (285 hp / 305 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 7600, Notes: "Base work truck utility rating." }
      ];
    }
    // 2019+ (3.0L Duramax introduced in 2020!)
    const trims = [
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering Package)", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13300, Notes: "Max Trailering Package with enhanced cooling and 3.42 axle ratio." },
      { TrimName: "Standard / Regular Model (5.3L EcoTec3 V8)", Engine: "5.3L V8 (355 hp / 383 lb-ft)", Transmission: "8-Speed / 10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11500, Notes: "Class IV receiver hitch with integrated brake controller." },
      { TrimName: "Standard / Regular Model (2.7L Turbo High-Output)", Engine: "2.7L Turbo I-4 (310 hp / 430 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 9500, Notes: "Standard commercial towing configuration." }
    ];
    if (year >= 2020) {
      trims.splice(1, 0, {
        TrimName: "3.0L Duramax Turbo-Diesel",
        Engine: "3.0L Inline-6 Turbo-Diesel (277–305 hp / 460–495 lb-ft)",
        Transmission: "10-Speed Automatic",
        Drivetrain: "4WD / RWD",
        "Max Towing Capacity": 13300,
        Notes: "Introduced in 2020: High-efficiency inline-6 diesel for continuous highway hauling."
      });
    }
    return trims;
  }

  // ==========================================
  // 5. CHEVROLET SILVERADO 2500HD / GMC SIERRA 2500HD
  // ==========================================
  if ((mkL === "chevrolet" || mkL === "gmc") && (mL.includes("silverado 2500hd") || mL.includes("sierra 2500hd"))) {
    if (year <= 2006) {
      return [
        { TrimName: "6.6L Duramax Turbo-Diesel V8 (Allison)", Engine: "6.6L Duramax V8 Turbo-Diesel (300–360 hp / 520–650 lb-ft)", Transmission: "Allison 5-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12000, Notes: "Class V receiver hitch with Allison transmission tow/haul mode." },
        { TrimName: "Standard / Regular Model (6.0L Vortec V8 Gas)", Engine: "6.0L Vortec V8 (300 hp / 360 lb-ft)", Transmission: "4-Speed 4L80-E Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10300, Notes: "Heavy-duty gas commercial specification." },
        { TrimName: "8.1L Vortec Big Block V8", Engine: "8.1L Big Block V8 (330 hp / 450 lb-ft)", Transmission: "Allison Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12000, Notes: "Heavy-duty big block hauler." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "6.6L Duramax Turbo-Diesel V8 (Allison)", Engine: "6.6L Duramax V8 Turbo Diesel (397–445 hp / 765–910 lb-ft)", Transmission: "Allison 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 18100, Notes: "Integrated exhaust brake and digital steering assist." },
        { TrimName: "Standard / Regular Model (6.0L Vortec V8 Gas)", Engine: "6.0L Vortec V8 (360 hp / 380 lb-ft)", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13000, Notes: "Heavy-duty commercial gas workhorse." }
      ];
    }
    // 2020+ (Allison 10-speed & 6.6L Gas introduced in 2020!)
    return [
      { TrimName: "6.6L Duramax Turbo-Diesel V8 (Allison 10-Speed)", Engine: "6.6L Duramax V8 Turbo Diesel (470 hp / 975 lb-ft)", Transmission: "Allison 10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 22500, Notes: "Introduced in 2020: Class V hitch with transparent trailer camera software." },
      { TrimName: "Standard / Regular Model (6.6L V8 Gas)", Engine: "6.6L V8 Gas (401 hp / 464 lb-ft)", Transmission: "Allison 10-Speed / 6-Speed Heavy-Duty", Drivetrain: "4WD / RWD", "Max Towing Capacity": 16000, Notes: "Heavy-duty gas work truck specification." }
    ];
  }

  // ==========================================
  // 6. CHEVROLET COLORADO / GMC CANYON
  // ==========================================
  if ((mkL === "chevrolet" || mkL === "gmc") && (mL === "colorado" || mL === "canyon")) {
    if (year <= 2012) {
      const trims = [
        { TrimName: "Standard / Regular Model (3.5L / 3.7L Inline-5)", Engine: "3.5L / 3.7L Vortec I-5 (220–242 hp)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 4000, Notes: "Class III hitch rating." },
        { TrimName: "Standard / Regular Model (2.8L / 2.9L 4-Cylinder)", Engine: "2.8L / 2.9L Vortec I-4", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "RWD", "Max Towing Capacity": 3200, Notes: "Base utility limit." }
      ];
      if (year >= 2009) {
        trims.unshift({
          TrimName: "5.3L V8 (Tow Package)",
          Engine: "5.3L V8 (300 hp / 320 lb-ft)",
          Transmission: "4-Speed Automatic",
          Drivetrain: "4WD / RWD",
          "Max Towing Capacity": 6000,
          Notes: "Available 2009–2012: V8 power with 6,000 lbs rating."
        });
      }
      return trims;
    }
    if (year <= 2022) {
      const trims = [
        { TrimName: "Standard / Regular Model (3.6L V6 Tow Package)", Engine: "3.6L DOHC V6 (305–308 hp / 269–275 lb-ft)", Transmission: "8-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7000, Notes: "Class IV hitch receiver with heavy-duty cooling." },
        { TrimName: "Standard / Regular Model (2.5L 4-Cylinder)", Engine: "2.5L 4-Cylinder (200 hp / 191 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Standard bumper pull limit." }
      ];
      if (year >= 2016) {
        trims.unshift({
          TrimName: "2.8L Duramax Turbo-Diesel (Tow Package)",
          Engine: "2.8L Turbo Diesel I-4 (181 hp / 369 lb-ft)",
          Transmission: "6-Speed Automatic",
          Drivetrain: "4WD / RWD",
          "Max Towing Capacity": 7700,
          Notes: "Available 2016–2022: Best-in-class diesel torque with exhaust brake."
        });
      }
      return trims;
    }
    // 2023+ (Gen 3)
    return [
      { TrimName: "2.7L Turbo High-Output (Factory Tow Package)", Engine: "2.7L Turbo I-4 (310 hp / 430 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Class-leading midsize pickup towing with factory tow package." },
      { TrimName: "Standard / Regular Model (2.7L Turbo Base)", Engine: "2.7L Turbo I-4 (237 hp / 260 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3500, Notes: "Bumper hitch limit without auxiliary cooling." }
    ];
  }

  // ==========================================
  // 7. RAM 1500 (Dodge Ram 1500)
  // ==========================================
  if ((mkL === "ram" || mkL === "dodge") && (mL.includes("1500") || mL.includes("ram 1500"))) {
    if (year <= 2002) {
      return [
        { TrimName: "Standard / Regular Model (5.9L Magnum V8 Tow Package)", Engine: "5.9L Magnum V8 (245 hp / 335 lb-ft)", Transmission: "4-Speed 46RE Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8800, Notes: "Class IV receiver hitch with auxiliary transmission fluid cooler." },
        { TrimName: "Standard / Regular Model (5.2L / 4.7L V8)", Engine: "Magnum / PowerTech V8", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7500, Notes: "Standard V8 configuration." },
        { TrimName: "Standard / Regular Model (3.9L V6)", Engine: "3.9L Magnum V6", Transmission: "4-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 4500, Notes: "Base work truck utility limit." }
      ];
    }
    if (year <= 2008) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8 (345 hp / 375 lb-ft)", Transmission: "5-Speed 545RFE Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9100, Notes: "Class IV hitch with factory heavy-duty transmission cooler." },
        { TrimName: "Standard / Regular Model (4.7L Magnum V8)", Engine: "4.7L V8 (235–310 hp)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6800, Notes: "Standard bed trailer towing." },
        { TrimName: "Standard / Regular Model (3.7L Magnum V6)", Engine: "3.7L V6 (215 hp / 235 lb-ft)", Transmission: "4-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3800, Notes: "Light duty utility limit." }
      ];
    }
    if (year <= 2010) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8 (390 hp / 407 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10450, Notes: "Coil-spring rear suspension with Class IV hitch." },
        { TrimName: "Standard / Regular Model (4.7L V8)", Engine: "4.7L V8 (310 hp / 330 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7500, Notes: "Standard V8 configuration." }
      ];
    }
    if (year <= 2018) {
      const trims = [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8 (395 hp / 410 lb-ft)", Transmission: "8-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10650, Notes: "TorqueFlite 8-speed automatic with 3.92 rear axle." },
        { TrimName: "Standard / Regular Model (3.6L Pentastar V6)", Engine: "3.6L V6 (305 hp / 269 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7300, Notes: "Light duty utility hauling." }
      ];
      if (year >= 2014) {
        trims.splice(1, 0, {
          TrimName: "3.0L EcoDiesel V6",
          Engine: "3.0L Turbo Diesel V6 (240 hp / 420 lb-ft)",
          Transmission: "8-Speed Automatic",
          Drivetrain: "4WD / RWD",
          "Max Towing Capacity": 9200,
          Notes: "Available 2014–2018: High efficiency turbo-diesel highway hauler."
        });
      }
      return trims;
    }
    if (year <= 2024) {
      return [
        { TrimName: "5.7L HEMI V8 with eTorque (Max Tow Package)", Engine: "5.7L HEMI V8 with eTorque (395 hp / 410 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12750, Notes: "Class IV hitch receiver with 3.92 axle ratio." },
        { TrimName: "3.0L EcoDiesel V6", Engine: "3.0L Turbo Diesel V6 (260 hp / 480 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12560, Notes: "Max diesel towing capacity." },
        { TrimName: "Standard / Regular Model (3.6L Pentastar V6 with eTorque)", Engine: "3.6L V6 (305 hp / 269 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7730, Notes: "Standard light-duty utility limit." }
      ];
    }
    // 2025+ (Hurricane introduced in 2025!)
    return [
      { TrimName: "3.0L Hurricane Twin-Turbo I-6 (Tow Package)", Engine: "3.0L Hurricane Twin-Turbo Inline-6 (420 hp / 469 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11580, Notes: "Introduced in 2025: High-output twin-turbo inline 6 powertrain." },
      { TrimName: "Standard / Regular Model (3.6L Pentastar V6)", Engine: "3.6L Pentastar V6 with eTorque (305 hp / 269 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8100, Notes: "Standard utility towing limit." }
    ];
  }

  // ==========================================
  // 8. RAM 2500
  // ==========================================
  if (mkL === "ram" && mL.includes("2500")) {
    if (year <= 2018) {
      return [
        { TrimName: "6.7L Cummins Turbo Diesel I-6", Engine: "6.7L Cummins Turbo Diesel (370 hp / 800 lb-ft)", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 17980, Notes: "Class V receiver hitch with exhaust brake." },
        { TrimName: "Standard / Regular Model (6.4L Heavy-Duty HEMI V8)", Engine: "6.4L HEMI V8 (410 hp / 429 lb-ft)", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 16300, Notes: "Heavy-duty commercial gas hauler." }
      ];
    }
    return [
      { TrimName: "6.7L Cummins Turbo Diesel I-6", Engine: "6.7L Cummins Turbo Diesel (370 hp / 850 lb-ft)", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 19980, Notes: "Class V receiver hitch with integrated trailer brake controller." },
      { TrimName: "Standard / Regular Model (6.4L Heavy-Duty HEMI V8)", Engine: "6.4L HEMI V8 (410 hp / 429 lb-ft)", Transmission: "8-Speed Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 17730, Notes: "TorqueFlite 8-speed automatic gas workhorse." }
    ];
  }

  // ==========================================
  // 9. TOYOTA TACOMA
  // ==========================================
  if (mkL === "toyota" && mL === "tacoma") {
    if (year <= 2004) {
      return [
        { TrimName: "Standard / Regular Model (3.4L V6 Tow Package)", Engine: "3.4L 5VZ-FE V6 (190 hp / 220 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Class III receiver hitch with auxiliary oil cooler." },
        { TrimName: "Standard / Regular Model (2.4L / 2.7L 4-Cylinder)", Engine: "4-Cylinder Gas", Transmission: "4-Speed Automatic / Manual", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3500, Notes: "Light duty utility limit." }
      ];
    }
    if (year <= 2015) {
      return [
        { TrimName: "Standard / Regular Model (4.0L V6 Tow Package)", Engine: "4.0L 1GR-FE V6 (236 hp / 266 lb-ft)", Transmission: "5-Speed Automatic / 6-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Class IV hitch with engine oil cooler, transmission cooler, and 130A alternator." },
        { TrimName: "Standard / Regular Model (2.7L 4-Cylinder)", Engine: "2.7L 2TR-FE 4-Cylinder (159 hp / 180 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3500, Notes: "Standard 4-cylinder bumper pull limit." }
      ];
    }
    if (year <= 2023) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Tow Package)", Engine: "3.5L 2GR-FKS V6 (278 hp / 265 lb-ft)", Transmission: "6-Speed Automatic / 6-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6800, Notes: "Class IV hitch, transmission cooler, engine oil cooler, and trailer sway control." },
        { TrimName: "Standard / Regular Model (2.7L 4-Cylinder)", Engine: "2.7L 4-Cylinder (159 hp / 180 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3500, Notes: "Standard bumper-rated limit." }
      ];
    }
    // 2024+ (i-FORCE MAX introduced in 2024!)
    return [
      { TrimName: "i-FORCE 2.4L Turbo (Factory Tow Package)", Engine: "2.4L Turbocharged I-4 (278 hp / 317 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6500, Notes: "Class IV hitch with integrated brake controller." },
      { TrimName: "i-FORCE MAX 2.4L Turbo Hybrid", Engine: "2.4L Turbo Hybrid (326 hp / 465 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Introduced in 2024: Hybrid powertrain rating." },
      { TrimName: "Standard / Regular Model (2.4L Turbo Base)", Engine: "2.4L Turbo I-4 (228 hp / 243 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 3500, Notes: "Standard bumper limit." }
    ];
  }

  // ==========================================
  // 10. TOYOTA TUNDRA
  // ==========================================
  if (mkL === "toyota" && (mL === "tundra" || mL === "tundra")) {
    if (year <= 2004) {
      return [
        { TrimName: "Standard / Regular Model (4.7L 2UZ-FE V8 Tow Package)", Engine: "4.7L i-FORCE V8 (245 hp / 315 lb-ft)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7200, Notes: "Class IV hitch with transmission fluid cooler." },
        { TrimName: "Standard / Regular Model (3.4L V6)", Engine: "3.4L 5VZ-FE V6 (190 hp / 220 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "RWD", "Max Towing Capacity": 5000, Notes: "Standard V6 limit." }
      ];
    }
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (4.7L V8 with VVT-i)", Engine: "4.7L V8 (282 hp / 325 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7100, Notes: "5-speed automatic with auxiliary cooler." },
        { TrimName: "Standard / Regular Model (4.0L V6)", Engine: "4.0L 1GR-FE V6 (245 hp / 282 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 5000, Notes: "Standard V6 limit." }
      ];
    }
    if (year <= 2021) {
      return [
        { TrimName: "5.7L 3UR-FE V8 (Factory Tow Package)", Engine: "5.7L i-FORCE V8 (381 hp / 401 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10200, Notes: "Class IV hitch, 4.30 axle ratio, TOW/HAUL mode, and auxiliary coolers." },
        { TrimName: "Standard / Regular Model (4.6L / 4.7L V8)", Engine: "4.6L / 4.7L V8 (310 hp / 327 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8600, Notes: "Mid-tier V8 towing configuration." },
        { TrimName: "Standard / Regular Model (4.0L V6)", Engine: "4.0L V6", Transmission: "5-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 4900, Notes: "Standard base utility limit." }
      ];
    }
    // 2022+ (i-FORCE MAX introduced in 2022!)
    return [
      { TrimName: "i-FORCE 3.4L Twin-Turbo V6 (Factory Tow Package)", Engine: "3.4L Twin-Turbo V6 (389 hp / 479 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12000, Notes: "Class IV hitch with integrated trailer brake controller." },
      { TrimName: "i-FORCE MAX 3.4L Twin-Turbo V6 Hybrid", Engine: "3.4L Twin-Turbo Hybrid (437 hp / 583 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11450, Notes: "Introduced in 2022: Hybrid electric powertrain with instant low-end torque." },
      { TrimName: "Standard / Regular Model (SR Base 3.4L Twin-Turbo V6)", Engine: "3.4L Twin-Turbo V6 (348 hp / 405 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 8300, Notes: "Base de-tuned SR work truck rating." }
    ];
  }

  // ==========================================
  // 11. TOYOTA 4RUNNER
  // ==========================================
  if (mkL === "toyota" && mL === "4runner") {
    if (year <= 2002) {
      return [
        { TrimName: "Standard / Regular Model (3.4L V6 Tow Package)", Engine: "3.4L 5VZ-FE V6 (183 hp / 217 lb-ft)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Factory weight-distributing Class III hitch." },
        { TrimName: "Standard / Regular Model (2.7L 4-Cylinder)", Engine: "2.7L 4-Cylinder", Transmission: "4-Speed Automatic / Manual", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Base 4-cylinder limit." }
      ];
    }
    if (year <= 2009) {
      return [
        { TrimName: "4.7L 2UZ-FE V8 (Factory Tow Package)", Engine: "4.7L i-FORCE V8 (235–260 hp / 320–306 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7300, Notes: "Weight-distributing hitch with transmission cooler. Best-in-class 4Runner tow rating." },
        { TrimName: "Standard / Regular Model (4.0L 1GR-FE V6)", Engine: "4.0L V6 (245 hp / 282 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Weight-carrying hitch with 5,000 lbs rating." }
      ];
    }
    if (year <= 2024) {
      return [
        { TrimName: "Standard / Regular Model (4.0L V6 Factory Tow Package)", Engine: "4.0L 1GR-FE Dual VVT-i V6 (270 hp / 278 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Standard Class III receiver hitch with transmission fluid cooler." }
      ];
    }
    // 2025+ (6th Gen)
    return [
      { TrimName: "i-FORCE 2.4L Turbo (Factory Tow Package)", Engine: "2.4L Turbocharged I-4 (278 hp / 317 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Introduced in 2025: Class IV hitch with trailer brake controller." },
      { TrimName: "i-FORCE MAX 2.4L Turbo Hybrid", Engine: "2.4L Turbo Hybrid (326 hp / 465 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Introduced in 2025: High-torque hybrid configuration." }
    ];
  }

  // ==========================================
  // 12. TOYOTA HIGHLANDER
  // ==========================================
  if (mkL === "toyota" && mL === "highlander") {
    if (year <= 2007) {
      return [
        { TrimName: "Standard / Regular Model (3.0L / 3.3L V6 Tow Package)", Engine: "3.0L / 3.3L V6 (220–230 hp)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (2.4L 4-Cylinder)", Engine: "2.4L 4-Cylinder (155–160 hp)", Transmission: "4-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3000, Notes: "Base 4-cylinder rating." }
      ];
    }
    if (year <= 2013) {
      return [
        { TrimName: "Standard / Regular Model (3.5L 2GR-FE V6 Tow Prep Package)", Engine: "3.5L V6 (270 hp / 248 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 5000, Notes: "Heavy-duty radiator and 150A alternator required for 5,000 lbs." },
        { TrimName: "Standard / Regular Model (2.7L 4-Cylinder)", Engine: "2.7L 4-Cylinder (187 hp)", Transmission: "6-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 1500, Notes: "Light utility limit." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Tow Prep Package)", Engine: "3.5L V6 (295 hp / 263 lb-ft)", Transmission: "8-Speed / 6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 5000, Notes: "Heavy-duty radiator, engine oil cooler, and 200W fan coupling." },
        { TrimName: "Highlander Hybrid AWD", Engine: "3.5L V6 Hybrid (306 hp)", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Hybrid powertrain limit." },
        { TrimName: "Standard / Regular Model (2.7L 4-Cylinder)", Engine: "2.7L 4-Cylinder", Transmission: "6-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 1500, Notes: "Base 4-cylinder limit." }
      ];
    }
    // 2020+
    return [
      { TrimName: "Standard / Regular Model (2.4L Turbo / 3.5L V6 Tow Package)", Engine: "2.4L Turbo / 3.5L V6 Gas", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with trailer sway control." },
      { TrimName: "Highlander Hybrid AWD", Engine: "2.5L 4-Cyl Hybrid (243 hp)", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Hybrid powertrain towing limit." }
    ];
  }

  // ==========================================
  // 13. TOYOTA SEQUOIA
  // ==========================================
  if (mkL === "toyota" && mL === "sequoia") {
    if (year <= 2007) {
      return [
        { TrimName: "Standard / Regular Model (4.7L 2UZ-FE V8 Tow Package)", Engine: "4.7L V8 (240–273 hp / 315–314 lb-ft)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Class IV hitch with transmission cooler." }
      ];
    }
    if (year <= 2022) {
      return [
        { TrimName: "Standard / Regular Model (5.7L 3UR-FE V8 Tow Package)", Engine: "5.7L V8 (381 hp / 401 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7400, Notes: "Class IV hitch with TOW/HAUL mode." },
        { TrimName: "Standard / Regular Model (4.6L / 4.7L V8)", Engine: "4.6L / 4.7L V8 (310 hp)", Transmission: "6-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 6700, Notes: "Standard V8 configuration." }
      ];
    }
    // 2023+ (Gen 3)
    return [
      { TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid (Tow Package)", Engine: "3.4L Twin-Turbo Hybrid (437 hp / 583 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9520, Notes: "Introduced in 2023: High-capacity Class IV hitch with load-leveling air suspension." }
    ];
  }

  // ==========================================
  // 14. TOYOTA RAV4
  // ==========================================
  if (mkL === "toyota" && mL === "rav4") {
    if (year <= 2005) {
      return [
        { TrimName: "Standard / Regular Model (2.0L / 2.4L 4-Cylinder)", Engine: "2.0L / 2.4L 4-Cylinder (148–161 hp)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) hitch rating." }
      ];
    }
    if (year <= 2012) {
      return [
        { TrimName: "3.5L 2GR-FE V6 (Tow Prep Package)", Engine: "3.5L DOHC V6 (269 hp / 246 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Includes heavy-duty radiator, larger cooling fan, and 150A alternator." },
        { TrimName: "Standard / Regular Model (2.4L / 2.5L 4-Cylinder)", Engine: "4-Cylinder Gas (166–179 hp)", Transmission: "4-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Standard 4-cylinder limit." }
      ];
    }
    if (year <= 2018) {
      const trims = [
        { TrimName: "Standard / Regular Model (2.5L 4-Cylinder)", Engine: "2.5L 4-Cylinder (176 hp / 172 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating." }
      ];
      if (year >= 2018) {
        trims.unshift({
          TrimName: "Adventure AWD (Factory Tow Package)",
          Engine: "2.5L 4-Cylinder (176 hp / 172 lb-ft)",
          Transmission: "6-Speed Automatic",
          Drivetrain: "AWD",
          "Max Towing Capacity": 3500,
          Notes: "Introduced for 2018: Upgraded radiator and transmission cooler."
        });
      }
      if (year >= 2016) {
        trims.push({
          TrimName: "RAV4 Hybrid AWD",
          Engine: "2.5L Hybrid (194 hp)",
          Transmission: "eCVT",
          Drivetrain: "AWD",
          "Max Towing Capacity": 1750,
          Notes: "Hybrid electric powertrain limit."
        });
      }
      return trims;
    }
    // 2019+
    const trims = [
      { TrimName: "Adventure / TRD Off-Road (Factory Tow Package)", Engine: "2.5L Dynamic Force I-4 (203 hp / 184 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Includes auxiliary engine oil cooler and transmission cooler." },
      { TrimName: "RAV4 Hybrid AWD", Engine: "2.5L Hybrid (219 hp)", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 1750, Notes: "Electronic On-Demand AWD hybrid limit." },
      { TrimName: "Standard / Regular Model (2.5L Gas)", Engine: "2.5L 4-Cylinder (203 hp)", Transmission: "8-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard Class I rating with trailer brakes." }
    ];
    if (year >= 2021) {
      trims.splice(1, 0, {
        TrimName: "RAV4 Prime Plug-In Hybrid",
        Engine: "2.5L PHEV (302 hp)",
        Transmission: "eCVT",
        Drivetrain: "AWD",
        "Max Towing Capacity": 2500,
        Notes: "Introduced in 2021: Plug-in hybrid with enhanced electric cooling."
      });
    }
    return trims;
  }

  // ==========================================
  // 15. HONDA CR-V
  // ==========================================
  if (mkL === "honda" && mL === "cr-v") {
    if (year <= 2001) {
      return [
        { TrimName: "Standard / Regular Model (2.0L 4-Cylinder)", Engine: "2.0L B20Z 4-Cylinder (146 hp / 133 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "Real-Time 4WD / FWD", "Max Towing Capacity": 1000, Notes: "Class I hitch. 100 lbs tongue weight." }
      ];
    }
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (2.4L 4-Cylinder)", Engine: "2.4L K24A1 i-VTEC (160 hp / 162 lb-ft)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "Real-Time 4WD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating with trailer brakes." }
      ];
    }
    if (year <= 2016) {
      return [
        { TrimName: "Standard / Regular Model (2.4L 4-Cylinder)", Engine: "2.4L K24 4-Cylinder (166–185 hp)", Transmission: "5-Speed Automatic / CVT", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating with trailer brakes." }
      ];
    }
    if (year <= 2022) {
      const trims = [
        { TrimName: "Standard / Regular Model (1.5L Turbo 4-Cylinder)", Engine: "1.5L Turbo I-4 (190 hp / 179 lb-ft)", Transmission: "CVT", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch with trailer sway control." }
      ];
      if (year >= 2020) {
        trims.push({
          TrimName: "CR-V Hybrid AWD",
          Engine: "2.0L Hybrid (212 hp)",
          Transmission: "eCVT",
          Drivetrain: "AWD",
          "Max Towing Capacity": 1000,
          Notes: "Available 2020+: Hybrid electric powertrain rating."
        });
      }
      return trims;
    }
    // 2023+
    return [
      { TrimName: "Standard / Regular Model (1.5L Turbo 4-Cylinder)", Engine: "1.5L Turbo I-4 (190 hp)", Transmission: "CVT", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch." },
      { TrimName: "CR-V Hybrid Sport AWD", Engine: "2.0L Hybrid (204 hp)", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 1000, Notes: "Hybrid powertrain towing limit." }
    ];
  }

  // ==========================================
  // 16. HONDA PILOT
  // ==========================================
  if (mkL === "honda" && mL === "pilot") {
    if (year <= 2008) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 4WD Tow Package)", Engine: "3.5L J35 V6 (240–244 hp / 242–240 lb-ft)", Transmission: "5-Speed Automatic with Auxiliary ATF Cooler", Drivetrain: "4WD", "Max Towing Capacity": 4500, Notes: "Factory ATF cooler and power steering cooler required for 4,500 lbs (3,500 lbs standard)." },
        { TrimName: "Standard / Regular Model (3.5L V6 2WD)", Engine: "3.5L V6", Transmission: "5-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
      ];
    }
    if (year <= 2015) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 4WD Factory Tow Package)", Engine: "3.5L V6 i-VTEC (250 hp / 253 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 4500, Notes: "Integrated Class III receiver hitch and ATF cooler." },
        { TrimName: "Standard / Regular Model (3.5L V6 2WD)", Engine: "3.5L V6", Transmission: "5-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive limit." }
      ];
    }
    if (year <= 2022) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 AWD with ATF Cooler)", Engine: "3.5L V6 Direct Injection (280 hp / 262 lb-ft)", Transmission: "6-Speed / 9-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Accessory ATF cooler required for 5,000 lbs (3,500 lbs without cooler)." },
        { TrimName: "Standard / Regular Model (3.5L V6 2WD)", Engine: "3.5L V6", Transmission: "Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
      ];
    }
    // 2023+ (Gen 4)
    return [
      { TrimName: "Standard / Regular Model (3.5L V6 AWD Factory Tow Package)", Engine: "3.5L DOHC V6 (285 hp / 262 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Factory Class III hitch with 5,000 lbs rating standard on AWD." },
      { TrimName: "Standard / Regular Model (3.5L V6 2WD)", Engine: "3.5L V6", Transmission: "10-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive limit." }
    ];
  }

  // ==========================================
  // 17. JEEP GRAND CHEROKEE
  // ==========================================
  if (mkL === "jeep" && mL.includes("grand cherokee")) {
    if (year <= 2004) {
      return [
        { TrimName: "4.7L PowerTech V8 (Class IV Tow Package)", Engine: "4.7L PowerTech V8 (235–265 hp / 295–325 lb-ft)", Transmission: "5-Speed 545RFE Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Class IV hitch with factory heavy-duty cooling." },
        { TrimName: "Standard / Regular Model (4.0L Inline-6)", Engine: "4.0L PowerTech I-6 (195 hp / 230 lb-ft)", Transmission: "4-Speed 42RE Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Standard inline 6 towing rating." }
      ];
    }
    if (year <= 2010) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8 (330–357 hp / 375–389 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7200, Notes: "Class IV hitch with auxiliary transmission fluid cooler." },
        { TrimName: "Standard / Regular Model (4.7L V8)", Engine: "4.7L V8 (235–305 hp)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Standard V8 configuration." },
        { TrimName: "Standard / Regular Model (3.7L V6)", Engine: "3.7L V6 (210 hp / 235 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 3500, Notes: "Base V6 limit." }
      ];
    }
    if (year <= 2021) {
      const trims = [
        { TrimName: "5.7L HEMI V8 (Trailer Tow Group IV)", Engine: "5.7L HEMI V8 (360 hp / 390 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7200, Notes: "Class IV hitch with load-leveling rear suspension." },
        { TrimName: "Standard / Regular Model (3.6L Pentastar V6 Tow Package)", Engine: "3.6L Pentastar V6 (290–295 hp / 260 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6200, Notes: "Standard Class IV hitch rating." }
      ];
      if (year >= 2014 && year <= 2019) {
        trims.splice(1, 0, {
          TrimName: "3.0L EcoDiesel V6",
          Engine: "3.0L Turbo Diesel V6 (240 hp / 420 lb-ft)",
          Transmission: "8-Speed Automatic",
          Drivetrain: "4WD",
          "Max Towing Capacity": 7400,
          Notes: "Available 2014–2019: Class-leading midsize SUV towing capacity."
        });
      }
      return trims;
    }
    // 2022+ (4xe introduced in 2022 for Grand Cherokee!)
    const trims = [
      { TrimName: "2.0L Turbo 4xe PHEV", Engine: "2.0L Turbocharged Plug-In Hybrid (375 hp / 470 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Introduced in 2022: Electrified PHEV powertrain limit." },
      { TrimName: "Standard / Regular Model (3.6L Pentastar V6 Tow Package)", Engine: "3.6L Pentastar V6 (293 hp / 260 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6200, Notes: "Standard Class IV hitch rating." }
    ];
    if (year <= 2023) {
      trims.unshift({
        TrimName: "5.7L HEMI V8 (Trailer Tow Group)",
        Engine: "5.7L HEMI V8 (357 hp / 390 lb-ft)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 7200,
        Notes: "Class IV hitch with quadra-lift air suspension."
      });
    }
    return trims;
  }

  // ==========================================
  // 18. JEEP WRANGLER
  // ==========================================
  if (mkL === "jeep" && mL === "wrangler") {
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (4.0L Inline-6 Class II Tow)", Engine: "4.0L PowerTech I-6 (190 hp / 235 lb-ft)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "4WD", "Max Towing Capacity": 2000, Notes: "TJ generation (2-Door only). Class II hitch limit: 2,000 lbs." },
        { TrimName: "Standard / Regular Model (2.4L / 2.5L 4-Cylinder)", Engine: "4-Cylinder Gas", Transmission: "Manual / Automatic", Drivetrain: "4WD", "Max Towing Capacity": 1000, Notes: "Base 4-cylinder limit." }
      ];
    }
    if (year <= 2011) {
      return [
        { TrimName: "Unlimited 4-Door (3.8L V6 Tow Package)", Engine: "3.8L V6 (205 hp / 240 lb-ft)", Transmission: "4-Speed Automatic / 6-Speed Manual", Drivetrain: "4WD", "Max Towing Capacity": 3500, Notes: "JK Unlimited 4-Door with 3.73/4.10 axle ratio." },
        { TrimName: "Standard / Regular Model 2-Door (3.8L V6)", Engine: "3.8L V6", Transmission: "Automatic / Manual", Drivetrain: "4WD", "Max Towing Capacity": 2000, Notes: "Short wheelbase limit." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "Unlimited 4-Door (3.6L Pentastar V6 Tow Package)", Engine: "3.6L Pentastar V6 (285 hp / 260 lb-ft)", Transmission: "5-Speed Automatic / 6-Speed Manual", Drivetrain: "4WD", "Max Towing Capacity": 3500, Notes: "JK Unlimited 4-Door with 3.73 axle ratio." },
        { TrimName: "Standard / Regular Model 2-Door (3.6L V6)", Engine: "3.6L Pentastar V6", Transmission: "5-Speed Automatic / Manual", Drivetrain: "4WD", "Max Towing Capacity": 2000, Notes: "Short wheelbase 2-door limit." }
      ];
    }
    // 2018+ (4xe introduced in 2021!)
    const trims = [
      { TrimName: "Unlimited 4-Door (Tow Package)", Engine: "2.0L Turbo / 3.6L V6 Gas", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": year >= 2024 ? 5000 : 3500, Notes: year >= 2024 ? "Rubicon full-float Dana 44 HD rear axle rated for 5,000 lbs (3,500 lbs standard)." : "Class II hitch rating with trailer sway damping." },
      { TrimName: "Standard / Regular Model 2-Door", Engine: "2.0L Turbo / 3.6L V6 Gas", Transmission: "8-Speed Automatic / 6-Speed Manual", Drivetrain: "4WD", "Max Towing Capacity": 2000, Notes: "Short wheelbase 2-door limit." }
    ];
    if (year >= 2021) {
      trims.splice(1, 0, {
        TrimName: "Wrangler 4xe Plug-In Hybrid",
        Engine: "2.0L Turbocharged Plug-In Hybrid (375 hp)",
        Transmission: "8-Speed Automatic",
        Drivetrain: "4WD",
        "Max Towing Capacity": 3500,
        Notes: "Introduced in 2021: Electrified 4xe plug-in hybrid towing limit."
      });
    }
    return trims;
  }

  // ==========================================
  // 19. DODGE DURANGO
  // ==========================================
  if (mkL === "dodge" && mL === "durango") {
    if (year <= 2003) {
      return [
        { TrimName: "Standard / Regular Model (5.9L Magnum V8 Tow Package)", Engine: "5.9L Magnum V8 (245–250 hp / 335–345 lb-ft)", Transmission: "4-Speed 46RE Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7550, Notes: "Class IV receiver hitch with heavy-duty cooling." },
        { TrimName: "Standard / Regular Model (4.7L / 5.2L V8)", Engine: "PowerTech / Magnum V8", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5900, Notes: "Standard V8 configuration." }
      ];
    }
    if (year <= 2009) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8 (335–345 hp / 370–375 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8950, Notes: "Class IV hitch with 3.92 axle ratio." },
        { TrimName: "Standard / Regular Model (4.7L Magnum V8)", Engine: "4.7L V8 (235–303 hp)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7400, Notes: "Standard V8 towing configuration." },
        { TrimName: "Standard / Regular Model (3.7L V6)", Engine: "3.7L V6", Transmission: "4-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3700, Notes: "Base V6 limit." }
      ];
    }
    // 2011+ (Tow N Go introduced in 2021!)
    const trims = [
      { TrimName: "5.7L HEMI V8 (Trailer Tow Group IV)", Engine: "5.7L HEMI V8 (360 hp / 390 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 7400, Notes: "Class IV receiver hitch with load-leveling suspension." },
      { TrimName: "Standard / Regular Model (3.6L Pentastar V6 Tow Package)", Engine: "3.6L V6 (295 hp / 260 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 6200, Notes: "Class IV hitch with trailer sway damping." }
    ];
    if (year >= 2021) {
      trims.unshift({
        TrimName: "SRT 6.4L V8 / 5.7L V8 (Tow N Go Package)",
        Engine: "6.4L / 5.7L HEMI V8",
        Transmission: "8-Speed Automatic",
        Drivetrain: "AWD",
        "Max Towing Capacity": 8700,
        Notes: "Introduced in 2021: Best-in-class mid-size 3-row towing with Class IV receiver."
      });
    }
    return trims;
  }

  // ==========================================
  // 20. FORD EXPEDITION
  // ==========================================
  if (mkL === "ford" && mL === "expedition") {
    if (year <= 2004) {
      return [
        { TrimName: "Standard / Regular Model (5.4L Triton V8 Tow Package)", Engine: "5.4L Triton V8 (260 hp / 350 lb-ft)", Transmission: "4-Speed 4R70W / 4R100 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8100, Notes: "Class IV hitch with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (4.6L Triton V8)", Engine: "4.6L Triton V8 (232 hp)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5800, Notes: "Standard V8 configuration." }
      ];
    }
    if (year <= 2014) {
      return [
        { TrimName: "Standard / Regular Model (5.4L 3V Triton V8 Tow Package)", Engine: "5.4L 3V V8 (300–310 hp / 365 lb-ft)", Transmission: "6-Speed 6R75 / 6R80 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9200, Notes: "Heavy-duty trailer tow package with integrated trailer brake controller." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "Standard / Regular Model (3.5L EcoBoost V6 Heavy-Duty Tow)", Engine: "3.5L Twin-Turbo V6 (365 hp / 420 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9200, Notes: "Heavy-duty radiator and auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (3.5L EcoBoost Base Tow)", Engine: "3.5L Twin-Turbo V6", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6600, Notes: "Standard configuration without heavy-duty tow package." }
      ];
    }
    // 2018+
    return [
      { TrimName: "3.5L EcoBoost with Heavy-Duty Trailer Tow Package", Engine: "3.5L Twin-Turbo V6 (375–400 hp / 470–480 lb-ft)", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9300, Notes: "Best-in-class full-size SUV towing with Pro Trailer Backup Assist." },
      { TrimName: "Standard / Regular Model (3.5L EcoBoost Base Tow)", Engine: "3.5L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6000, Notes: "Standard bumper/chassis rating without heavy-duty cooling." }
    ];
  }

  // ==========================================
  // 21. FORD EXPLORER
  // ==========================================
  if (mkL === "ford" && mL === "explorer") {
    if (year <= 2005) {
      const trims = [
        { TrimName: "Standard / Regular Model (4.0L Cologne V6 Tow Package)", Engine: "4.0L SOHC V6 (210 hp / 254 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5600, Notes: "Class III hitch with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (Bumper Pull Base)", Engine: "4.0L V6", Transmission: "5-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Standard bumper pull limit." }
      ];
      if (year >= 2002) {
        trims.unshift({
          TrimName: "4.6L Modular V8 (Class III Tow Package)",
          Engine: "4.6L V8 (239 hp / 282 lb-ft)",
          Transmission: "5-Speed Automatic",
          Drivetrain: "4WD / RWD",
          "Max Towing Capacity": 7100,
          Notes: "V8 power with 3.73 axle ratio and heavy-duty cooling."
        });
      }
      return trims;
    }
    if (year <= 2010) {
      return [
        { TrimName: "4.6L 3V V8 (Class III Tow Package)", Engine: "4.6L 3-Valve V8 (292 hp / 300 lb-ft)", Transmission: "6-Speed 6R60 Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7300, Notes: "Class III/IV hitch receiver with 3.73 axle ratio." },
        { TrimName: "Standard / Regular Model (4.0L V6 Tow Package)", Engine: "4.0L V6 (210 hp / 254 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5300, Notes: "Class III tow package." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Class III Tow Package)", Engine: "3.5L Ti-VCT V6 (290 hp / 255 lb-ft)", Transmission: "6-Speed SelectShift Automatic", Drivetrain: "4WD / FWD", "Max Towing Capacity": 5000, Notes: "Class III trailer tow package with engine oil cooler." },
        { TrimName: "3.5L EcoBoost Twin-Turbo V6", Engine: "3.5L Twin-Turbo V6 (365 hp / 350 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5000, Notes: "Sport and Platinum trims with standard Class III hitch." },
        { TrimName: "Standard / Regular Model (2.3L EcoBoost Base)", Engine: "2.3L Turbo I-4 (280 hp)", Transmission: "6-Speed Automatic", Drivetrain: "FWD / 4WD", "Max Towing Capacity": 3000, Notes: "Standard 4-cylinder crossover rating." }
      ];
    }
    // 2020+
    return [
      { TrimName: "3.0L EcoBoost V6 (Class III Tow Package)", Engine: "3.0L Twin-Turbo V6 (365–400 hp / 380–415 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5600, Notes: "Factory Class III receiver hitch and engine oil cooler." },
      { TrimName: "Standard / Regular Model (2.3L EcoBoost with Tow Package)", Engine: "2.3L Turbo I-4 (300 hp / 310 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5300, Notes: "Standard Class III rating with trailer sway control." },
      { TrimName: "Standard / Regular Model (Base Configuration)", Engine: "2.3L Turbo I-4", Transmission: "10-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3000, Notes: "Base configuration without auxiliary oil cooler." }
    ];
  }

  // ==========================================
  // 22. FORD ESCAPE
  // ==========================================
  if (mkL === "ford" && mL === "escape") {
    if (year <= 2012) {
      return [
        { TrimName: "Standard / Regular Model (3.0L Duratec V6 Tow Package)", Engine: "3.0L Duratec V6 (201–240 hp / 196–223 lb-ft)", Transmission: "4-Speed / 6-Speed Automatic", Drivetrain: "4WD / FWD", "Max Towing Capacity": 3500, Notes: "Class II receiver hitch with auxiliary oil cooler." },
        { TrimName: "Standard / Regular Model (2.0L / 2.3L / 2.5L 4-Cylinder)", Engine: "4-Cylinder Gas", Transmission: "Automatic / Manual", Drivetrain: "FWD / 4WD", "Max Towing Capacity": 1500, Notes: "Standard 4-cylinder limit." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "2.0L EcoBoost (Class II Tow Package)", Engine: "2.0L Turbo I-4 (240–245 hp / 270–275 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / FWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with auxiliary transmission cooler." },
        { TrimName: "Standard / Regular Model (1.5L / 1.6L / 2.5L Base)", Engine: "4-Cylinder Gas", Transmission: "6-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 1500, Notes: "Standard crossover rating." }
      ];
    }
    // 2020+
    return [
      { TrimName: "2.0L EcoBoost (Class II Tow Package)", Engine: "2.0L Turbo I-4 (250 hp / 280 lb-ft)", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with auxiliary transmission cooler." },
      { TrimName: "Standard / Regular Model (1.5L EcoBoost / 2.5L Hybrid)", Engine: "1.5L Turbo / 2.5L Hybrid", Transmission: "Automatic / eCVT", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard crossover rating." }
    ];
  }

  // ==========================================
  // 23. TOYOTA SIENNA
  // ==========================================
  if (mkL === "toyota" && mL === "sienna") {
    if (year <= 2003) {
      return [
        { TrimName: "Standard / Regular Model (3.0L 1MZ-FE V6 Tow Package)", Engine: "3.0L V6 (210 hp / 220 lb-ft)", Transmission: "4-Speed Automatic with Heavy-Duty Radiator", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Tow package with heavy-duty radiator and transmission cooler." }
      ];
    }
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (3.3L 3MZ-FE V6 Tow Package)", Engine: "3.3L V6 (230 hp / 242 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3500, Notes: "Factory tow package with transmission fluid cooler." }
      ];
    }
    if (year <= 2020) {
      return [
        { TrimName: "Standard / Regular Model (3.5L 2GR-FE V6 Tow Prep Package)", Engine: "3.5L V6 (266–296 hp / 245–263 lb-ft)", Transmission: "6-Speed / 8-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3500, Notes: "Heavy-duty radiator, transmission cooler, and 150A alternator." }
      ];
    }
    // 2021+ (Hybrid standard)
    return [
      { TrimName: "Standard / Regular Model (2.5L Hybrid Factory Tow Package)", Engine: "2.5L 4-Cylinder Hybrid (245 hp)", Transmission: "eCVT", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Factory Class II receiver hitch standard rating." }
    ];
  }

  // ==========================================
  // 24. HONDA ODYSSEY
  // ==========================================
  if (mkL === "honda" && mL === "odyssey") {
    if (year <= 2004) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Tow Package with ATF Cooler)", Engine: "3.5L V6 (210–240 hp)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Accessory transmission fluid cooler and power steering cooler required for 3,500 lbs." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Tow Package with ATF Cooler)", Engine: "3.5L V6 i-VTEC (244–248 hp)", Transmission: "5-Speed / 6-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Dealer-installed ATF cooler required for 3,500 lbs." }
      ];
    }
    // 2018+
    return [
      { TrimName: "Standard / Regular Model (3.5L V6 Factory Tow Package)", Engine: "3.5L V6 Direct Injection (280 hp / 262 lb-ft)", Transmission: "9-Speed / 10-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Factory Class II hitch with integrated trailer wiring." }
    ];
  }

  // ==========================================
  // 25. CHRYSLER PACIFICA
  // ==========================================
  if (mkL === "chrysler" && mL === "pacifica") {
    if (year <= 2008) {
      return [
        { TrimName: "Standard / Regular Model (3.5L / 3.8L / 4.0L V6 Tow Package)", Engine: "V6 Gas Engine", Transmission: "4-Speed / 6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "First-generation crossover with factory tow prep." }
      ];
    }
    // 2017+ (Minivan)
    return [
      { TrimName: "Standard / Regular Model (3.6L Pentastar V6 Trailer Tow Group)", Engine: "3.6L Pentastar V6 (287 hp / 262 lb-ft)", Transmission: "9-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3600, Notes: "Class II hitch, 220A alternator, heavy-duty radiator, and trailer sway damping." }
    ];
  }

  // ==========================================
  // 26. CHEVROLET TAHOE / SUBURBAN / GMC YUKON
  // ==========================================
  if ((mkL === "chevrolet" || mkL === "gmc") && (mL.includes("tahoe") || mL.includes("suburban") || mL.includes("yukon"))) {
    const isSuburban = mL.includes("suburban") || mL.includes("xl");
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (5.3L Vortec V8 Max Trailering)", Engine: "5.3L Vortec V8 (285–295 hp / 325–335 lb-ft)", Transmission: "4-Speed 4L60-E Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": isSuburban ? 8200 : 8400, Notes: "Class IV hitch with auxiliary transmission fluid cooler and 3.73 rear axle." },
        { TrimName: "Standard / Regular Model (4.8L Vortec V8)", Engine: "4.8L Vortec V8 (275 hp)", Transmission: "4-Speed Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 6500, Notes: "Standard V8 configuration (Tahoe/Yukon only)." }
      ];
    }
    if (year <= 2014) {
      return [
        { TrimName: "Standard / Regular Model (5.3L Vortec V8 Heavy-Duty Tow Package)", Engine: "5.3L V8 (320 hp / 335 lb-ft)", Transmission: "4-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": isSuburban ? 8100 : 8500, Notes: "Heavy-Duty Trailering Package with 3.42 axle ratio and auxiliary cooling." },
        { TrimName: "6.2L Vortec V8 (Denali Tow Package)", Engine: "6.2L V8 (380–403 hp)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / 4WD", "Max Towing Capacity": 8500, Notes: "Luxury hauler with high-capacity cooling." }
      ];
    }
    if (year <= 2020) {
      return [
        { TrimName: "Standard / Regular Model (5.3L EcoTec3 V8 Max Trailering)", Engine: "5.3L V8 (355 hp / 383 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": isSuburban ? 8300 : 8600, Notes: "Max Trailering Package with 3.42 axle ratio and 2-speed transfer case." },
        { TrimName: "6.2L EcoTec3 V8", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8400, Notes: "Available 2018+: 10-speed transmission luxury hauler." },
        { TrimName: "Standard / Regular Model (Standard Towing)", Engine: "5.3L V8", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6600, Notes: "Standard hitch rating without Max Trailering package." }
      ];
    }
    // 2021+
    return [
      { TrimName: "Standard / Regular Model (5.3L EcoTec3 V8 Max Trailering)", Engine: "5.3L V8 (355 hp / 383 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": isSuburban ? 8300 : 8400, Notes: "Max Trailering Package with enhanced cooling radiator and trailer brake controller." },
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering)", Engine: "6.2L V8 (420 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8300, Notes: "High-output V8 hauler." },
      { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L Inline-6 Turbo-Diesel (277 hp / 460 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8200, Notes: "Exceptional continuous highway fuel economy." },
      { TrimName: "Standard / Regular Model (Standard Hitch)", Engine: "5.3L V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Standard Class IV hitch without Max Trailering package." }
    ];
  }

  // ==========================================
  // 27. COMPACT SEDANS & SMALL CARS
  // ==========================================
  if (
    mL === "corolla" || mL === "civic" || mL === "camry" || mL === "accord" ||
    mL === "jetta" || mL === "impreza" || mL === "mazda3" || mL === "elantra" || mL === "forte"
  ) {
    const isSmall = mL === "corolla" || mL === "civic" || mL === "jetta" || mL === "impreza" || mL === "mazda3" || mL === "elantra" || mL === "forte";
    return [
      {
        TrimName: "Standard / Regular Model (Class I Hitch with Trailer Brakes)",
        Engine: "Standard Powertrain",
        Transmission: year <= 2006 ? "4-Speed Automatic / Manual" : year <= 2014 ? "5-Speed / 6-Speed Automatic / CVT" : "CVT / 8-Speed Automatic",
        Drivetrain: mkL === "subaru" ? "Symmetrical AWD" : "Front-Wheel Drive",
        "Max Towing Capacity": 1500,
        Notes: "Class I (1.25-inch) receiver hitch. Tongue weight limit: 150 lbs. Auxiliary trailer brakes required for continuous towing."
      },
      {
        TrimName: "Unbraked Trailer Rating",
        Engine: "Standard Powertrain",
        Transmission: "Automatic / Manual",
        Drivetrain: mkL === "subaru" ? "Symmetrical AWD" : "Front-Wheel Drive",
        "Max Towing Capacity": 1000,
        Notes: "Unbraked utility trailer rating. Avoid long steep highway inclines."
      }
    ];
  }

  // ==========================================
  // 28. ACURA MDX
  // ==========================================
  if (mkL === "acura" && mL === "mdx") {
    if (year <= 2006) {
      return [
        { TrimName: "Standard / Regular Model (3.5L V6 Factory Tow Package)", Engine: "3.5L SOHC VTEC V6 (240–265 hp / 245–253 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "VTM-4 AWD", "Max Towing Capacity": 4500, Notes: "Includes factory transmission fluid cooler and power steering cooler. 4,500 lbs for boat trailers; 3,500 lbs for standard box trailers." },
        { TrimName: "Standard / Regular Model (Base Towing)", Engine: "3.5L V6", Transmission: "5-Speed Automatic", Drivetrain: "VTM-4 AWD", "Max Towing Capacity": 3500, Notes: "Standard uncooled rating." }
      ];
    }
    if (year <= 2013) {
      return [
        { TrimName: "Standard / Regular Model (3.7L VTEC V6 SH-AWD Tow Package)", Engine: "3.7L VTEC V6 (300 hp / 270–275 lb-ft)", Transmission: "5-Speed / 6-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Class III receiver hitch with factory auxiliary ATF cooler." },
        { TrimName: "Standard / Regular Model (Standard Towing)", Engine: "3.7L V6", Transmission: "Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 3500, Notes: "Base rating without auxiliary transmission fluid cooler." }
      ];
    }
    if (year <= 2020) {
      return [
        { TrimName: "Standard / Regular Model (3.5L i-VTEC V6 SH-AWD Tow Package)", Engine: "3.5L i-VTEC V6 (290 hp / 267 lb-ft)", Transmission: "6-Speed / 9-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with dealer-installed ATF cooler." },
        { TrimName: "Standard / Regular Model (FWD)", Engine: "3.5L V6", Transmission: "Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
      ];
    }
    // 2022+ (MDX skipped 2021)
    return [
      { TrimName: "Standard / Regular Model (3.5L V6 SH-AWD Tow Package)", Engine: "3.5L V6 (290 hp / 267 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "Factory accessory Class III hitch with auxiliary transmission fluid cooler." },
      { TrimName: "Type S (3.0L Turbo V6 SH-AWD)", Engine: "3.0L Twin-Scroll Turbo V6 (355 hp / 354 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD", "Max Towing Capacity": 5000, Notes: "High-performance air suspension hauler." },
      { TrimName: "Standard / Regular Model (FWD)", Engine: "3.5L V6", Transmission: "10-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive limit." }
    ];
  }

  // ==========================================
  // 29. ACURA RDX
  // ==========================================
  if (mkL === "acura" && mL === "rdx") {
    if (year <= 2012) {
      return [
        { TrimName: "Standard / Regular Model (2.3L Turbo SH-AWD / FWD)", Engine: "2.3L Turbocharged I-4 (240 hp / 260 lb-ft)", Transmission: "5-Speed Automatic", Drivetrain: "SH-AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch with auxiliary trailer brakes." }
      ];
    }
    if (year <= 2018) {
      return [
        { TrimName: "Standard / Regular Model (3.5L i-VTEC V6 AWD / FWD)", Engine: "3.5L V6 (273–279 hp / 251–252 lb-ft)", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating for light cargo, bicycle racks, or lightweight utility." }
      ];
    }
    // 2019+
    return [
      { TrimName: "Standard / Regular Model (2.0L VTEC Turbo SH-AWD / FWD)", Engine: "2.0L Turbo I-4 (272 hp / 280 lb-ft)", Transmission: "10-Speed Automatic", Drivetrain: "SH-AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch. Maximum tongue weight: 150 lbs." }
    ];
  }

  // Default fallback: keep existing or return generic clean trim
  return "UNRELEASED";
}

function generateServerlessVehicles(): Vehicles[] {
  const existingSet = new Set(
    BASE_VEHICLES.map((v) => `${v.Year}__${v.Make.toLowerCase()}__${v.Model.toLowerCase()}`)
  );
  const result: Vehicles[] = [...BASE_VEHICLES];

  for (const template of HISTORICAL_TEMPLATES) {
    const [startYear, endYear] = template.years;
    for (let yr = startYear; yr <= endYear; yr++) {
      const genTrims = getGenerationalTrims(template.make, template.model, yr);
      if (genTrims === "UNRELEASED") continue;

      const key = `${yr}__${template.make.toLowerCase()}__${template.model.toLowerCase()}`;
      const trimsToUse = (Array.isArray(genTrims) ? genTrims : template.trims) as Vehicles["Trim"];

      if (!existingSet.has(key)) {
        result.push({
          Year: yr,
          Make: template.make,
          Model: template.model,
          Trim: trimsToUse,
        });
        existingSet.add(key);
      }
    }
  }

  return result.sort((a, b) => b.Year - a.Year);
}

export const SERVERLESS_VEHICLES: Vehicles[] = generateServerlessVehicles();

