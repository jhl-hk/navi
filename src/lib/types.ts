export interface SearchEngine {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
}

export interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

export interface Repository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdate: string;
}

export interface GitHubActivity {
  type: string;
  repo: string;
  branch?: string;
  message: string;
  time: string;
}

export interface GitHubData {
  repositories: Repository[];
  recentActivity: GitHubActivity[];
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface Bookmark {
  id: number;
  title: string;
  url: string;
  icon: string;
  description?: string;
  category: string;
}

export interface UptimeStatus {
  totalSites: number;
  upSites: number;
  downSites: number;
  lastChecked: string;
} 