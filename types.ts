
import React from 'react';

export type ReleaseType = 'Audio' | 'Video';

export interface Release {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  type: ReleaseType;
  status: 'Published' | 'Pending' | 'Draft';
  coverArt: string;
  streams: number;
  revenue: number;
}

export interface VideoMetadata {
  title: string;
  artist: string;
  director: string;
  producer: string;
  productionCompany: string;
  label: string;
  isrc: string;
  upc: string;
  genre: string;
  releaseDate: string;
  explicit: boolean;
  description: string;
}

export interface AnalyticsData {
  name: string;
  streams: number;
  revenue: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
