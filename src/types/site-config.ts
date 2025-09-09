// Types pour la configuration du site
// Représente la structure de src/config/site.config.json

export interface DataRetentionConfig {
  characterData?: string;
  chatLogs?: string;
  connectionLogs?: string;
  banRecords?: string;
  whitelistApplications?: string;
}

export interface LegalConfig {
  companyName?: string;
  contact?: string;
  lastUpdated?: string;
  minAge?: number;
  copyrightYear?: number;
  privacyEmail?: string;
  dpoEmail?: string;
  dataRetention?: DataRetentionConfig;
}

export interface SocialConfig {
  discord?: string;
}

export interface ServerConfig {
  name?: string;
  tagline?: string;
  description?: string;
  ip?: string;
  port?: string;
  discord?: string;
  maxPlayers?: number;
  logo?: { type?: string; content?: string };
  loadingTips?: string[];
}

export interface ApiConfig {
  serverCode?: string;
  cfxApiUrl?: string;
  refreshInterval?: number;
}

export interface Job {
  id: string;
  name: string;
  category: string;
  description: string;
  requirements: string[];
  image: string;
}

export interface JobsConfig {
  categories?: { id: string; name: string; color: string }[];
  list?: Job[];
}

export interface WhitelistConfig {
  enabled?: boolean;
  applicationUrl?: string;
  requirements?: string[];
}

export interface SiteConfig {
  legal?: LegalConfig;
  social?: SocialConfig;
  server?: ServerConfig;
  api?: ApiConfig;
  jobs?: JobsConfig;
  whitelist?: WhitelistConfig;
  // ...autres propriétés si besoin
}

export interface SiteConfig {
  legal?: LegalConfig;
  // ...autres propriétés si besoin
}
