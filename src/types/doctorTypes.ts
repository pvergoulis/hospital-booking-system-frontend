import { z } from "zod"


export const doctorSchema = z.object({
    firstname : z.string().nonempty("Firstname is required"),
    lastname : z.string().nonempty("Lastname is required"),
    image : z.string().optional(),
    experience : z.string().optional(),
    cv : z.string().optional(),
    specialization: z.string().nonempty("Specialization is required"),
    clinic: z.string().nonempty("Clinic is required"),
    amka : z.string().length(11,"AMKA must be exactly 11 characters").nonempty(),
    availableHours: z
    .array(
      z.object({
        day: z.string(),
        from: z.string(),
        to: z.string(),
      })
    )
    .optional(),
})

export type doctorType = z.infer<typeof doctorSchema>