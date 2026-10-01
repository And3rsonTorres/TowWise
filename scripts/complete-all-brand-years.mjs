import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const uri = process.env.TOWING_URI;
if (!uri) {
  console.error("No TOWING_URI found.");
  process.exit(1);
}

const HISTORICAL_ADDITIONS = [
  // 1. ACURA (Year 2000)
  {
    make: "Acura",
    model: "Integra",
    years: [2000, 2001],
    trims: [
      { TrimName: "Standard / Regular Model (Class I Hitch)", Engine: "1.8L DOHC 4-Cylinder", Transmission: "5-Speed Manual / 4-Speed Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1000, Notes: "Class I (1.25-inch) receiver hitch for light utility trailer or bike rack. Tongue weight limit: 100 lbs." }
    ]
  },
  {
    make: "Acura",
    model: "3.5RL",
    years: [2000, 2000],
    trims: [
      { TrimName: "Standard / Regular Model (Class I Hitch)", Engine: "3.5L V6", Transmission: "4-Speed Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1500, Notes: "Class I receiver hitch with trailer brakes." }
    ]
  },

  // 2. AUDI (2000-2006)
  {
    make: "Audi",
    model: "allroad quattro",
    years: [2001, 2005],
    trims: [
      { TrimName: "Standard / Regular Model (2.7T / 4.2L Tow Package)", Engine: "2.7L Twin-Turbo V6 / 4.2L V8 (250–300 hp)", Transmission: "5-Speed Tiptronic / 6-Speed Manual", Drivetrain: "quattro AWD", "Max Towing Capacity": 3300, Notes: "Factory 4-position pneumatic air suspension with Class II receiver hitch." }
    ]
  },
  {
    make: "Audi",
    model: "A6 quattro",
    years: [2000, 2000],
    trims: [
      { TrimName: "Standard / Regular Model (2.8L / 2.7T / 4.2L Tow Package)", Engine: "2.8L V6 / 2.7T / 4.2L V8", Transmission: "5-Speed Tiptronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 2000, Notes: "Class I/II receiver hitch rating." }
    ]
  },
  {
    make: "Audi",
    model: "Q7",
    years: [2006, 2006],
    trims: [
      { TrimName: "Standard / Regular Model (4.2L V8 Tow Package)", Engine: "4.2L FSI V8 (350 hp)", Transmission: "6-Speed Tiptronic", Drivetrain: "quattro AWD", "Max Towing Capacity": 6600, Notes: "First generation Q7 with factory tow package." }
    ]
  },

  // 3. BUICK (2000-2007)
  {
    make: "Buick",
    model: "Rainier",
    years: [2004, 2007],
    trims: [
      { TrimName: "Standard / Regular Model (5.3L V8 Tow Package)", Engine: "5.3L Vortec V8 (290–300 hp)", Transmission: "4-Speed Heavy-Duty Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 6700, Notes: "Body-on-frame platform with Class IV hitch and load-leveling rear air suspension." },
      { TrimName: "Standard / Regular Model (4.2L Inline-6)", Engine: "4.2L Vortec I-6 (275 hp)", Transmission: "4-Speed Automatic", Drivetrain: "AWD / RWD", "Max Towing Capacity": 5700, Notes: "Standard inline-6 towing rating." }
    ]
  },
  {
    make: "Buick",
    model: "Rendezvous",
    years: [2002, 2007],
    trims: [
      { TrimName: "Standard / Regular Model (3.4L / 3.6L V6 Tow Package)", Engine: "3.4L / 3.6L V6", Transmission: "4-Speed Automatic with Heavy-Duty Cooling", Drivetrain: "AWD / FWD", "Max Towing Capacity": 3500, Notes: "Factory trailer towing package with heavy-duty engine cooling and rear air shocks." }
    ]
  },
  {
    make: "Buick",
    model: "LeSabre",
    years: [2000, 2001],
    trims: [
      { TrimName: "Standard / Regular Model (Class I Hitch)", Engine: "3.8L Series II 3800 V6 (205 hp)", Transmission: "4-Speed Automatic", Drivetrain: "Front-Wheel Drive", "Max Towing Capacity": 1000, Notes: "Class I bumper/chassis hitch rating for light utility trailer or bike rack." }
    ]
  },

  // 4. CHRYSLER (2000-2003)
  {
    make: "Chrysler",
    model: "Town & Country",
    years: [2000, 2003],
    trims: [
      { TrimName: "Standard / Regular Model (3.8L / 3.3L V6 Tow Package)", Engine: "3.8L / 3.3L V6 (180–215 hp)", Transmission: "4-Speed Automatic with Auxiliary Cooler", Drivetrain: "FWD / AWD", "Max Towing Capacity": 3500, Notes: "Factory Trailer Tow Prep Package with heavy-duty engine cooling and load-leveling suspension." }
    ]
  },

  // 5. INFINITI (2000-2003)
  {
    make: "Infiniti",
    model: "QX4",
    years: [2000, 2003],
    trims: [
      { TrimName: "Standard / Regular Model (3.3L / 3.5L V6 Tow Package)", Engine: "3.3L VG33E / 3.5L VQ35DE V6 (170–240 hp)", Transmission: "4-Speed Automatic", Drivetrain: "All-Mode 4WD", "Max Towing Capacity": 5000, Notes: "Body-on-frame luxury SUV with Class III hitch and transmission cooler." }
    ]
  },

  // 6. KIA (2000-2002)
  {
    make: "Kia",
    model: "Sportage",
    years: [2000, 2002],
    trims: [
      { TrimName: "Standard / Regular Model (2.0L 4-Cylinder)", Engine: "2.0L DOHC 4-Cylinder (130 hp)", Transmission: "4-Speed Automatic / 5-Speed Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 2000, Notes: "First generation body-on-frame compact SUV with Class I/II hitch." }
    ]
  },
  {
    make: "Kia",
    model: "Sedona",
    years: [2002, 2002],
    trims: [
      { TrimName: "Standard / Regular Model (3.5L V6 Tow Package)", Engine: "3.5L V6 (195 hp)", Transmission: "5-Speed Automatic", Drivetrain: "FWD", "Max Towing Capacity": 3500, Notes: "Class II hitch with auxiliary transmission cooler." }
    ]
  },

  // 7. MAZDA (2000-2003)
  {
    make: "Mazda",
    model: "Tribute",
    years: [2001, 2003],
    trims: [
      { TrimName: "Standard / Regular Model (3.0L V6 Tow Package)", Engine: "3.0L Duratec V6 (200 hp)", Transmission: "4-Speed Automatic", Drivetrain: "4WD / FWD", "Max Towing Capacity": 3500, Notes: "Class II receiver hitch with auxiliary oil cooler." },
      { TrimName: "Standard / Regular Model (2.0L 4-Cylinder)", Engine: "2.0L 4-Cylinder", Transmission: "Manual / Automatic", Drivetrain: "FWD", "Max Towing Capacity": 1500, Notes: "Base 4-cylinder limit." }
    ]
  },
  {
    make: "Mazda",
    model: "B-Series Truck",
    years: [2000, 2000],
    trims: [
      { TrimName: "Standard / Regular Model (4.0L V6 Tow Package)", Engine: "4.0L V6 (160–207 hp)", Transmission: "5-Speed Automatic / Manual", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5600, Notes: "Class III receiver hitch." }
    ]
  },

  // 8. MITSUBISHI (2000-2026)
  {
    make: "Mitsubishi",
    model: "Montero Sport",
    years: [2000, 2004],
    trims: [
      { TrimName: "Standard / Regular Model (3.0L / 3.5L V6 Tow Package)", Engine: "3.0L / 3.5L V6 (173–197 hp)", Transmission: "4-Speed / 5-Speed Automatic", Drivetrain: "4WD / RWD", "Max Towing Capacity": 5000, Notes: "Rugged body-on-frame SUV with Class III hitch." }
    ]
  },
  {
    make: "Mitsubishi",
    model: "Outlander",
    years: [2003, 2026],
    trims: [
      { TrimName: "Standard / Regular Model (Tow Package)", Engine: "2.4L / 3.0L V6 / 2.5L 4-Cylinder", Transmission: "Automatic / CVT with Cooler", Drivetrain: "S-AWC AWD / FWD", "Max Towing Capacity": 3500, Notes: "Class II receiver hitch (3,500 lbs on V6/modern models, 1,500–2,000 lbs on 4-cyl base)." }
    ]
  },

  // 9. VOLVO (2000-2002)
  {
    make: "Volvo",
    model: "XC70 Cross Country",
    years: [2000, 2002],
    trims: [
      { TrimName: "Standard / Regular Model (2.4T / 2.5T AWD Tow Package)", Engine: "2.4L / 2.5L Turbocharged Inline-5 (190–208 hp)", Transmission: "5-Speed Automatic", Drivetrain: "AWD", "Max Towing Capacity": 3300, Notes: "Factory Class II 2-inch receiver hitch rating with trailer brakes." }
    ]
  }
];

async function completeAllBrandYears() {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("capacities");

  let added = 0;
  for (const item of HISTORICAL_ADDITIONS) {
    const [startYr, endYr] = item.years;
    for (let yr = startYr; yr <= endYr; yr++) {
      const exists = await col.findOne({
        Year: yr,
        Make: item.make,
        Model: item.model,
      });

      if (!exists) {
        await col.insertOne({
          Year: yr,
          Make: item.make,
          Model: item.model,
          Trim: item.trims,
        });
        added++;
      }
    }
  }

  console.log(`\nAdded ${added} historical brand records.`);
  const total = await col.countDocuments({});
  console.log(`Total valid documents now in MongoDB capacities: ${total}`);

  await mongoose.disconnect();
}

completeAllBrandYears().catch(console.error);
