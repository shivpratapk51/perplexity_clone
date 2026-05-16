import type { NextFunction, Request, Response } from "express";
import { createSupabaseClient } from "./client.ts";
import { prisma } from "./db.ts";
import dotenv from "dotenv";

dotenv.config();
const client = createSupabaseClient();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = await req.headers.authorization;
  const data = await client.auth.getUser(token);
  const userId = data.data.user?.id;
  if (userId) {
    try {
      await prisma.user.create({
        data: {
          id: data.data.user!.id,
          email: data.data.user?.email!,
          provider:
            data.data.user!.app_metadata.provider === "google"
              ? "GOOGLE"
              : "GITHUB",
          name: data.data.user!.user_metadata.full_name || "Unknown",
          supabaseId: data.data.user!.id || "",
        },
      });
    } catch (error) {
      console.log(error.message);
    }

    req.userId = userId;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
