/**
 * Renders a table displaying vehicle information, including trim details, engine, transmission, drivetrain, and maximum towing capacity.
 *
 * @param {Vehicles} vehicle - An object containing the vehicle's details, including year, make, model, and trim information.
 * @returns {React.ReactElement} - A React component that renders the vehicle information table.
 */

import React from "react";
import { Chip } from "@heroui/react";
import { Vehicles } from "../../lib/Types";
import * as motion from "motion/react-client";

const TowingTable: React.FC<{ vehicle: Vehicles }> = ({ vehicle }) => {
  try {
    return (
      <>
        {vehicle.Trim.map((trim) => {
          const { TrimName, _id, ...rest } = trim;

          // Filter out empty values
          const filteredEntries = Object.entries(rest).filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          );

          if (filteredEntries.length === 0) return null;

          return (
            <motion.div
              key={_id}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0 }}
              className="shadow bg-slate-950/25 shadow-white/50 flex flex-col justify-center items-center rounded-lg md:max-w-2xl p-6 my-10 mx-auto *:px-4 *:rounded-full"
            >
              <h1 className="bg-background/45 text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-5">
                {vehicle.Year} {vehicle.Make} {vehicle.Model}
              </h1>
              <h2 className="bg-background/45 text-xl sm:text-2xl md:text-3xl font-bold text-center mt-2 mb-5 px-4">
                {TrimName}
              </h2>
              <table className="w-full table-auto">
                <tbody>
                  {filteredEntries.map(([key, value], index) => (
                    <tr
                      key={key + index}
                      className={`${index % 2 === 0 ? "bg-background/50" : "bg-background/30"}`}
                    >
                      <td className=" flex items-center text-sm sm:text-lg md:text-xl lg:text-2xl px-4 py-2 font-semibold">
                        <Chip>{key}</Chip>
                      </td>
                      <td className="text-sm sm:text-lg md:text-xl lg:text-2xl px-4 py-2">
                        {(() => {
                          switch (key) {
                            case "Engine":
                              return (
                                <Chip className="p-2 mx-auto  text-foreground">
                                  {value}
                                </Chip>
                              );
                            case "Transmission":
                              return (
                                <Chip
                                  className="p-2 mx-auto text-foreground"
                                  color="secondary"
                                >
                                  {value}
                                </Chip>
                              );
                            case "Drivetrain":
                              return (
                                <Chip
                                  className="p-2 mx-auto text-foreground"
                                  color="success"
                                >
                                  {value}
                                </Chip>
                              );
                            case "Max Towing Capacity":
                              const towingCapacity = parseInt(value.toString());
                              let bgColor;
                              if (towingCapacity <= 2000) {
                                bgColor = "bg-blue-500";
                              } else if (towingCapacity <= 3500) {
                                bgColor = "bg-green-500";
                              } else if (towingCapacity <= 8000) {
                                bgColor = "bg-yellow-500";
                              } else if (towingCapacity <= 12000) {
                                bgColor = "bg-orange-100";
                              } else {
                                bgColor = "bg-red-500";
                              }
                              return (
                                <Chip
                                  className={`p-2 mx-auto ${bgColor} text-foreground`}
                                >
                                  {towingCapacity}
                                </Chip>
                              );
                            case "Notes":
                              return (
                                <p className="overflow-y-auto max-h-[4.5em]">
                                  {value}
                                </p>
                              );
                            default:
                              return null;
                          }
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          );
        })}
      </>
    );
  } catch (error) {
    return <div>Request the vehicle using the Contact form below</div>;
  }
};
export default TowingTable;
