import { BaseProvider } from "./BaseProvider";
import { RateData } from "../types";

export class BinanceProvider extends BaseProvider {
  constructor() {
    super("Binance_P2P");
    // Future: Add Binance API endpoints
  }

  async fetchRates(): Promise<RateData[]> {
    // TODO: Implement Binance P2P rate fetching
    throw new Error("Binance provider not yet implemented");
  }
}
