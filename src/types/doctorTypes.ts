import { z } from "zod"


export const doctorSchema = z.object({
    _id: z.string(),
    firstname : z.string().nonempty("Firstname is required"),
    lastname : z.string().nonempty("Lastname is required"),
    image : z.string().optional(),
    experience : z.string().optional(),
    cv : z.string().optional(),
    specialization: z.object({
     _id: z.string(),
     name: z.string(),
    }),
    clinic: z.object({
      _id: z.string(),
      name: z.string(),
    }),
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



export type doctorTypeCard = {
  _id: string;
  firstname: string;
  lastname: string;
  image?: string;
  specialization: { _id: string; name: string };
  clinic: { _id: string; name: string };
};