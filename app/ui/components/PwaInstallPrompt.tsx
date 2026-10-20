"use client";
import React, { useEffect, useState } from "react";
import { Button, Chip } from "@heroui/react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("TowWise PWA Service Worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("TowWise Service Worker registration failed:", err);
        });
    }

    // Monitor Online / Offline Network Status
    const updateNetworkStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    updateNetworkStatus();

    // Capture PWA Install Prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  if (dismissed && !isOffline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
      {/* Offline Status Indicator */}
      {isOffline && (
        <div className="pointer-events-auto flex items-center gap-2 bg-amber-950/90 text-amber-200 border border-amber-600/80 px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md text-xs font-semibold animate-pulse">
          <span className="text-base">⚡</span>
          <span>100% Offline Mode Active (Field Ready)</span>
        </div>
      )}

      {/* PWA Install Button Prompt */}
      {deferredPrompt && !dismissed && (
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/95 border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">📲</span>
            <div>
              <p className="font-bold text-slate-100">Install TowWise App</p>
              <p className="text-[10px] text-slate-400">Use 100% offline at boat ramps & campsites</p>
            </div>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="solid"
            onPress={handleInstallClick}
            className="font-bold text-xs ml-2 h-7"
          >
            Install
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="default"
            onPress={() => setDismissed(true)}
            className="h-6 w-6 min-w-6 text-slate-400 hover:text-white"
          >
            ✕
          </Button>
        </div>
      )}
    </div>
  );
}
