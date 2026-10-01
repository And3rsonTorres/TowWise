import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;
if (!uri) {
  console.error("No TOWING_URI found.");
  process.exit(1);
}

/**
 * Returns generation-accurate trims for any vehicle make, model, and year (2000-2026).
 * If the model was unreleased in that year, returns null so the document can be safely removed.
 */
export function getGenerationAccurateTrims(make, model, year) {
  const mk = make.trim();
  const m = model.trim();
  const mkL = mk.toLowerCase();
  const mL = m.toLowerCase();

  // ==========================================
  // UNRELEASED YEAR GATES (Model did not exist)
  // ==========================================
  if (mL === "telluride" && year < 2020) return null;
  if (mL === "palisade" && year < 2020) return null;
  if (mL === "ascent" && year < 2019) return null;
  if (mL === "crosstrek" && year < 2013) return null;
  if (mL === "atlas" && year < 2018) return null;
  if (mL === "gladiator" && year < 2020) return null;
  if (mL === "maverick" && year >= 2000 && year < 2022) return null;
  if (mL.includes("lightning") && year >= 2005 && year < 2022) return null;
  if (mL === "model y" && year < 2020) return null;
  if (mL === "model x" && year < 2016) return null;
  if (mL === "cybertruck" && year < 2024) return null;
  if ((mL === "r1t" || mL === "r1s") && year < 2022) return null;
  if (mL === "ev9" && year < 2024) return null;
  if (mL === "titan" && (year < 2004 || year > 2024)) return null;
  if (mL === "cx-5" && year < 2013) return null;
  if (mL === "ridgeline" && (year < 2006 || year === 2015 || year === 2016)) return null;
  if (mL === "pacifica" && (year < 2004 || (year >= 2009 && year <= 2016))) return null;
  if (mL === "ranger" && mkL === "ford" && year >= 2012 && year <= 2018) return null;
  if (mL === "colorado" && mkL === "chevrolet" && (year < 2004 || year === 2013 || year === 2014)) return null;
  if (mL === "durango" && year === 2010) return null;
  if (mL === "highlander" && year < 2001) return null;
  if (mL === "sequoia" && year < 2001) return null;
  if (mL === "pilot" && year < 2003) return null;
  if (mL === "mazda3" && year < 2004) return null;
  if (mL === "forte" && year < 2010) return null;

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

  // Default fallback: keep existing or return generic clean trim
  return null;
}

async function sanitizeDatabase() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");
  const all = await col.find({}).toArray();
  console.log(`Total vehicle documents in capacities: ${all.length}`);

  let updatedCount = 0;
  let deletedCount = 0;
  let untouchedCount = 0;

  for (const doc of all) {
    const accurateTrims = getGenerationAccurateTrims(doc.Make, doc.Model, doc.Year);

    // If model didn't exist in that year, remove it!
    if (accurateTrims === null) {
      // Check if it's explicitly marked as unreleased
      const isUnreleased = (
        (doc.Model.toLowerCase() === "telluride" && doc.Year < 2020) ||
        (doc.Model.toLowerCase() === "palisade" && doc.Year < 2020) ||
        (doc.Model.toLowerCase() === "ascent" && doc.Year < 2019) ||
        (doc.Model.toLowerCase() === "crosstrek" && doc.Year < 2013) ||
        (doc.Model.toLowerCase() === "atlas" && doc.Year < 2018) ||
        (doc.Model.toLowerCase() === "gladiator" && doc.Year < 2020) ||
        (doc.Model.toLowerCase() === "maverick" && doc.Year >= 2000 && doc.Year < 2022) ||
        (doc.Model.toLowerCase().includes("lightning") && doc.Year >= 2005 && doc.Year < 2022) ||
        (doc.Model.toLowerCase() === "model y" && doc.Year < 2020) ||
        (doc.Model.toLowerCase() === "model x" && doc.Year < 2016) ||
        (doc.Model.toLowerCase() === "cybertruck" && doc.Year < 2024) ||
        ((doc.Model.toLowerCase() === "r1t" || doc.Model.toLowerCase() === "r1s") && doc.Year < 2022) ||
        (doc.Model.toLowerCase() === "ev9" && doc.Year < 2024) ||
        (doc.Model.toLowerCase() === "titan" && (doc.Year < 2004 || doc.Year > 2024)) ||
        (doc.Model.toLowerCase() === "cx-5" && doc.Year < 2013) ||
        (doc.Model.toLowerCase() === "ridgeline" && (doc.Year < 2006 || doc.Year === 2015 || doc.Year === 2016)) ||
        (doc.Model.toLowerCase() === "pacifica" && (doc.Year < 2004 || (doc.Year >= 2009 && doc.Year <= 2016))) ||
        (doc.Model.toLowerCase() === "ranger" && doc.Make.toLowerCase() === "ford" && doc.Year >= 2012 && doc.Year <= 2018) ||
        (doc.Model.toLowerCase() === "colorado" && doc.Make.toLowerCase() === "chevrolet" && (doc.Year < 2004 || doc.Year === 2013 || doc.Year === 2014)) ||
        (doc.Model.toLowerCase() === "durango" && doc.Year === 2010) ||
        (doc.Model.toLowerCase() === "highlander" && doc.Year < 2001) ||
        (doc.Model.toLowerCase() === "sequoia" && doc.Year < 2001) ||
        (doc.Model.toLowerCase() === "pilot" && doc.Year < 2003) ||
        (doc.Model.toLowerCase() === "mazda3" && doc.Year < 2004) ||
        (doc.Model.toLowerCase() === "forte" && doc.Year < 2010)
      );

      if (isUnreleased) {
        console.log(`[DELETED UNRELEASED] ${doc.Year} ${doc.Make} ${doc.Model} (did not exist in this year)`);
        await col.deleteOne({ _id: doc._id });
        deletedCount++;
        continue;
      }

      // Check if trims inside had anachronisms (e.g. 4xe on older Grand Cherokee)
      let modified = false;
      const sanitizedTrims = (doc.Trim || []).map((t) => {
        let tName = t.TrimName || "";
        // Remove 4xe from pre-2021
        if (tName.toLowerCase().includes("4xe") && doc.Year < 2021) {
          modified = true;
          return { ...t, TrimName: "Standard / Regular Model" };
        }
        // Remove Wilderness from pre-2022
        if (tName.toLowerCase().includes("wilderness") && doc.Year < 2022) {
          modified = true;
          return { ...t, TrimName: "Standard / Regular Model" };
        }
        // Remove Prime from pre-2021 RAV4
        if (tName.toLowerCase().includes("prime") && doc.Year < 2021 && doc.Model.toLowerCase().includes("rav4")) {
          modified = true;
          return { ...t, TrimName: "Standard / Regular Model" };
        }
        return t;
      });

      if (modified) {
        await col.updateOne({ _id: doc._id }, { $set: { Trim: sanitizedTrims } });
        updatedCount++;
      } else {
        untouchedCount++;
      }
      continue;
    }

    // Update with exact generation-accurate trims
    await col.updateOne({ _id: doc._id }, { $set: { Trim: accurateTrims } });
    updatedCount++;
  }

  console.log(`\n==============================================`);
  console.log(`Sanitization Complete:`);
  console.log(`  Updated: ${updatedCount} documents with generation-accurate trims`);
  console.log(`  Deleted: ${deletedCount} unreleased vehicle records`);
  console.log(`  Untouched: ${untouchedCount} documents`);
  console.log(`==============================================\n`);

  const remainingCount = await col.countDocuments({});
  console.log(`Total valid documents now in capacities: ${remainingCount}`);

  await mongoose.disconnect();
}

if (process.argv[1] && process.argv[1].endsWith("sanitize-all-db-trims.mjs")) {
  sanitizeDatabase().catch(console.error);
}
