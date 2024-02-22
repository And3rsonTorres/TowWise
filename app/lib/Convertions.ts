import { supported } from "../../public/assets/SuportedModel";
const VehiclesMap = () => {
    const mapped = new Map<number, Map<string, string[]>>();
  
    supported.forEach((item) => {
      const year = item.Year;
      const make = item.Make;
      const modelTrim = item["Model Trim"];
  
      if (!mapped.has(year)) {
        mapped.set(year, new Map<string, string[]>());
      }
  
      const yearMap = mapped.get(year);
  
      if (yearMap) {
        if (!yearMap.has(make)) {
          yearMap.set(make, []);
        }
  
        yearMap.get(make)?.push(modelTrim);
      }
    });
    return mapped;
  };

  export const SelectionMap =VehiclesMap();