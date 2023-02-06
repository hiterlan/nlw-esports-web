import z from "zod";

export const ad = z.object({
  game: z.string({ required_error: "Selecione um Game" }).uuid(),
  nickname: z
    .string({ required_error: "Coloque um nome" })
    .min(3, { message: "O nick deve ter pelo menos 3 caracteres" })
    .max(25, { message: "O nick deve ter menos de 25 caracteres" }),
  discord: z
    .string()
    .regex(/.*[^# ]#[0-9]{4}/gm, "o Discord deve ser Nick #0000")
    .trim(),
  hourStart: z
    .string()
    .regex(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/gm, "Formato: HH:MM")
    .trim(),
  hourEnd: z
    .string()
    .regex(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/gm, "Formato: HH:MM")
    .trim(),
  useVoiceChannel: z.boolean(),
});
