import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

if (!uri) {
  console.error("No TOWING_URI found in environment or .env.local.");
  process.exit(1);
}

// Model templates with trim definitions
const VEHICLE_TEMPLATES = [
  // Full-Size & Heavy-Duty Trucks
  {
    make: "Ford",
    model: "F-150",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.5L V6 EcoBoost (Max Trailer Tow)", Engine: "3.5L V6 Twin-Turbo", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 14000, Notes: "Class IV hitch required. 80% continuous safety limit: 11,200 lbs." },
      { TrimName: "5.0L V8", Engine: "5.0L V8 Coyote", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13000, Notes: "Standard factory tow package. Tongue weight limit: 1,300 lbs." },
      { TrimName: "2.7L V6 EcoBoost", Engine: "2.7L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10100, Notes: "Mid-tier towing configuration. Recommended for boat or camper haulers." },
      { TrimName: "3.5L PowerBoost Full Hybrid", Engine: "3.5L V6 Hybrid", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12700, Notes: "Features onboard Pro Power generator." }
    ]
  },
  {
    make: "Ford",
    model: "F-250 Super Duty",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.7L Power Stroke V8 Turbo Diesel", Engine: "6.7L V8 Turbo Diesel", Transmission: "10-Speed Heavy-Duty TorqShift", Drivetrain: "4WD", "Max Towing Capacity": 22000, Notes: "Class V receiver hitch. Conventional towing limit. 5th-wheel/Gooseneck rated higher." },
      { TrimName: "7.3L V8 Gas (Godzilla)", Engine: "7.3L V8 Gas", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 18200, Notes: "Heavy-duty gas powertrain with auxiliary oil cooling." },
      { TrimName: "6.8L / 6.2L V8 Gas", Engine: "V8 Gas Engine", Transmission: "TorqShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 15000, Notes: "Standard commercial work truck specification." }
    ]
  },
  {
    make: "Ford",
    model: "F-350 Super Duty",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.7L High Output Power Stroke Turbo Diesel DRW", Engine: "6.7L V8 HO Turbo Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD (Dually)", "Max Towing Capacity": 28000, Notes: "Dual Rear Wheel chassis. 80% safety margin: 22,400 lbs." },
      { TrimName: "7.3L V8 Gas SRW", Engine: "7.3L V8 Gas", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 18900, Notes: "Single Rear Wheel heavy hauler." }
    ]
  },
  {
    make: "Ford",
    model: "Ranger",
    years: [2000, 2026],
    trims: [
      { TrimName: "2.3L EcoBoost with Factory Tow Package", Engine: "2.3L Turbo I-4", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7500, Notes: "Class III/IV hitch with trailer brake controller." },
      { TrimName: "Standard Powertrain (Bumper Pull)", Engine: "Gas Engine", Transmission: "Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Unbraked/standard bumper pull limit." }
    ]
  },
  {
    make: "Chevrolet",
    model: "Silverado 1500",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering Package)", Engine: "6.2L V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13300, Notes: "Max Trailering Package with enhanced cooling and 3.42 rear axle ratio." },
      { TrimName: "5.3L EcoTec3 V8", Engine: "5.3L V8", Transmission: "10-Speed / 8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11500, Notes: "Class IV receiver hitch. Recommended tongue weight: 1,150 lbs." },
      { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L Inline-6 Turbo-Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13300, Notes: "Exceptional fuel economy and low-end torque for continuous highway towing." },
      { TrimName: "2.7L Turbo / 4.3L V6", Engine: "Turbo I-4 / V6", Transmission: "Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 9500, Notes: "Standard towing configuration." }
    ]
  },
  {
    make: "Chevrolet",
    model: "Silverado 2500HD",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.6L Duramax Turbo-Diesel V8", Engine: "6.6L V8 Turbo-Diesel", Transmission: "Allison 10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 22500, Notes: "Class V receiver hitch. Integrated trailer brake control." },
      { TrimName: "6.6L V8 Gas", Engine: "6.6L V8 Gas", Transmission: "Allison 10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 16000, Notes: "Heavy-duty gas work truck configuration." }
    ]
  },
  {
    make: "Chevrolet",
    model: "Colorado",
    years: [2004, 2026],
    trims: [
      { TrimName: "2.7L Turbo High-Output / 3.6L V6 (Tow Package)", Engine: "Turbo I-4 / V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Best-in-class midsize pickup towing with factory tow package." },
      { TrimName: "Standard Trim (No Tow Package)", Engine: "Standard Powertrain", Transmission: "Automatic", Drivetrain: "2WD / 4WD", "Max Towing Capacity": 3500, Notes: "Bumper hitch limit without auxiliary cooling." }
    ]
  },
  {
    make: "GMC",
    model: "Sierra 1500",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.2L EcoTec3 V8 (Max Trailering)", Engine: "6.2L V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13200, Notes: "Class IV hitch with enhanced cooling and trailer brake controller." },
      { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L I-6 Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 13200, Notes: "High-torque diesel hauler." },
      { TrimName: "5.3L V8", Engine: "5.3L V8", Transmission: "Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11200, Notes: "Standard V8 tow package." }
    ]
  },
  {
    make: "GMC",
    model: "Sierra 2500HD",
    years: [2000, 2026],
    trims: [
      { TrimName: "6.6L Duramax Turbo-Diesel V8", Engine: "6.6L V8 Turbo-Diesel", Transmission: "Allison 10-Speed", Drivetrain: "4WD", "Max Towing Capacity": 22500, Notes: "Class V heavy hauler." },
      { TrimName: "6.6L V8 Gas", Engine: "6.6L V8 Gas", Transmission: "Allison 10-Speed", Drivetrain: "4WD", "Max Towing Capacity": 16000, Notes: "Heavy-duty commercial spec." }
    ]
  },
  {
    make: "RAM",
    model: "1500",
    years: [2011, 2026],
    trims: [
      { TrimName: "5.7L HEMI V8 with eTorque (Max Tow Package)", Engine: "5.7L HEMI V8", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12750, Notes: "Class IV hitch receiver. 3.92 axle ratio required." },
      { TrimName: "3.0L Hurricane Twin-Turbo I-6", Engine: "3.0L Twin-Turbo I-6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11580, Notes: "Modern twin-turbo inline 6 powertrain." },
      { TrimName: "3.6L Pentastar V6 with eTorque", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7730, Notes: "Light duty utility hauling." }
    ]
  },
  {
    make: "Dodge",
    model: "Ram 1500",
    years: [2000, 2010],
    trims: [
      { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9100, Notes: "Class IV hitch with factory heavy-duty transmission cooler." },
      { TrimName: "4.7L V8 / 3.7L V6", Engine: "4.7L V8 / 3.7L V6", Transmission: "Automatic", Drivetrain: "RWD / 4WD", "Max Towing Capacity": 6500, Notes: "Standard bed trailer towing." }
    ]
  },
  {
    make: "RAM",
    model: "2500",
    years: [2011, 2026],
    trims: [
      { TrimName: "6.7L Cummins Turbo Diesel I-6", Engine: "6.7L Cummins Turbo Diesel", Transmission: "6-Speed Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 19980, Notes: "Class V receiver hitch with exhaust brake." },
      { TrimName: "6.4L Heavy-Duty HEMI V8", Engine: "6.4L HEMI V8", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 17730, Notes: "Heavy-duty gas workhorse." }
    ]
  },
  {
    make: "Toyota",
    model: "Tacoma",
    years: [2000, 2026],
    trims: [
      { TrimName: "i-FORCE MAX 2.4L Turbo Hybrid / 3.5L V6 (Tow Package)", Engine: "2.4L Turbo Hybrid / 3.5L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6500, Notes: "Factory Class IV hitch, engine oil cooler, and trailer sway control." },
      { TrimName: "Standard 2.4L Turbo / 2.7L 4-Cyl", Engine: "4-Cyl Gas", Transmission: "Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 3500, Notes: "Bumper-rated light utility towing." }
    ]
  },
  {
    make: "Toyota",
    model: "Tundra",
    years: [2000, 2026],
    trims: [
      { TrimName: "i-FORCE MAX 3.4L Twin-Turbo V6 Hybrid / 5.7L V8", Engine: "3.4L Twin-Turbo Hybrid / 5.7L V8", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12000, Notes: "Factory integrated trailer brake controller and Class IV hitch." },
      { TrimName: "Standard 3.4L Twin-Turbo V6 / 4.6L V8", Engine: "V6 / V8 Gas", Transmission: "Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10200, Notes: "Standard full-size towing package." }
    ]
  },
  {
    make: "Nissan",
    model: "Frontier",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.8L V6 / 4.0L V6 with Factory Tow Package", Engine: "V6 Gas", Transmission: "9-Speed / 5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6720, Notes: "Class III receiver hitch with auxiliary oil cooler." },
      { TrimName: "Standard Configuration", Engine: "Gas Engine", Transmission: "Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Light duty utility limit." }
    ]
  },
  {
    make: "Nissan",
    model: "Titan",
    years: [2004, 2024],
    trims: [
      { TrimName: "5.6L Endurance V8 (Tow Package)", Engine: "5.6L V8", Transmission: "9-Speed / 7-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 9320, Notes: "Class IV hitch with trailer brake controller." },
      { TrimName: "Titan XD Heavy-Duty", Engine: "5.6L V8 / 5.0L Cummins Diesel", Transmission: "Heavy-Duty Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11050, Notes: "Heavy-duty chassis frame." }
    ]
  },
  {
    make: "Jeep",
    model: "Gladiator",
    years: [2020, 2026],
    trims: [
      { TrimName: "3.6L Pentastar V6 (Max Tow Package)", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Class IV receiver hitch, 4.10 axle ratio, 240-amp alternator." },
      { TrimName: "3.0L EcoDiesel V6", Engine: "3.0L Turbo Diesel V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6500, Notes: "High torque diesel configuration." }
    ]
  },
  {
    make: "Honda",
    model: "Ridgeline",
    years: [2006, 2026],
    trims: [
      { TrimName: "3.5L V6 AWD with Heavy-Duty Transmission Cooler", Engine: "3.5L V6 i-VTEC", Transmission: "9-Speed / 6-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch standard on AWD. Recommended for boats and campers under 5,000 lbs." },
      { TrimName: "3.5L V6 2WD (Standard)", Engine: "3.5L V6", Transmission: "Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Front-wheel drive towing limit." }
    ]
  },

  // Full-Size & 3-Row SUVs
  {
    make: "Chevrolet",
    model: "Tahoe",
    years: [2000, 2026],
    trims: [
      { TrimName: "5.3L / 6.2L V8 with Max Trailering Package", Engine: "V8 EcoTec3", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8400, Notes: "Full-size body-on-frame SUV. Includes 2-speed transfer case and enhanced cooling." },
      { TrimName: "3.0L Duramax Turbo-Diesel", Engine: "3.0L I-6 Turbo-Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8200, Notes: "Long range turbo-diesel towing." },
      { TrimName: "Standard Configuration (No Max Trailering)", Engine: "5.3L V8", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Standard Class IV hitch receiver." }
    ]
  },
  {
    make: "Chevrolet",
    model: "Suburban",
    years: [2000, 2026],
    trims: [
      { TrimName: "5.3L / 6.2L V8 with Max Trailering Package", Engine: "V8 EcoTec3", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8300, Notes: "Extended wheelbase full-size SUV." },
      { TrimName: "Standard Powertrain", Engine: "5.3L V8", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7600, Notes: "Standard factory tow package." }
    ]
  },
  {
    make: "GMC",
    model: "Yukon",
    years: [2000, 2026],
    trims: [
      { TrimName: "5.3L / 6.2L V8 with Max Trailering Package", Engine: "V8 EcoTec3", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8400, Notes: "Heavy-duty cooling and trailer brake controller." },
      { TrimName: "Yukon XL / Denali Standard", Engine: "6.2L V8", Transmission: "10-Speed Automatic", Drivetrain: "AWD / 4WD", "Max Towing Capacity": 8100, Notes: "Extended body luxury hauler." }
    ]
  },
  {
    make: "Ford",
    model: "Expedition",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.5L EcoBoost with Heavy-Duty Trailer Tow Package", Engine: "3.5L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9300, Notes: "Best-in-class full-size SUV towing with Pro Trailer Backup Assist." },
      { TrimName: "Standard 3.5L EcoBoost / 5.4L V8", Engine: "V6 EcoBoost / V8 Triton", Transmission: "Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Standard bumper/chassis tow rating without heavy-duty cooling." }
    ]
  },
  {
    make: "Ford",
    model: "Explorer",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.0L EcoBoost V6 / 4.0L V6 (Class III Tow Package)", Engine: "Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5600, Notes: "Factory Class III receiver hitch and engine oil cooler." },
      { TrimName: "2.3L EcoBoost with Tow Package", Engine: "2.3L Turbo I-4", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5300, Notes: "Standard Class III rating." },
      { TrimName: "Standard Configuration (Base)", Engine: "I-4 / V6 Gas", Transmission: "Automatic", Drivetrain: "RWD / FWD", "Max Towing Capacity": 3000, Notes: "Base configuration without auxiliary oil cooler." }
    ]
  },
  {
    make: "Toyota",
    model: "4Runner",
    years: [2000, 2026],
    trims: [
      { TrimName: "i-FORCE MAX 2.4L Turbo Hybrid / 4.0L V6 / 4.7L V8", Engine: "V6 / V8 / Turbo Hybrid", Transmission: "8-Speed / 5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Rugged body-on-frame SUV. Standard factory Class III/IV receiver." },
      { TrimName: "Standard 4.0L V6", Engine: "4.0L V6", Transmission: "5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 5000, Notes: "Standard 5,000 lbs continuous tow rating." }
    ]
  },
  {
    make: "Toyota",
    model: "Highlander",
    years: [2001, 2026],
    trims: [
      { TrimName: "2.4L Turbo / 3.5L V6 with Factory Tow Package", Engine: "2.4L Turbo / 3.5L V6", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with heavy-duty radiator and oil cooler." },
      { TrimName: "2.5L Hybrid AWD", Engine: "2.5L 4-Cyl Hybrid", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Hybrid powertrain towing limit." }
    ]
  },
  {
    make: "Toyota",
    model: "Sequoia",
    years: [2001, 2026],
    trims: [
      { TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid / 5.7L V8", Engine: "Twin-Turbo Hybrid / V8", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 9520, Notes: "Body-on-frame full-size SUV with Class IV receiver." }
    ]
  },
  {
    make: "Honda",
    model: "Pilot",
    years: [2003, 2026],
    trims: [
      { TrimName: "3.5L V6 AWD with Transmission Cooler", Engine: "3.5L V6 i-VTEC", Transmission: "10-Speed / 9-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Factory Class III hitch and auxiliary ATF cooler required for 5,000 lbs." },
      { TrimName: "3.5L V6 2WD (Standard)", Engine: "3.5L V6", Transmission: "Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Standard front-wheel drive limit." }
    ]
  },
  {
    make: "Jeep",
    model: "Grand Cherokee",
    years: [2000, 2026],
    trims: [
      { TrimName: "5.7L HEMI V8 with Trailer Tow Group IV", Engine: "5.7L HEMI V8", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 7200, Notes: "Class IV hitch with load-leveling suspension." },
      { TrimName: "3.6L Pentastar V6 with Tow Package", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6200, Notes: "Standard Class IV hitch rating." },
      { TrimName: "2.0L Turbo 4xe PHEV", Engine: "2.0L Turbo Plug-in Hybrid", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "PHEV electrified powertrain limit." }
    ]
  },
  {
    make: "Jeep",
    model: "Wrangler",
    years: [2000, 2026],
    trims: [
      { TrimName: "Unlimited 4-Door (Tow Package)", Engine: "2.0L Turbo / 3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 3500, Notes: "Class II hitch rating with trailer sway damping." },
      { TrimName: "2-Door Standard", Engine: "Gas Engine", Transmission: "Automatic / Manual", Drivetrain: "4WD", "Max Towing Capacity": 2000, Notes: "Short wheelbase limit." }
    ]
  },
  {
    make: "Subaru",
    model: "Outback",
    years: [2000, 2026],
    trims: [
      { TrimName: "2.4L Turbocharged XT / Wilderness", Engine: "2.4L Turbo Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Wilderness trim includes upgraded transmission oil cooler." },
      { TrimName: "2.5L Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Standard crossover rating with trailer brakes." }
    ]
  },
  {
    make: "Subaru",
    model: "Ascent",
    years: [2019, 2026],
    trims: [
      { TrimName: "2.4L Turbo with Class III Tow Package", Engine: "2.4L Turbo Boxer-4", Transmission: "High-Torque CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with auxiliary transmission fluid cooler." },
      { TrimName: "Base Trim (No Cooler)", Engine: "2.4L Turbo Boxer-4", Transmission: "CVT", Drivetrain: "AWD", "Max Towing Capacity": 2000, Notes: "Base configuration without auxiliary cooling." }
    ]
  },
  {
    make: "Subaru",
    model: "Forester",
    years: [2000, 2026],
    trims: [
      { TrimName: "Forester Wilderness (Dual Cooling)", Engine: "2.5L Boxer-4", Transmission: "CVT", Drivetrain: "AWD", "Max Towing Capacity": 3000, Notes: "Wilderness trim features doubled towing capacity with upgraded transmission cooler." },
      { TrimName: "Standard 2.5L Boxer", Engine: "2.5L Boxer-4", Transmission: "CVT / Automatic", Drivetrain: "AWD", "Max Towing Capacity": 1500, Notes: "Class I/II rating with trailer brakes." }
    ]
  },
  {
    make: "Subaru",
    model: "Crosstrek",
    years: [2013, 2026],
    trims: [
      { TrimName: "Crosstrek Wilderness", Engine: "2.5L Boxer-4", Transmission: "CVT", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Upgraded transmission cooler allows up to 3,500 lbs." },
      { TrimName: "Standard 2.0L / 2.5L Boxer", Engine: "2.0L / 2.5L Boxer-4", Transmission: "CVT", Drivetrain: "AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating for teardrop camper or light utility trailer." }
    ]
  },
  {
    make: "Dodge",
    model: "Durango",
    years: [2000, 2026],
    trims: [
      { TrimName: "SRT 6.4L V8 / 5.7L V8 (Tow N Go Package)", Engine: "HEMI V8", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 8700, Notes: "Best-in-class mid-size 3-row towing with Class IV receiver." },
      { TrimName: "3.6L Pentastar V6 with Tow Package", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 6200, Notes: "Class IV hitch with trailer sway damping." }
    ]
  },
  {
    make: "Hyundai",
    model: "Palisade",
    years: [2020, 2026],
    trims: [
      { TrimName: "3.8L V6 with Factory Tow Package", Engine: "3.8L V6", Transmission: "8-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with self-leveling rear suspension." }
    ]
  },
  {
    make: "Kia",
    model: "Telluride",
    years: [2020, 2026],
    trims: [
      { TrimName: "3.8L V6 with Factory Tow Package", Engine: "3.8L V6", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 5500, Notes: "X-Pro trim rated for 5,500 lbs; standard tow package rated for 5,000 lbs." }
    ]
  },

  // Compact SUVs & Crossovers
  {
    make: "Toyota",
    model: "RAV4",
    years: [2000, 2026],
    trims: [
      { TrimName: "Adventure / TRD Off-Road (Tow Package)", Engine: "2.5L 4-Cyl", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Upgraded transmission cooler and radiator." },
      { TrimName: "RAV4 Prime / Hybrid", Engine: "2.5L Hybrid", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 2500, Notes: "Hybrid powertrain rating." },
      { TrimName: "Standard 2.5L Gas", Engine: "2.5L 4-Cyl", Transmission: "Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Standard Class I rating with trailer brakes." }
    ]
  },
  {
    make: "Honda",
    model: "CR-V",
    years: [2000, 2026],
    trims: [
      { TrimName: "1.5L Turbo / 2.4L 4-Cyl (Tow Package)", Engine: "1.5L Turbo / 2.4L 4-Cyl", Transmission: "CVT / Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I 1.25-inch receiver hitch. 150 lbs max tongue weight." },
      { TrimName: "2.0L Hybrid Sport", Engine: "2.0L 4-Cyl Hybrid", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 1000, Notes: "Hybrid electric powertrain rating." }
    ]
  },
  {
    make: "Mazda",
    model: "CX-5",
    years: [2013, 2026],
    trims: [
      { TrimName: "2.5L Turbo AWD (Tow Package)", Engine: "2.5L Turbo I-4", Transmission: "6-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 2000, Notes: "Class I/II receiver hitch rating." },
      { TrimName: "2.5L Naturally Aspirated", Engine: "2.5L I-4", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 2000, Notes: "Recommended for light utility trailers under 2,000 lbs." }
    ]
  },
  {
    make: "Ford",
    model: "Escape",
    years: [2001, 2026],
    trims: [
      { TrimName: "2.0L EcoBoost (Class II Tow Package)", Engine: "2.0L Turbo I-4", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with auxiliary transmission cooler." },
      { TrimName: "1.5L EcoBoost / 2.5L Hybrid", Engine: "1.5L Turbo / 2.5L Hybrid", Transmission: "Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard crossover rating." }
    ]
  },

  // Compact Cars & Sedans (Class I Hitch: 1,000 - 1,500 lbs)
  {
    make: "Toyota",
    model: "Corolla",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch (Trailer Brakes Recommended)", Engine: "1.8L / 2.0L 4-Cylinder", Transmission: "CVT / Manual", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch. Tongue weight limit: 150 lbs. Ideal for single motorcycle, kayak hauler, or light cargo trailer." },
      { TrimName: "Unbraked Trailer Rating", Engine: "1.8L / 2.0L 4-Cylinder", Transmission: "CVT", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1000, Notes: "Unbraked trailer towing limit. Ensure strict adherence to 100 lbs tongue weight." }
    ]
  },
  {
    make: "Toyota",
    model: "Camry",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "2.5L 4-Cyl / 3.5L V6", Transmission: "8-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. Maximum gross trailer weight: 1,500 lbs with auxiliary trailer brakes." }
    ]
  },
  {
    make: "Honda",
    model: "Civic",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch (Trailer Brakes Recommended)", Engine: "1.5L Turbo / 2.0L 4-Cylinder", Transmission: "CVT / 6-Speed Manual", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) receiver hitch. Tongue weight limit: 150 lbs. Auxiliary trailer brakes strongly advised." },
      { TrimName: "Unbraked Trailer Rating", Engine: "1.5L Turbo / 2.0L 4-Cyl", Transmission: "CVT", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1000, Notes: "Unbraked utility trailer rating. Avoid long steep highway inclines." }
    ]
  },
  {
    make: "Honda",
    model: "Accord",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "1.5L / 2.0L Turbo / 3.5L V6", Transmission: "Automatic / CVT", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I hitch. Tongue weight limit: 150 lbs." }
    ]
  },
  {
    make: "Subaru",
    model: "Impreza",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch (Symmetrical AWD)", Engine: "2.0L / 2.5L Boxer-4", Transmission: "Lineartronic CVT / Manual", Drivetrain: "Symmetrical All-Wheel Drive", "Max Towing Capacity": 1500, Notes: "All-wheel drive provides excellent trailer traction on boat ramps and gravel roads. Tongue weight: 150 lbs." }
    ]
  },
  {
    make: "Mazda",
    model: "Mazda3",
    years: [2004, 2026],
    trims: [
      { TrimName: "Class I Hitch (SkyActiv Powertrain)", Engine: "2.0L / 2.5L SkyActiv-G", Transmission: "6-Speed Automatic / Manual", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. Maximum tongue weight: 150 lbs. Keep continuous towing speed under 65 MPH." }
    ]
  },
  {
    make: "Volkswagen",
    model: "Jetta",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "1.4L / 1.5L TSI Turbo", Transmission: "8-Speed Automatic / DSG", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "European engineered chassis rated for light utility towing up to 1,500 lbs with trailer brakes." }
    ]
  },
  {
    make: "Hyundai",
    model: "Elantra",
    years: [2000, 2026],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "2.0L 4-Cyl / 1.6L Turbo", Transmission: "IVT Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch with trailer brakes." }
    ]
  },
  {
    make: "Kia",
    model: "Forte",
    years: [2010, 2026],
    trims: [
      { TrimName: "Class I Hitch Rating", Engine: "2.0L 4-Cyl", Transmission: "IVT / 6-Speed Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch. 150 lbs tongue weight." }
    ]
  },

  // Electric Vehicles (EVs)
  {
    make: "Tesla",
    model: "Model Y",
    years: [2020, 2026],
    trims: [
      { TrimName: "Long Range / Performance (Tow Package)", Engine: "Dual Electric Motors (AWD)", Transmission: "Single-Speed Fixed Gear", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 3500, Notes: "Factory Class III 2-inch hitch with Trailer Mode software. Max tongue weight: 350 lbs." }
    ]
  },
  {
    make: "Tesla",
    model: "Model X",
    years: [2016, 2026],
    trims: [
      { TrimName: "Long Range / Plaid (Tow Package)", Engine: "Dual / Tri Electric Motors (AWD)", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 5000, Notes: "Class III 2-inch hitch with active air suspension load leveling." }
    ]
  },
  {
    make: "Tesla",
    model: "Cybertruck",
    years: [2024, 2026],
    trims: [
      { TrimName: "Cyberbeast / Dual-Motor AWD", Engine: "Dual / Tri Electric Motors", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 11000, Notes: "Class IV integrated hitch with active air suspension." }
    ]
  },
  {
    make: "Rivian",
    model: "R1T",
    years: [2022, 2026],
    trims: [
      { TrimName: "Quad-Motor / Dual-Motor Max Pack", Engine: "Quad / Dual Electric Motors", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 11000, Notes: "Class IV hitch receiver with built-in trailer safety profiles and dynamic weight estimation." }
    ]
  },
  {
    make: "Rivian",
    model: "R1S",
    years: [2022, 2026],
    trims: [
      { TrimName: "Quad-Motor / Dual-Motor AWD", Engine: "Quad / Dual Electric Motors", Transmission: "Single-Speed", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 7700, Notes: "Class III/IV hitch receiver with active air suspension." }
    ]
  },
  {
    make: "Ford",
    model: "F-150 Lightning",
    years: [2022, 2026],
    trims: [
      { TrimName: "Extended Range (Max Trailer Tow Package)", Engine: "Dual Electric Motors (580 hp)", Transmission: "Single-Speed", Drivetrain: "4WD", "Max Towing Capacity": 10000, Notes: "Class IV receiver hitch. Expect approximately 40-50% range reduction under full trailer load." },
      { TrimName: "Standard Range Battery", Engine: "Dual Electric Motors (452 hp)", Transmission: "Single-Speed", Drivetrain: "4WD", "Max Towing Capacity": 7700, Notes: "Standard battery configuration." }
    ]
  },
  {
    make: "Kia",
    model: "EV9",
    years: [2024, 2026],
    trims: [
      { TrimName: "Dual Motor AWD (Tow Package)", Engine: "Dual Electric Motors", Transmission: "Single-Speed", Drivetrain: "AWD", "Max Towing Capacity": 5000, Notes: "Class III hitch with self-leveling rear suspension." }
    ]
  },

  // Minivans
  {
    make: "Toyota",
    model: "Sienna",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.5L V6 / 2.5L Hybrid (Factory Tow Package)", Engine: "V6 / Hybrid 4-Cyl", Transmission: "Automatic / eCVT", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3500, Notes: "Standard 3,500 lbs minivan rating with trailer brakes." }
    ]
  },
  {
    make: "Honda",
    model: "Odyssey",
    years: [2000, 2026],
    trims: [
      { TrimName: "3.5L V6 with Transmission Oil Cooler", Engine: "3.5L V6 i-VTEC", Transmission: "10-Speed / 6-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "ATF auxiliary cooler required for continuous 3,500 lbs trailer towing." }
    ]
  },
  {
    make: "Chrysler",
    model: "Pacifica",
    years: [2004, 2026],
    trims: [
      { TrimName: "3.6L Pentastar V6 with Trailer Tow Group", Engine: "3.6L V6", Transmission: "9-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3600, Notes: "Class II hitch with heavy-duty radiator and 220-amp alternator." }
    ]
  }
];

async function populateVehicles() {
  console.log("====================================================");
  console.log(" TowWise: Populate Vehicle Data (2000 to 2026)");
  console.log("====================================================");

  console.log("Connecting to MongoDB Atlas...");
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const db = conn.connection.db;
  const col = db.collection("capacities");

  const initialCount = await col.countDocuments();
  console.log(`Starting document count in 'capacities': ${initialCount}`);

  // Fetch all existing (Year, Make, Model) tuples
  const existingDocs = await col.find({}, { projection: { Year: 1, Make: 1, Model: 1 } }).toArray();
  const existingKeySet = new Set(
    existingDocs.map((d) => `${d.Year}__${d.Make.toLowerCase()}__${d.Model.toLowerCase()}`)
  );
  console.log(`Indexed ${existingKeySet.size} existing vehicle combinations.`);

  const newVehiclesToInsert = [];

  for (const template of VEHICLE_TEMPLATES) {
    const [startYear, endYear] = template.years;

    for (let yr = startYear; yr <= endYear; yr++) {
      const key = `${yr}__${template.make.toLowerCase()}__${template.model.toLowerCase()}`;
      if (!existingKeySet.has(key)) {
        newVehiclesToInsert.push({
          Year: yr,
          Make: template.make,
          Model: template.model,
          Trim: template.trims
        });
        existingKeySet.add(key); // prevent duplicate in batch
      }
    }
  }

  console.log(`Identified ${newVehiclesToInsert.length} missing vehicle records to insert.`);

  if (newVehiclesToInsert.length > 0) {
    // Insert in batches of 200
    const batchSize = 200;
    for (let i = 0; i < newVehiclesToInsert.length; i += batchSize) {
      const batch = newVehiclesToInsert.slice(i, i + batchSize);
      await col.insertMany(batch);
      console.log(`  ✓ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} records)...`);
    }
  }

  const finalCount = await col.countDocuments();
  console.log(`\nFinal document count in 'capacities': ${finalCount}`);

  // Year breakdown
  const yearStats = await col.aggregate([
    { $group: { _id: "$Year", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray();

  console.log("\n====================================================");
  console.log(" Updated Year Distribution in MongoDB (2000–2026):");
  console.log("====================================================");
  for (const stat of yearStats) {
    console.log(`  Year ${stat._id}: ${stat.count} vehicles`);
  }

  await mongoose.disconnect();
  console.log("\nDatabase validation & upload complete!");
}

populateVehicles().catch((err) => {
  console.error("Population error:", err);
  process.exit(1);
});
