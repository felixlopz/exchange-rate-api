export interface RateData {
  provider: string;
  currency_from: string;
  currency_to: string;
  rate: number;
  update_type: string | null;
  date: string;
  metadata?: Record<string, any>;
}

export interface ExchangeRate extends RateData {
  id: number;
  scraped_at: Date;
}

export interface ScraperResult {
  provider: string;
  success: boolean;
  rates?: RateData[];
  error?: string;
}

export interface ProviderConfig {
  name: string;
  enabled: boolean;
  url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: Record<string, any>;
  message?: string;
}
