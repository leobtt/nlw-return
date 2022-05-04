import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'] /* a cada operação que eu faça com o prisma apareça no log pra ver as operações */
})