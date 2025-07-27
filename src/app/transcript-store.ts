interface Transcript {
  id: string;
  title: string;
  date: Date;
  content: string;
  userId: string;
  status: 'processing' | 'completed' | 'error';
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
}
