export interface MindMapTopic {
  id: string;
  title: string;
  content: MindMapContent[];
  relatedTopics: string[];
  isLoading: boolean;
}

export interface MindMapContent {
  id: string;
  speaker: string;
  text: string;
}

export interface MindMapDetail {
  id: string;
  title: string;
  participants: string[];
  description: string;
  date: Date;
  isLoading: boolean;
}

export interface MindMapTranscript {
  id: string;
  text: string;
  isLoading: boolean;
}
