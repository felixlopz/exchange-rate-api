import cron from "node-cron";
import rateService from "../services/rateService";

// Run at 9:15 AM Caracas time (America/Caracas timezone)
const morningJob = cron.schedule(
  "15 9 * * *",
  async () => {
    console.log("🕐 Running morning scrape job...");
    try {
      await rateService.updateRates();
      console.log("✅ Morning scrape completed");
    } catch (error) {
      console.error("❌ Morning scrape failed:", error);
    }
  },
  {
    timezone: "America/Caracas",
  },
);

// Run at 1:15 PM Caracas time
const afternoonJob = cron.schedule(
  "15 13 * * *",
  async () => {
    console.log("🕐 Running afternoon scrape job...");
    try {
      await rateService.updateRates();
      console.log("✅ Afternoon scrape completed");
    } catch (error) {
      console.error("❌ Afternoon scrape failed:", error);
    }
  },
  {
    timezone: "America/Caracas",
  },
);

export const startScheduler = (): void => {
  morningJob.start();
  afternoonJob.start();
  console.log(
    "⏰ Scheduler started - Jobs will run at 9:15 AM and 1:15 PM Caracas time",
  );
};

export const stopScheduler = (): void => {
  morningJob.stop();
  afternoonJob.stop();
  console.log("⏰ Scheduler stopped");
};
