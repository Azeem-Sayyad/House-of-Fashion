"use client";

// ─────────────────────────────────────────────────────────────
// HOUSE OF FASHION BOUTIQUE — Customisation Request Form
// app/customise/page.tsx
//
// Layout: 3-step form with progress indicator
// Step 1: Contact + occasion details
// Step 2: Saree preferences (fabric, colour, budget, description)
// Step 3: Blouse measurements (optional) + submit
//
// On submit: sends a pre-filled WhatsApp message with all details
// (replace with API call when backend is ready)
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import {
  FabricType,
  OccasionType,
  BlouseMeasurements,
} from "@/lib/types";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 — Contact
  name: string;
  phone: string;
  email: string;
  occasion: OccasionType | "";

  // Step 2 — Preferences
  fabric: FabricType | "";
  colourPreference: string;
  budgetRange: string;
  description: string;
  productReference: string;

  // Step 3 — Measurements (all optional)
  wantsMeasurements: boolean;
  measurements: Partial<BlouseMeasurements>;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const occasionOptions: { value: OccasionType; label: string }[] = [
  { value: "bridal", label: "Bridal / Wedding" },
  { value: "reception", label: "Reception" },
  { value: "festive", label: "Festive / Puja" },
  { value: "mehendi", label: "Mehendi" },
  { value: "sangeet", label: "Sangeet" },
  { value: "party", label: "Party / Cocktail" },
  { value: "office", label: "Office / Formal" },
  { value: "casual", label: "Casual / Everyday" },
];

const fabricOptions: { value: FabricType; label: string; detail: string }[] = [
  { value: "silk", label: "Pure Silk", detail: "Luxurious, rich drape" },
  { value: "chanderi", label: "Chanderi", detail: "Lightweight, sheer" },
  { value: "georgette", label: "Georgette", detail: "Flowy, fluid" },
  { value: "cotton", label: "Cotton", detail: "Breathable, everyday" },
  { value: "linen", label: "Linen", detail: "Crisp, structured" },
  { value: "crepe", label: "Crepe", detail: "Matte, professional" },
  { value: "organza", label: "Organza", detail: "Stiff, dramatic" },
  { value: "tussar", label: "Tussar Silk", detail: "Textured, matte" },
];

const budgetOptions = [
  "Under ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];

const measurementFields: {
  key: keyof BlouseMeasurements;
  label: string;
  hint: string;
}[] = [
  { key: "bust", label: "Bust", hint: "Fullest part of chest" },
  { key: "waist", label: "Waist", hint: "Narrowest part" },
  { key: "hips", label: "Hips", hint: "Fullest part of hips" },
  { key: "shoulderWidth", label: "Shoulder Width", hint: "Shoulder to shoulder" },
  { key: "sleeveLength", label: "Sleeve Length", hint: "Shoulder to wrist" },
  { key: "blouseLength", label: "Blouse Length", hint: "Shoulder to waist" },
  { key: "neckDepthFront", label: "Front Neck Depth", hint: "From shoulder to neckline" },
  { key: "neckDepthBack", label: "Back Neck Depth", hint: "From shoulder to back neckline" },
];

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 8l4 4 6-7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 8H3M7 12l-4-4 4-4" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.566 4.148 1.55 5.888L0 24l6.304-1.524A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.034-1.388l-.36-.214-3.742.904.944-3.641-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((step, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-medium font-body transition-all duration-300
                  ${isComplete
                    ? "bg-brand-pink text-white"
                    : isActive
                    ? "bg-brand-charcoal text-white ring-4 ring-brand-pink/20"
                    : "bg-brand-blue-dark text-brand-gray"
                  }
                `}
              >
                {isComplete ? <CheckIcon /> : stepNum}
              </div>
              <span
                className={`
                  text-[0.65rem] font-body tracking-wide text-center
                  hidden sm:block
                  ${isActive ? "text-brand-charcoal font-medium" : "text-brand-gray"}
                `}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={`
                  w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500
                  ${stepNum < currentStep ? "bg-brand-pink" : "bg-brand-blue-dark"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FORM FIELD WRAPPERS
// ─────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-brand-charcoal font-body tracking-wide uppercase">
        {label}
        {required && <span className="text-brand-pink ml-1">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[0.65rem] text-brand-gray font-body">{hint}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 — Contact & Occasion
// ─────────────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading font-medium text-brand-charcoal text-2xl mb-1">
          Let's start with you
        </h2>
        <p className="text-brand-gray font-body text-sm">
          Tell us who you are and what the saree is for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Your Name" required>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Priya Sharma"
            className="input-field"
          />
        </Field>

        <Field label="WhatsApp Number" required hint="We'll send updates on this number">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-body text-sm">
              +91
            </span>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="98765 43210"
              className="input-field pl-12"
              maxLength={10}
            />
          </div>
        </Field>

        <Field label="Email Address" hint="Optional — for order confirmations">
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="priya@example.com"
            className="input-field"
          />
        </Field>
      </div>

      {/* Occasion selector */}
      <Field label="Occasion" required hint="This helps us recommend the right fabric and style">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {occasionOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("occasion", opt.value)}
              className={`
                px-3 py-3 rounded-card text-xs font-body font-medium
                border-2 transition-all duration-200 text-center
                ${data.occasion === opt.value
                  ? "border-brand-pink bg-brand-pink/10 text-brand-charcoal"
                  : "border-brand-blue-dark text-brand-gray hover:border-brand-pink-light hover:text-brand-charcoal"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — Saree Preferences
// ─────────────────────────────────────────────────────────────

function Step2({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading font-medium text-brand-charcoal text-2xl mb-1">
          Tell us about your saree
        </h2>
        <p className="text-brand-gray font-body text-sm">
          The more detail you share, the better we can curate for you.
        </p>
      </div>

      {/* Fabric selector */}
      <Field label="Preferred Fabric" hint="Not sure? Leave blank and we'll suggest based on your occasion">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {fabricOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onChange("fabric", data.fabric === opt.value ? "" : opt.value)
              }
              className={`
                px-3 py-3 rounded-card text-left
                border-2 transition-all duration-200
                ${data.fabric === opt.value
                  ? "border-brand-pink bg-brand-pink/10"
                  : "border-brand-blue-dark hover:border-brand-pink-light"
                }
              `}
            >
              <p className={`text-xs font-medium font-body ${data.fabric === opt.value ? "text-brand-charcoal" : "text-brand-charcoal"}`}>
                {opt.label}
              </p>
              <p className="text-[0.6rem] text-brand-gray font-body mt-0.5">
                {opt.detail}
              </p>
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Colour preference */}
        <Field label="Colour Preference" hint="e.g. Deep red, Ivory, Peacock blue, Pastel pink">
          <input
            type="text"
            value={data.colourPreference}
            onChange={(e) => onChange("colourPreference", e.target.value)}
            placeholder="Describe your ideal colour..."
            className="input-field"
          />
        </Field>

        {/* Budget */}
        <Field label="Budget Range" required>
          <select
            value={data.budgetRange}
            onChange={(e) => onChange("budgetRange", e.target.value)}
            className="input-field cursor-pointer"
          >
            <option value="">Select your budget</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Product reference */}
      <Field
        label="Reference Saree"
        hint="Paste a link to a saree from our site (or anywhere) that you love the style of"
      >
        <input
          type="url"
          value={data.productReference}
          onChange={(e) => onChange("productReference", e.target.value)}
          placeholder="https://houseoffashionboutique.com/product/..."
          className="input-field"
        />
      </Field>

      {/* Description */}
      <Field
        label="Describe Your Dream Saree"
        required
        hint="Weave type, embroidery, border style, drape feel, any specific details — the more the better"
      >
        <textarea
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="I'm looking for a heavy Banarasi silk saree in deep red with gold zari work for my wedding reception. I'd love a broad zari border and a heavily embellished pallu with floral motifs..."
          className="input-field resize-none leading-relaxed"
          rows={5}
        />
        <p className="text-[0.65rem] text-brand-gray font-body text-right">
          {data.description.length} characters
        </p>
      </Field>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — Measurements + Submit
// ─────────────────────────────────────────────────────────────

function Step3({
  data,
  onToggleMeasurements,
  onMeasurementChange,
}: {
  data: FormData;
  onToggleMeasurements: () => void;
  onMeasurementChange: (key: keyof BlouseMeasurements, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading font-medium text-brand-charcoal text-2xl mb-1">
          Blouse measurements
        </h2>
        <p className="text-brand-gray font-body text-sm">
          Optional — you can share these later over WhatsApp too.
        </p>
      </div>

      {/* Toggle */}
      <div
        className={`
          rounded-card border-2 p-5 transition-all duration-300 cursor-pointer
          ${data.wantsMeasurements
            ? "border-brand-pink bg-brand-pink/5"
            : "border-brand-blue-dark bg-brand-white"
          }
        `}
        onClick={onToggleMeasurements}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              w-5 h-5 rounded shrink-0
              flex items-center justify-center
              transition-all duration-200
              ${data.wantsMeasurements ? "bg-brand-pink" : "border-2 border-brand-gray-light"}
            `}
          >
            {data.wantsMeasurements && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-brand-charcoal font-body">
              I want to share my blouse measurements now
            </p>
            <p className="text-xs text-brand-gray font-body mt-0.5">
              All measurements in inches
            </p>
          </div>
        </div>
      </div>

      {/* Measurement fields — shown when toggled */}
      {data.wantsMeasurements && (
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {measurementFields.map((field) => (
            <Field key={field.key} label={field.label} hint={field.hint}>
              <div className="relative">
                <input
                  type="number"
                  value={data.measurements[field.key] ?? ""}
                  onChange={(e) => onMeasurementChange(field.key, e.target.value)}
                  placeholder="0"
                  min={0}
                  step={0.5}
                  className="input-field pr-10 text-center"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray text-xs font-body">
                  in
                </span>
              </div>
            </Field>
          ))}
        </div>
      )}

      {/* Measurement guide note */}
      <div
        className="flex items-start gap-3 p-4 rounded-soft"
        style={{ background: "var(--color-blue-light)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-pink)" strokeWidth="1.6" strokeLinecap="round" className="shrink-0 mt-0.5">
          <circle cx="8" cy="8" r="6" />
          <path d="M8 7v4M8 5.5v.5" />
        </svg>
        <div>
          <p className="text-xs font-medium text-brand-charcoal font-body mb-1">
            Not sure how to measure?
          </p>
          <p className="text-[0.7rem] text-brand-gray font-body leading-relaxed">
            No worries — just submit the form and our team will send you a
            simple measurement guide over WhatsApp. You can share your size
            anytime before we begin stitching.
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-card border border-brand-blue-dark p-5">
        <p className="text-xs font-medium text-brand-charcoal font-body mb-4 uppercase tracking-widest">
          What happens next
        </p>
        <div className="space-y-3">
          {[
            { step: "01", text: "We review your request within 24 hours" },
            { step: "02", text: "Our team WhatsApps you with saree options and pricing" },
            { step: "03", text: "You confirm, we begin — delivery in 3–6 weeks" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span
                className="font-heading font-medium shrink-0 leading-none mt-0.5"
                style={{ color: "var(--color-pink)", fontSize: "1.1rem" }}
              >
                {item.step}
              </span>
              <p className="text-sm text-brand-gray font-body leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────────────────────

function SuccessState({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center text-center py-10">
      {/* Animated check */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "var(--color-pink-light)" }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round">
          <path d="M7 18l7 7L29 10" />
        </svg>
      </div>

      <h2 className="font-heading font-medium text-brand-charcoal text-3xl mb-3">
        Request Submitted!
      </h2>

      <p className="text-brand-gray font-body text-sm mb-2 max-w-sm leading-relaxed">
        Thank you, <span className="font-medium text-brand-charcoal">{name}</span>. We've received
        your customisation request and will WhatsApp you within 24 hours.
      </p>

      <span
        className="font-script text-brand-pink mb-10"
        style={{ fontSize: "1.75rem" }}
      >
        — your dream saree is on its way
      </span>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/collections" className="btn btn-primary gap-2 px-6 py-3 text-sm">
          Browse Collections
          <ArrowRight />
        </Link>
        <Link href="/" className="btn btn-outline gap-2 px-6 py-3 text-sm">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────

const STEPS = ["Contact", "Preferences", "Measurements"];

const defaultFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  occasion: "",
  fabric: "",
  colourPreference: "",
  budgetRange: "",
  description: "",
  productReference: "",
  wantsMeasurements: false,
  measurements: {},
};

export default function CustomisePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleMeasurementChange = (
    key: keyof BlouseMeasurements,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [key]: value ? parseFloat(value) : undefined,
      },
    }));
  };

  // ── Validation per step ──
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "WhatsApp number is required";
      else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, "")))
        newErrors.phone = "Enter a valid 10-digit number";
      if (!formData.occasion) newErrors.occasion = "Please select an occasion";
    }

    if (step === 2) {
      if (!formData.budgetRange) newErrors.budgetRange = "Please select a budget range";
      if (!formData.description.trim())
        newErrors.description = "Please describe what you're looking for";
      else if (formData.description.trim().length < 20)
        newErrors.description = "Please add a bit more detail (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Submit — builds WhatsApp message ──
  const handleSubmit = () => {
    const measurementText = formData.wantsMeasurements
      ? `\n\n📏 *Blouse Measurements (inches):*\n${measurementFields
          .map((f) =>
            formData.measurements[f.key]
              ? `• ${f.label}: ${formData.measurements[f.key]}"`
              : ""
          )
          .filter(Boolean)
          .join("\n")}`
      : "";

    const message = encodeURIComponent(
      `🎨 *Customisation Request — House of Fashion Boutique*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📱 *Phone:* +91 ${formData.phone}\n` +
      `${formData.email ? `📧 *Email:* ${formData.email}\n` : ""}` +
      `\n🎊 *Occasion:* ${formData.occasion}\n` +
      `${formData.fabric ? `🧵 *Fabric:* ${formData.fabric}\n` : ""}` +
      `${formData.colourPreference ? `🎨 *Colour:* ${formData.colourPreference}\n` : ""}` +
      `💰 *Budget:* ${formData.budgetRange}\n` +
      `\n📝 *Description:*\n${formData.description}\n` +
      `${formData.productReference ? `\n🔗 *Reference:* ${formData.productReference}` : ""}` +
      measurementText
    );

    window.open(`https://wa.me/919999999999?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-blue min-h-screen">

      {/* ── Page Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-blue) 0%, var(--color-pink-light) 100%)",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none opacity-30"
          style={{ background: "radial-gradient(circle, var(--color-pink) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, var(--color-blue-dark) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="container-site relative z-10 text-center">
          <p className="section-label mb-3">Bespoke Sarees</p>
          <h1
            className="font-heading font-medium text-brand-charcoal mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Create Your{" "}
            <span className="text-gradient-pink italic">Dream Saree</span>
          </h1>
          <p className="text-brand-gray font-body text-sm max-w-md mx-auto leading-relaxed">
            Tell us exactly what you want and we'll work with our weavers to
            bring it to life. Custom colours, weaves, embroidery, blouse — everything.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="container-site py-14">
        <div className="max-w-195 mx-auto">

          {submitted ? (
            <div className="bg-brand-white rounded-card shadow-card p-8 lg:p-12">
              <SuccessState name={formData.name} />
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <StepIndicator currentStep={currentStep} steps={STEPS} />

              {/* Form card */}
              <div className="bg-brand-white rounded-card shadow-card p-8 lg:p-12">

                {/* Step content */}
                {currentStep === 1 && (
                  <Step1 data={formData} onChange={handleChange} />
                )}
                {currentStep === 2 && (
                  <Step2 data={formData} onChange={handleChange} />
                )}
                {currentStep === 3 && (
                  <Step3
                    data={formData}
                    onToggleMeasurements={() =>
                      setFormData((prev) => ({
                        ...prev,
                        wantsMeasurements: !prev.wantsMeasurements,
                      }))
                    }
                    onMeasurementChange={handleMeasurementChange}
                  />
                )}

                {/* Inline errors summary */}
                {Object.values(errors).some(Boolean) && (
                  <div
                    className="mt-6 p-4 rounded-soft text-xs font-body"
                    style={{ background: "#FEF2F2", color: "#DC2626" }}
                  >
                    {Object.values(errors).filter(Boolean).map((err, i) => (
                      <p key={i}>• {err}</p>
                    ))}
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-brand-blue-dark">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="btn btn-outline gap-2 py-3 px-6 text-sm"
                    >
                      <ArrowLeft />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="btn btn-primary gap-2 py-3 px-8 text-sm"
                    >
                      Continue
                      <ArrowRight />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary gap-2 py-3 px-8 text-sm"
                      style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.3)" }}
                    >
                      <WhatsAppIcon />
                      Send via WhatsApp
                    </button>
                  )}
                </div>
              </div>

              {/* Step counter below */}
              <p className="text-center text-[0.7rem] text-brand-gray font-body mt-6 tracking-widest uppercase">
                Step {currentStep} of {STEPS.length}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}