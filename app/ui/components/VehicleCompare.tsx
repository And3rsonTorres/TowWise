"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Vehicles } from "@/app/lib/Types";
import { getHitchClass, estimateVehiclePayload } from "@/app/lib/utils/TowCalculations";

interface VehicleCompareProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicles[];
  onRemoveVehicle: (index: number) => void;
  onClearAll: () => void;
}

export default function VehicleCompare({
  isOpen,
  onClose,
  vehicles,
  onRemoveVehicle,
  onClearAll,
}: VehicleCompareProps) {
  if (vehicles.length === 0) return null;

  // Find highest tow capacity
  const maxTow = Math.max(
    ...vehicles.map((v) => v.Trim?.[0]?.["Max Towing Capacity"] || 0)
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-slate-900 border border-slate-700 text-white",
        header: "border-b border-slate-800",
        footer: "border-t border-slate-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center pr-8">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>⚖️ Side-by-Side Vehicle Comparison</span>
            </h3>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Comparing {vehicles.length} vehicle{vehicles.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button
            size="sm"
            color="danger"
            variant="light"
            onPress={onClearAll}
          >
            Clear All
          </Button>
        </ModalHeader>

        <ModalBody className="py-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-3 text-xs uppercase tracking-wider text-slate-400 font-bold w-40">
                    Specification
                  </th>
                  {vehicles.map((v, idx) => (
                    <th key={idx} className="p-3 text-left">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-bold text-white text-base">
                            {v.Year} {v.Make} {v.Model}
                          </p>
                          <p className="text-xs text-amber-400 font-medium">
                            {v.Trim?.[0]?.TrimName || "Standard"}
                          </p>
                        </div>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => onRemoveVehicle(idx)}
                          className="h-6 w-6 min-w-6 text-slate-400 hover:text-rose-400"
                        >
                          ✕
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {/* Max Towing Capacity */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Max Tow Capacity</td>
                  {vehicles.map((v, idx) => {
                    const cap = v.Trim?.[0]?.["Max Towing Capacity"] || 0;
                    const isWinner = cap === maxTow && cap > 0;
                    return (
                      <td key={idx} className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-lg font-black ${
                              isWinner ? "text-emerald-400" : "text-white"
                            }`}
                          >
                            {cap.toLocaleString()} lbs
                          </span>
                          {isWinner && (
                            <Chip size="sm" color="success" variant="flat" className="h-5 text-[10px]">
                              Highest
                            </Chip>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 80% Safe Tow Limit */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">80% Safe Tow Limit</td>
                  {vehicles.map((v, idx) => {
                    const cap = v.Trim?.[0]?.["Max Towing Capacity"] || 0;
                    return (
                      <td key={idx} className="p-3 font-semibold text-emerald-400">
                        {Math.round(cap * 0.8).toLocaleString()} lbs
                      </td>
                    );
                  })}
                </tr>

                {/* Estimated Payload */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Est. Payload Rating</td>
                  {vehicles.map((v, idx) => {
                    const cap = v.Trim?.[0]?.["Max Towing Capacity"] || 0;
                    const payload = estimateVehiclePayload(
                      `${v.Make} ${v.Model}`,
                      cap
                    );
                    return (
                      <td key={idx} className="p-3 font-medium text-slate-200">
                        ~{payload.toLocaleString()} lbs
                      </td>
                    );
                  })}
                </tr>

                {/* Hitch Class */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Hitch Receiver</td>
                  {vehicles.map((v, idx) => {
                    const cap = v.Trim?.[0]?.["Max Towing Capacity"] || 0;
                    const hitch = getHitchClass(cap);
                    return (
                      <td key={idx} className="p-3">
                        <Chip size="sm" color="warning" variant="flat">
                          {hitch.hitchClass} ({hitch.receiverSize})
                        </Chip>
                      </td>
                    );
                  })}
                </tr>

                {/* Engine */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Powertrain / Engine</td>
                  {vehicles.map((v, idx) => (
                    <td key={idx} className="p-3 text-slate-300">
                      {v.Trim?.[0]?.Engine || "Standard Spec"}
                    </td>
                  ))}
                </tr>

                {/* Drivetrain */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Drivetrain</td>
                  {vehicles.map((v, idx) => (
                    <td key={idx} className="p-3 text-slate-300">
                      {v.Trim?.[0]?.Drivetrain || "Standard"}
                    </td>
                  ))}
                </tr>

                {/* Notes */}
                <tr>
                  <td className="p-3 text-xs font-semibold text-slate-400">Manufacturer Notes</td>
                  {vehicles.map((v, idx) => (
                    <td key={idx} className="p-3 text-xs text-slate-400 leading-relaxed">
                      {v.Trim?.[0]?.Notes || "Standard factory equipment."}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onPress={onClose} size="sm">
            Close Comparison
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
