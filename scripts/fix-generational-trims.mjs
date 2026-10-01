import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;

if (!uri) {
  console.error("No TOWING_URI found.");
  process.exit(1);
}

/**
 * Generation-accurate trim generator for each model and year.
 */
function getAccurateTrims(make, model, year) {
  const m = model.toLowerCase();
  const mk = make.toLowerCase();

  // 1. SUBARU OUTBACK
  if (mk === "subaru" && m === "outback") {
    if (year <= 2004) {
      return [
        { TrimName: "2.5L 4-Cylinder SOHC Boxer", Engine: "2.5L SOHC Boxer-4", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2000, Notes: "Class I hitch. 200 lbs tongue weight. 1,000 lbs unbraked limit." },
        { TrimName: "3.0L H6-3.0 / VDC", Engine: "3.0L DOHC Boxer-6", Transmission: "4-Speed Automatic", Drivetrain: "All-Wheel Drive", "Max Towing Capacity": 2000, Notes: "Smooth 6-cylinder power with all-wheel drive." }
      ];
    }
    if (year <= 2009) {
      return [
        { TrimName: "2.5i Naturally Aspirated Boxer", Engine: "2.5L SOHC Boxer-4", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Rated up to 2,700 lbs with trailer brakes. Tongue weight: 200 lbs." },
        { TrimName: "2.5XT Turbocharged Boxer", Engine: "2.5L Turbo Boxer-4", Transmission: "5-Speed Automatic", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Turbocharged power for mountain highway towing." },
        { TrimName: "3.0R H6 (3.0L 6-Cylinder)", Engine: "3.0L Boxer-6", Transmission: "5-Speed Automatic", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3000, Notes: "Rated for 3,000 lbs with auxiliary transmission cooler." }
      ];
    }
    if (year <= 2014) {
      return [
        { TrimName: "2.5i Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT / 6-Speed Manual", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Standard 2,700 lbs rating with trailer brakes (1,000 lbs unbraked)." },
        { TrimName: "3.6R Boxer-6", Engine: "3.6L Boxer-6", Transmission: "5-Speed Automatic", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3000, Notes: "Heavy-duty cooling and 5-speed automatic allow up to 3,000 lbs." }
      ];
    }
    if (year <= 2019) {
      return [
        { TrimName: "2.5i Naturally Aspirated Boxer", Engine: "2.5L DOHC Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Standard 2,700 lbs rating with trailer brakes." },
        { TrimName: "3.6R Boxer-6", Engine: "3.6L DOHC Boxer-6", Transmission: "High-Torque Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Smooth 6-cylinder touring configuration." }
      ];
    }
    if (year <= 2021) {
      return [
        { TrimName: "2.5L Naturally Aspirated Boxer", Engine: "2.5L Direct Injection Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Standard crossover rating with trailer brakes." },
        { TrimName: "2.4L Turbocharged XT", Engine: "2.4L Turbocharged Boxer-4", Transmission: "High-Torque CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Includes auxiliary transmission fluid cooler. 3,500 lbs max." }
      ];
    }
    // 2022+ (Wilderness introduced in 2022!)
    return [
      { TrimName: "Outback Wilderness (Dual Oil Cooling)", Engine: "2.4L Turbocharged Boxer-4", Transmission: "High-Torque CVT with Low-Ratio Gearing", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Wilderness trim includes upgraded dual transmission oil coolers and factory hitch receiver." },
      { TrimName: "2.4L Turbocharged XT", Engine: "2.4L Turbocharged Boxer-4", Transmission: "High-Torque CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Factory Class II/III hitch with transmission cooler." },
      { TrimName: "2.5L Naturally Aspirated Boxer", Engine: "2.5L Direct Injection Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 2700, Notes: "Standard AWD rating with trailer brakes." }
    ];
  }

  // 2. SUBARU CROSSTREK
  if (mk === "subaru" && m === "crosstrek") {
    if (year < 2013) return null; // Crosstrek launched in 2013
    if (year <= 2017) {
      return [
        { TrimName: "2.0i Naturally Aspirated Boxer", Engine: "2.0L DOHC Boxer-4", Transmission: "Lineartronic CVT / 5-Speed Manual", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1500, Notes: "XV Crosstrek generation. Class I hitch. Tongue weight: 150 lbs." }
      ];
    }
    if (year <= 2023) {
      return [
        { TrimName: "2.5L Naturally Aspirated Boxer (Sport / Limited)", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1500, Notes: "Class I (1.25-inch) hitch rating. 150 lbs tongue weight." },
        { TrimName: "2.0L Naturally Aspirated Boxer (Base / Premium)", Engine: "2.0L Boxer-4", Transmission: "Lineartronic CVT / Manual", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating. 150 lbs tongue weight." },
        { TrimName: "Plug-In Hybrid (Crosstrek Hybrid)", Engine: "2.0L Hybrid PHEV", Transmission: "eCVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1000, Notes: "PHEV powertrain towing limit." }
      ];
    }
    // 2024+ (Wilderness introduced in 2024!)
    return [
      { TrimName: "Crosstrek Wilderness (Dual Transmission Cooling)", Engine: "2.5L Direct Injection Boxer-4", Transmission: "Lineartronic CVT with Upgraded Oil Cooler", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 3500, Notes: "Introduced in 2024: Upgraded transmission fluid cooler doubles tow rating to 3,500 lbs." },
      { TrimName: "2.5L Naturally Aspirated Boxer (Sport / Limited)", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. 150 lbs max tongue weight." },
      { TrimName: "2.0L Naturally Aspirated Boxer (Base / Premium)", Engine: "2.0L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "Symmetrical AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating." }
    ];
  }

  // 3. SUBARU FORESTER
  if (mk === "subaru" && m === "forester") {
    if (year <= 2008) {
      return [
        { TrimName: "2.5L Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "AWD", "Max Towing Capacity": 2400, Notes: "Rated for 2,400 lbs with trailer brakes (1,000 lbs unbraked)." },
        { TrimName: "2.5XT Turbocharged Boxer", Engine: "2.5L Turbo Boxer-4", Transmission: "4-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 2400, Notes: "Turbocharged compact crossover configuration." }
      ];
    }
    if (year <= 2013) {
      return [
        { TrimName: "2.5X Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "AWD", "Max Towing Capacity": 2400, Notes: "Standard 2,400 lbs rating with trailer brakes." },
        { TrimName: "2.5XT Turbocharged Boxer", Engine: "2.5L Turbo Boxer-4", Transmission: "4-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 2400, Notes: "Turbocharged power." }
      ];
    }
    if (year <= 2021) {
      return [
        { TrimName: "2.5i Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "AWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating. 150 lbs max tongue weight." }
      ];
    }
    // 2022+ (Wilderness introduced in 2022!)
    return [
      { TrimName: "Forester Wilderness (Dual Cooling)", Engine: "2.5L Boxer-4", Transmission: "CVT with Upgraded Oil Cooler", Drivetrain: "AWD", "Max Towing Capacity": 3000, Notes: "Wilderness trim includes upgraded transmission oil cooler, doubling towing capacity to 3,000 lbs." },
      { TrimName: "2.5i Naturally Aspirated Boxer", Engine: "2.5L Boxer-4", Transmission: "Lineartronic CVT", Drivetrain: "AWD", "Max Towing Capacity": 1500, Notes: "Standard Class I rating." }
    ];
  }

  // 4. FORD F-150
  if (mk === "ford" && m === "f-150") {
    if (year <= 2003) {
      return [
        { TrimName: "5.4L Triton V8 (Tow Package)", Engine: "5.4L SOHC Triton V8", Transmission: "4-Speed Automatic (4R70W/4R100)", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8800, Notes: "Class IV hitch receiver. 80% safety margin: 7,040 lbs." },
        { TrimName: "4.6L Triton V8", Engine: "4.6L SOHC V8", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7200, Notes: "Standard V8 towing configuration." },
        { TrimName: "4.2L Essex V6", Engine: "4.2L V6", Transmission: "Automatic / Manual", Drivetrain: "RWD", "Max Towing Capacity": 5800, Notes: "Light duty utility hauler." }
      ];
    }
    if (year <= 2008) {
      return [
        { TrimName: "5.4L 3-Valve Triton V8 (Max Tow)", Engine: "5.4L 3V Triton V8", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9900, Notes: "Class IV hitch receiver with auxiliary transmission cooler." },
        { TrimName: "4.6L Triton V8", Engine: "4.6L V8", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Standard V8 configuration." }
      ];
    }
    if (year <= 2010) {
      return [
        { TrimName: "5.4L 3-Valve V8 (Max Trailer Tow)", Engine: "5.4L 3V V8", Transmission: "6-Speed Automatic (6R80)", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11300, Notes: "Max Trailer Tow Package with 3.73 axle ratio." },
        { TrimName: "4.6L 3-Valve V8", Engine: "4.6L 3V V8", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9500, Notes: "6-speed transmission configuration." }
      ];
    }
    if (year <= 2014) {
      return [
        { TrimName: "3.5L EcoBoost Twin-Turbo V6 (Max Tow)", Engine: "3.5L EcoBoost V6", Transmission: "6-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11300, Notes: "First generation EcoBoost with heavy-duty cooling package." },
        { TrimName: "5.0L Coyote V8", Engine: "5.0L V8 Coyote", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10000, Notes: "Standard V8 tow package." },
        { TrimName: "6.2L V8 Boss", Engine: "6.2L V8", Transmission: "6-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11300, Notes: "High-displacement gas towing package." },
        { TrimName: "3.7L V6", Engine: "3.7L Ti-VCT V6", Transmission: "6-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 6100, Notes: "Standard base V6 rating." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow)", Engine: "3.5L EcoBoost Twin-Turbo V6", Transmission: "6-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12200, Notes: "High-strength military-grade aluminum alloy body." },
        { TrimName: "5.0L Ti-VCT V8", Engine: "5.0L Coyote V8", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11100, Notes: "Standard factory tow package." },
        { TrimName: "2.7L EcoBoost V6", Engine: "2.7L Twin-Turbo V6", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8500, Notes: "Mid-tier EcoBoost tow rating." }
      ];
    }
    if (year <= 2020) {
      return [
        { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow)", Engine: "3.5L EcoBoost Twin-Turbo V6", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13200, Notes: "10-speed transmission with Max Trailer Tow Package." },
        { TrimName: "5.0L Ti-VCT V8", Engine: "5.0L Coyote V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11600, Notes: "Heavy-duty payload package rating." },
        { TrimName: "3.0L Power Stroke Turbo-Diesel V6", Engine: "3.0L V6 Turbo Diesel", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11400, Notes: "Long range diesel highway towing." },
        { TrimName: "2.7L EcoBoost V6", Engine: "2.7L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9000, Notes: "Standard tow package." }
      ];
    }
    // 2021+ (PowerBoost Hybrid & Lightning)
    return [
      { TrimName: "3.5L EcoBoost V6 (Max Trailer Tow)", Engine: "3.5L EcoBoost Twin-Turbo V6", Transmission: "10-Speed SelectShift Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 14000, Notes: "Class-leading conventional towing with Max Trailer Tow Package." },
      { TrimName: "3.5L PowerBoost Full Hybrid V6", Engine: "3.5L PowerBoost Turbo Hybrid", Transmission: "10-Speed Hybrid Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12700, Notes: "Features 7.2 kW Pro Power Onboard mobile power generator." },
      { TrimName: "5.0L Ti-VCT V8", Engine: "5.0L Coyote V8", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 13000, Notes: "Standard factory tow package." },
      { TrimName: "2.7L EcoBoost V6", Engine: "2.7L Twin-Turbo V6", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10100, Notes: "Mid-tier towing configuration." }
    ];
  }

  // 5. TOYOTA TACOMA
  if (mk === "toyota" && m === "tacoma") {
    if (year <= 2004) {
      return [
        { TrimName: "3.4L V6 (Tow Package)", Engine: "3.4L 5VZ-FE V6", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "4WD", "Max Towing Capacity": 5000, Notes: "Class III hitch rating. Recommended for light boats or utility trailers." },
        { TrimName: "2.4L / 2.7L 4-Cylinder", Engine: "4-Cyl Gas", Transmission: "Manual / Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Standard bumper pull limit." }
      ];
    }
    if (year <= 2015) {
      return [
        { TrimName: "4.0L V6 with Class IV Tow Package", Engine: "4.0L 1GR-FE V6", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6500, Notes: "Includes engine oil cooler, transmission cooler, and 130-amp alternator." },
        { TrimName: "2.7L 4-Cylinder", Engine: "2.7L 4-Cyl", Transmission: "Automatic / Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 3500, Notes: "Standard utility towing." }
      ];
    }
    if (year <= 2023) {
      return [
        { TrimName: "3.5L V6 with V6 Tow Package", Engine: "3.5L Atkinson V6", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6800, Notes: "Class IV hitch with engine oil cooler and trailer sway control." },
        { TrimName: "2.7L 4-Cylinder", Engine: "2.7L 4-Cyl", Transmission: "6-Speed Automatic", Drivetrain: "RWD", "Max Towing Capacity": 3500, Notes: "Bumper-rated light utility towing." }
      ];
    }
    // 2024+ (4th gen all new turbo)
    return [
      { TrimName: "i-FORCE 2.4L Turbo Gas (Tow Package)", Engine: "2.4L Turbo I-4 (278 hp)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6500, Notes: "Factory Class IV hitch with trailer brake controller." },
      { TrimName: "i-FORCE MAX 2.4L Turbo Hybrid", Engine: "2.4L Turbo Hybrid (326 hp)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 6000, Notes: "Hybrid powertrain with high low-end torque." }
    ];
  }

  // 6. TOYOTA TUNDRA
  if (mk === "toyota" && m === "tundra") {
    if (year <= 2006) {
      return [
        { TrimName: "4.7L i-FORCE V8 (Tow Package)", Engine: "4.7L 2UZ-FE V8", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7200, Notes: "First generation full-size Tundra with Class IV receiver." },
        { TrimName: "3.4L / 4.0L V6", Engine: "V6 Gas", Transmission: "Automatic", Drivetrain: "RWD", "Max Towing Capacity": 5000, Notes: "Standard V6 rating." }
      ];
    }
    if (year <= 2021) {
      return [
        { TrimName: "5.7L i-FORCE V8 (Tow Package)", Engine: "5.7L 3UR-FE V8 (381 hp)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10200, Notes: "Heavy-duty tow package with integrated trailer brake controller." },
        { TrimName: "4.6L i-FORCE V8", Engine: "4.6L V8 (310 hp)", Transmission: "6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6800, Notes: "Standard V8 tow package." }
      ];
    }
    // 2022+ (Twin-Turbo V6 / Hybrid)
    return [
      { TrimName: "i-FORCE MAX 3.4L Twin-Turbo Hybrid", Engine: "3.4L Twin-Turbo V6 Hybrid (437 hp)", Transmission: "10-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12000, Notes: "Class IV receiver hitch with dual tow/haul modes." },
      { TrimName: "i-FORCE 3.4L Twin-Turbo V6 Gas", Engine: "3.4L Twin-Turbo V6 (389 hp)", Transmission: "10-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 11400, Notes: "Standard twin-turbo powertrain with tow package." }
    ];
  }

  // 7. TOYOTA RAV4
  if (mk === "toyota" && m === "rav4") {
    if (year <= 2005) {
      return [
        { TrimName: "2.0L / 2.4L 4-Cylinder", Engine: "2.0L / 2.4L 4-Cyl", Transmission: "4-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch. 150 lbs tongue weight." }
      ];
    }
    if (year <= 2012) {
      return [
        { TrimName: "3.5L V6 with Tow Prep Package", Engine: "3.5L 2GR-FE V6", Transmission: "5-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 3500, Notes: "Rare V6 configuration with heavy-duty radiator and fan. 3,500 lbs max." },
        { TrimName: "2.4L / 2.5L 4-Cylinder", Engine: "4-Cyl Gas", Transmission: "4-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard 4-cylinder limit." }
      ];
    }
    if (year <= 2017) {
      return [
        { TrimName: "2.5L Naturally Aspirated 4-Cylinder", Engine: "2.5L 4-Cyl", Transmission: "6-Speed Automatic", Drivetrain: "AWD / FWD", "Max Towing Capacity": 1500, Notes: "Class I hitch rating. 150 lbs tongue weight." }
      ];
    }
    if (year === 2018) {
      return [
        { TrimName: "Adventure Trim (Tow Package)", Engine: "2.5L 4-Cyl", Transmission: "6-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Adventure trim launched in 2018 with upgraded oil cooler and radiator." },
        { TrimName: "Standard 2.5L 4-Cylinder", Engine: "2.5L 4-Cyl", Transmission: "6-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard Class I rating." }
      ];
    }
    // 2019+
    return [
      { TrimName: "Adventure / TRD Off-Road (Tow Package)", Engine: "2.5L 4-Cyl", Transmission: "8-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3500, Notes: "Upgraded transmission cooler and radiator." },
      { TrimName: "RAV4 Prime Plug-In Hybrid", Engine: "2.5L Hybrid PHEV (302 hp)", Transmission: "eCVT", Drivetrain: "AWD", "Max Towing Capacity": 2500, Notes: "PHEV powertrain rating (2021+)." },
      { TrimName: "Standard 2.5L LE / XLE", Engine: "2.5L 4-Cyl", Transmission: "8-Speed Automatic", Drivetrain: "FWD / AWD", "Max Towing Capacity": 1500, Notes: "Standard Class I rating with trailer brakes." }
    ];
  }

  // 8. RAM 1500
  if ((mk === "ram" || mk === "dodge") && (m === "1500" || m === "ram 1500")) {
    if (year <= 2001) {
      return [
        { TrimName: "5.9L Magnum V8 (Tow Package)", Engine: "5.9L V8", Transmission: "4-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 8800, Notes: "Magnum V8 with heavy-duty transmission cooler." },
        { TrimName: "5.2L Magnum V8", Engine: "5.2L V8", Transmission: "4-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7800, Notes: "Standard V8 tow package." },
        { TrimName: "3.9L Magnum V6", Engine: "3.9L V6", Transmission: "Automatic", Drivetrain: "RWD", "Max Towing Capacity": 4000, Notes: "Light duty utility limit." }
      ];
    }
    if (year <= 2008) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 9100, Notes: "HEMI V8 with Class IV receiver and 3.92 axle ratio." },
        { TrimName: "4.7L Magnum V8", Engine: "4.7L V8", Transmission: "5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 6800, Notes: "Standard V8 tow package." }
      ];
    }
    if (year <= 2018) {
      return [
        { TrimName: "5.7L HEMI V8 (Tow Package)", Engine: "5.7L HEMI V8", Transmission: "8-Speed / 6-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 10650, Notes: "Class IV receiver hitch with integrated trailer brake controller." },
        { TrimName: "3.0L EcoDiesel V6", Engine: "3.0L V6 Turbo Diesel", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 9210, Notes: "EcoDiesel torque for efficient highway trailering." },
        { TrimName: "3.6L Pentastar V6", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7400, Notes: "Standard V6 utility towing." }
      ];
    }
    if (year <= 2024) {
      return [
        { TrimName: "5.7L HEMI V8 with eTorque (Max Tow)", Engine: "5.7L HEMI V8 with eTorque", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 12750, Notes: "Class IV receiver with 3.92 rear axle ratio." },
        { TrimName: "3.0L EcoDiesel V6", Engine: "3.0L Turbo Diesel", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 12560, Notes: "Maximum diesel towing capacity." },
        { TrimName: "3.6L Pentastar V6 with eTorque", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 7730, Notes: "Standard utility towing." }
      ];
    }
    // 2025+ (3.0L Hurricane Twin-Turbo launched!)
    return [
      { TrimName: "3.0L Hurricane Twin-Turbo I-6 (Standard Output)", Engine: "3.0L Twin-Turbo Inline-6 (420 hp)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 11580, Notes: "All-new Hurricane twin-turbo inline 6 replaces HEMI V8 in 2025." },
      { TrimName: "3.0L Hurricane High Output I-6", Engine: "3.0L Twin-Turbo HO (540 hp)", Transmission: "8-Speed Automatic", Drivetrain: "4WD", "Max Towing Capacity": 10740, Notes: "High Output performance truck configuration." },
      { TrimName: "3.6L Pentastar V6 with eTorque", Engine: "3.6L V6", Transmission: "8-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 8100, Notes: "Base powertrain with upgraded transmission cooler." }
    ];
  }

  // Default: return null if not one of the custom-corrected models
  return null;
}

async function runGenerationalFix() {
  console.log("====================================================");
  console.log(" TowWise: Generation-Accurate Trim Sanitizer");
  console.log("====================================================");

  console.log("Connecting to MongoDB Atlas...");
  const conn = await mongoose.connect(uri);
  const db = conn.connection.db;
  const col = db.collection("capacities");

  const modelsToAudit = [
    { make: "Subaru", model: "Outback" },
    { make: "Subaru", model: "Crosstrek" },
    { make: "Subaru", model: "Forester" },
    { make: "Ford", model: "F-150" },
    { make: "Toyota", model: "Tacoma" },
    { make: "Toyota", model: "Tundra" },
    { make: "Toyota", model: "RAV4" },
    { make: "RAM", model: "1500" },
    { make: "Dodge", model: "Ram 1500" }
  ];

  let totalUpdated = 0;

  for (const item of modelsToAudit) {
    const docs = await col.find({
      Make: new RegExp(`^${item.make}$`, "i"),
      Model: new RegExp(`^${item.model}$`, "i")
    }).toArray();

    for (const doc of docs) {
      const accurateTrims = getAccurateTrims(doc.Make, doc.Model, doc.Year);
      if (accurateTrims) {
        await col.updateOne(
          { _id: doc._id },
          { $set: { Trim: accurateTrims } }
        );
        totalUpdated++;
      }
    }
    console.log(`  ✓ Updated ${item.make} ${item.model} records (${docs.length} model years audited).`);
  }

  console.log(`\nSuccessfully sanitized ${totalUpdated} vehicle records in MongoDB!`);

  // Verify Outback 2013, Crosstrek 2013, and Outback 2000
  console.log("\n====================================================");
  console.log(" Post-Fix Verification:");
  console.log("====================================================");

  const outback2013 = await col.findOne({ Make: "Subaru", Model: "Outback", Year: 2013 });
  console.log("✓ 2013 Subaru Outback trims:", outback2013?.Trim.map(t => t.TrimName));

  const crosstrek2013 = await col.findOne({ Make: "Subaru", Model: "Crosstrek", Year: 2013 });
  console.log("✓ 2013 Subaru Crosstrek trims:", crosstrek2013?.Trim.map(t => t.TrimName));

  const crosstrek2024 = await col.findOne({ Make: "Subaru", Model: "Crosstrek", Year: 2024 });
  console.log("✓ 2024 Subaru Crosstrek trims:", crosstrek2024?.Trim.map(t => t.TrimName));

  const f150_2000 = await col.findOne({ Make: "Ford", Model: "F-150", Year: 2000 });
  console.log("✓ 2000 Ford F-150 trims:", f150_2000?.Trim.map(t => t.TrimName));

  const f150_2021 = await col.findOne({ Make: "Ford", Model: "F-150", Year: 2021 });
  console.log("✓ 2021 Ford F-150 trims:", f150_2021?.Trim.map(t => t.TrimName));

  const ram_2025 = await col.findOne({ Make: "RAM", Model: "1500", Year: 2025 });
  console.log("✓ 2025 RAM 1500 trims:", ram_2025?.Trim.map(t => t.TrimName));

  const ram_2015 = await col.findOne({ Make: "RAM", Model: "1500", Year: 2015 });
  console.log("✓ 2015 RAM 1500 trims:", ram_2015?.Trim.map(t => t.TrimName));

  await mongoose.disconnect();
}

runGenerationalFix().catch((e) => {
  console.error("Fix error:", e);
  process.exit(1);
});
