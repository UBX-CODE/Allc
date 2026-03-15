import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { service, price, appointmentData } = req.body;

      // Mock behavior for testing if no real Stripe key is provided
      if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "sk_test_placeholder") {
        console.log("Using Mock Stripe Session");
        return res.json({ 
          id: "mock_session_id", 
          url: `${process.env.APP_URL || "http://localhost:3000"}/dashboard?success=true` 
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: service,
              },
              unit_amount: price * 100, // Stripe expects amount in cents/paise
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL || "http://localhost:3000"}/dashboard?success=true`,
        cancel_url: `${process.env.APP_URL || "http://localhost:3000"}/booking?canceled=true`,
        metadata: {
          ...appointmentData,
          service,
          price,
        },
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
