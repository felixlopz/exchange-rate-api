import axios from "axios";
import * as cheerio from "cheerio";
import { BaseProvider } from "./BaseProvider";
import { RateData } from "../types";

export class BCVProvider extends BaseProvider {
  private readonly url: string;

  constructor() {
    super("BCV");
    this.url = "https://www.bcv.org.ve/";
  }

  async fetchRates(): Promise<RateData[]> {
    try {
      const response = await axios.get(this.url, {
        timeout: 10000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      const $ = cheerio.load(response.data);
      const rates: RateData[] = [];

      // Extract rates (adjust selectors based on actual page structure)
      const usdRate = this.extractRate($, "USD");
      const eurRate = this.extractRate($, "EUR");

      const currentHour = new Date().getHours();
      const updateType = currentHour < 13 ? "AM" : "PM";

      if (usdRate) {
        rates.push(this.normalizeRate("USD", "VES", usdRate, updateType));
      }

      if (eurRate) {
        rates.push(this.normalizeRate("EUR", "VES", eurRate, updateType));
      }

      return rates;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Error fetching from ${this.name}:`, errorMessage);
      throw new Error(
        `Failed to fetch rates from ${this.name}: ${errorMessage}`,
      );
    }
  }

  private extractRate($: cheerio.CheerioAPI, currency: string): number | null {
    // TODO: Implement actual selector logic based on BCV website structure
    // Example placeholder:
    // const rateText = $(`#dolar .centrado strong`).first().text();
    // return parseFloat(rateText.replace(',', '.'));

    // You'll need to inspect https://www.bcv.org.ve/ to find the right selectors
    return null;
  }
}
