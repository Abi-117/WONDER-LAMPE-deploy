
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const API_URL =
  process.env.VITE_API_URL || "http://localhost:5000";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  city: z.string().trim().min(2, "Enter your city.").max(100),
  whatsappNumber: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit WhatsApp number."),
  experienceLevel: z.enum(["Beginner", "Basic Knowledge", "Intermediate"]),
  riskAcknowledged: z.literal(true, {
    errorMap: () => ({
      message: "Please acknowledge the market risk statement.",
    }),
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const submitProgramRegistration = createServerFn({
  method: "POST",
})
  .validator((input: RegistrationInput) =>
    registrationSchema.parse(input)
  )
  .handler(async ({ data }) => {
    try {
      const response = await fetch(`${API_URL}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email.toLowerCase(),
          city: data.city,
          whatsappNumber: data.whatsappNumber,
          experienceLevel: data.experienceLevel,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save registration."
        );
      }

      const studentId = result.student?._id || result.studentId;

      if (!studentId) {
        throw new Error("Registration saved, but student ID was not returned.");
      }

      return {
        studentId,
        status: "pending" as const,
      };
    } catch (error) {
      console.error("Registration API error:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unable to save registration. Please try again."
      );
    }
  });
