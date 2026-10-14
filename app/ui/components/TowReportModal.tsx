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
  Divider,
} from "@heroui/react";
import { Vehicles } from "@/app/lib/Types";

interface TowReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicles;
  trailerWeight: number;
}

export default function TowReportModal({
  isOpen,
  onClose,
  vehicle,
  trailerWeight,
}: TowReportModalProps) {
  const trim = vehicle.Trim?.[0];
  const maxTow = trim?.["Max Towing Capacity"] || 0;
  const safety80 = Math.round(maxTow * 0.8);
  const tongue12 = Math.round(trailerWeight * 0.12);
  const utilization = maxTow > 0 ? Math.round((trailerWeight / maxTow) * 100) : 0;
  const isSafe = trailerWeight <= safety80;
  const isCaution = trailerWeight > safety80 && trailerWeight <= maxTow;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
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
              <span>📄 Official Tow Safety Clearance Certificate</span>
            </h3>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              TowWise Compliance & Roadside Safety Sheet
            </p>
          </div>
          <Chip color={isSafe ? "success" : isCaution ? "warning" : "danger"} variant="flat">
            {isSafe ? "VERIFIED SAFE" : isCaution ? "CAUTION" : "OVERLOADED"}
          </Chip>
        </ModalHeader>

        <ModalBody className="py-4 space-y-4" id="tow-certificate">
          {/* Header Certificate Title for Print */}
          <div className="hidden print:block text-center border-b pb-4 mb-4">
            <h1 className="text-2xl font-black text-black">TOWWISE SAFETY CLEARANCE CERTIFICATE</h1>
            <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {/* Vehicle & Configuration Summary */}
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Vehicle Specification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Vehicle:</span>
                <strong className="text-white">
                  {vehicle.Year} {vehicle.Make} {vehicle.Model}
                </strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Trim / Edition:</span>
                <strong className="text-white">{trim?.TrimName || "Standard"}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Engine:</span>
                <span className="text-slate-200">{trim?.Engine || "Standard Spec"}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Drivetrain:</span>
                <span className="text-slate-200">{trim?.Drivetrain || "Standard"}</span>
              </div>
            </div>
          </div>

          {/* Weight & Clearance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 text-center">
              <span className="text-xs text-slate-400 block font-bold">Max Rated Capacity</span>
              <p className="text-xl font-bold text-amber-400 mt-0.5">{maxTow.toLocaleString()} lbs</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 text-center">
              <span className="text-xs text-slate-400 block font-bold">80% Safety Ceiling</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">{safety80.toLocaleString()} lbs</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 text-center">
              <span className="text-xs text-slate-400 block font-bold">Loaded Trailer Weight</span>
              <p className="text-xl font-bold text-sky-400 mt-0.5">{trailerWeight.toLocaleString()} lbs</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 text-center">
              <span className="text-xs text-slate-400 block font-bold">Target Tongue Weight</span>
              <p className="text-xl font-bold text-teal-300 mt-0.5">~{tongue12.toLocaleString()} lbs</p>
            </div>
          </div>

          {/* Status Verdict */}
          <div className={`p-4 rounded-xl border ${isSafe ? "bg-emerald-950/30 border-emerald-800" : isCaution ? "bg-amber-950/30 border-amber-800" : "bg-rose-950/30 border-rose-800"}`}>
            <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
              <span>{isSafe ? "✅ Safe Towing Clearance Verified" : isCaution ? "⚠️ Caution: Operating Near Tow Limit" : "❌ Dangerous Configuration: Overloaded"}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trailer utilization is currently at <strong>{utilization}%</strong> of the manufacturer maximum rating. {isSafe ? "This configuration maintains an optimal safety buffer for mountainous terrain, passenger comfort, and sudden braking." : "Ensure your trailer has functional electric brakes and inspect tire pressures before departure."}
            </p>
          </div>

          <Divider className="my-2 bg-slate-800" />

          {/* Pre-Trip Safety Checklist */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
              Pre-Departure Safety Checklist
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Hitch coupler locked onto ball with safety pin in place.</li>
              <li>Dual safety chains crossed in an &quot;X&quot; under the tongue to cradle coupler if unhooked.</li>
              <li>Breakaway switch cable secured to vehicle frame (not hitch ball).</li>
              <li>7-pin electrical plug connected and tested (Brake lights, Turn signals, Running lights).</li>
              <li>Trailer brake controller tested with manual lever at low speed (5–10 MPH).</li>
              <li>Trailer and vehicle tires inflated to cold PSI stated on door jamb & trailer placards.</li>
              <li>Wheel lug nuts torqued to manufacturer specifications.</li>
            </ul>
          </div>

          <p className="text-[11px] text-slate-500 italic pt-2">
            Disclaimer: TowWise is an independent informational resource. Always verify all ratings against your vehicle owner&apos;s manual and driver door jamb tire certification sticker.
          </p>
        </ModalBody>

        <ModalFooter className="flex justify-between items-center">
          <Button variant="light" color="default" onPress={onClose} size="sm">
            Close
          </Button>
          <Button color="primary" onPress={handlePrint} size="sm" startContent={<span>🖨️</span>}>
            Print / Save as PDF
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
