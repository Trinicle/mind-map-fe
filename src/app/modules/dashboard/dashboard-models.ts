import { z } from 'zod';

export interface DashboardCardPostRequest {
  title: string;
  description: string;
  tags: string[];
  date: Date;
  file: File;
}

export interface DashboardCardSearchRequest {
  title: string;
  tags: string[];
  date: string;
}

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: Date;
}

export interface DashboardCardCollection {
  cards: DashboardCard[];
  isLoading: boolean;
  currentCreation: boolean;
}

export const DashboardTagsResponseSchema = z.object({
  data: z.array(z.string()),
  message: z.string(),
});

export type DashboardTagsResponse = z.infer<typeof DashboardTagsResponseSchema>;
