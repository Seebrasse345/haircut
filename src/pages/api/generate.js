// src/pages/api/generate.js
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { logError } from "../../../lib/errorLogger";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: "Method not allowed" });
    }

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = session.user.id;
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Simulate an AI generation call (replace with actual integration later)
    const resultUrl = "https://via.placeholder.com/400x400.png?text=Generated+Image";

    const generation = await prisma.generation.create({
      data: { userId, prompt, resultUrl },
    });

    return res.status(200).json({ generation });
  } catch (error) {
    logError(error, { route: "/api/generate" });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
