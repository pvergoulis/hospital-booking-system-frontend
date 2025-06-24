import { z } from "zod";

export const doctorSchema = z.object({
  // _id: z.string(),
  firstname: z
    .string()
    .nonempty("Firstname is required")
    .min(3, "Must be atleast 3 characters"),
  lastname: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Must be atleast 3 characters"),
  image: z.string().nonempty("Image URL is required"),
  experience: z.string().nonempty("Experience is required"),
  cv: z.string().min(50, "CV must be at least 50 characters"),
  specialization: z.object({
    _id: z.string().min(1, "Specialization is required"),
    name: z.string(),
  }),
  clinic: z.object({
    _id: z.string().min(1, "Clinic is required"),
    name: z.string(),
  }),
  amka: z
    .string()
    .length(11, "AMKA must be exactly 11 characters")
    .nonempty("Amka is required"),
});

export type doctorType = z.infer<typeof doctorSchema>;

export type doctorTypeCard = {
  _id: string;
  firstname: string;
  lastname: string;
  image?: string;
  specialization: { _id: string; name: string };
  clinic: { _id: string; name: string };
};
