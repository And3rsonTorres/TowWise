"use client";
import React, { useState } from "react";
import { ContactSchema } from "@/app/lib/utils/Validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input, Textarea, Card, CardBody, Select, SelectItem, Chip } from "@heroui/react";

type ContactFormData = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  initialVehicleContext?: {
    Year?: number;
    Make?: string;
    Model?: string;
    Trim?: string;
    VIN?: string;
  } | null;
  onClearVehicleContext?: () => void;
}

const FEEDBACK_TYPES = [
  { key: "general", label: "💬 General Feedback / Question" },
  { key: "missing_vehicle", label: "🚗 Request Missing Vehicle Model" },
  { key: "incorrect_spec", label: "⚠️ Report Inaccurate Towing Limit" },
  { key: "feature_request", label: "💡 Feature or Improvement Idea" },
];

const ContactForm: React.FC<ContactFormProps> = ({
  initialVehicleContext,
  onClearVehicleContext,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>("general");
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [vehicleContext, setVehicleContext] = useState(initialVehicleContext);

  // Sync if prop changes
  React.useEffect(() => {
    if (initialVehicleContext) {
      setVehicleContext(initialVehicleContext);
    }
  }, [initialVehicleContext]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      FeedbackType: "general",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        FeedbackType: (feedbackType as any) || "general",
        Rating: rating,
        VehicleContext: vehicleContext || undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          result.savedToDatabase
            ? "Your feedback was saved to the database! Thank you!"
            : "Your feedback has been received! Thank you!",
          {
            duration: 4000,
            position: "bottom-center",
          }
        );
        reset();
        setRating(undefined);
        if (onClearVehicleContext) onClearVehicleContext();
        setVehicleContext(null);
      } else {
        toast.error(result.error?.message || "Failed to send feedback. Please try again.", {
          duration: 4000,
          position: "bottom-center",
        });
      }
    } catch {
      toast.error("Network error while submitting feedback. Please check your connection.", {
        duration: 4000,
        position: "bottom-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="feedback-section" className="w-full max-w-2xl mx-auto px-4 my-12">
      <Card className="bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md p-4 sm:p-8">
        <CardBody>
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              User Feedback & Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Feedback & Contact
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Help us expand TowWise! Request missing vehicle models, suggest new features, or let us know how your towing experience went.
            </p>
          </div>

          {/* If feedback relates to a specific vehicle */}
          {vehicleContext && (vehicleContext.Make || vehicleContext.Model) && (
            <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-200">
                <span>📌</span>
                <span>
                  Referencing: <strong>{vehicleContext.Year} {vehicleContext.Make} {vehicleContext.Model} {vehicleContext.Trim || ""}</strong>
                </span>
              </div>
              <Button
                size="sm"
                variant="light"
                color="warning"
                className="h-6 text-xs"
                onPress={() => {
                  setVehicleContext(null);
                  if (onClearVehicleContext) onClearVehicleContext();
                }}
              >
                Clear
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Feedback Category Selector */}
            <div>
              <Select
                label="Feedback Category"
                placeholder="Choose category"
                variant="bordered"
                color="primary"
                selectedKeys={[feedbackType]}
                onChange={(e) => setFeedbackType(e.target.value)}
                className="text-base"
              >
                {FEEDBACK_TYPES.map((type) => (
                  <SelectItem key={type.key} value={type.key} textValue={type.label}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  label="Your Name"
                  placeholder="Enter your name"
                  id="Name"
                  variant="bordered"
                  isInvalid={!!errors.Name}
                  errorMessage={errors.Name?.message}
                  color={errors.Name ? "danger" : "primary"}
                  {...register("Name")}
                  className="w-full text-base"
                />
              </div>

              <div>
                <Input
                  type="email"
                  label="Email Address"
                  id="Email"
                  placeholder="name@example.com"
                  variant="bordered"
                  isInvalid={!!errors.Email}
                  errorMessage={errors.Email?.message}
                  color={errors.Email ? "danger" : "primary"}
                  {...register("Email")}
                  className="w-full text-base"
                />
              </div>
            </div>

            {/* Optional 5-Star Rating */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                App Satisfaction Rating (optional):
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(rating === star ? undefined : star)}
                    className="text-xl transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`${star} star`}
                  >
                    {rating && rating >= star ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Textarea
                label="Your Message or Vehicle Request Details"
                id="Message"
                variant="bordered"
                placeholder={
                  feedbackType === "missing_vehicle"
                    ? "Provide vehicle Year, Make, Model, Trim, Engine, or VIN that you would like added to TowWise..."
                    : "Share your questions, feedback, or ideas..."
                }
                isInvalid={!!errors.Message}
                errorMessage={errors.Message?.message}
                color={errors.Message ? "danger" : "primary"}
                {...register("Message")}
                minRows={4}
                className="w-full text-base"
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-bold text-base py-6 shadow-lg"
              size="lg"
              variant="shadow"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Submitting Feedback..." : "Submit Feedback"}
            </Button>
          </form>
        </CardBody>
      </Card>
      <Toaster />
    </div>
  );
};

export default ContactForm;
