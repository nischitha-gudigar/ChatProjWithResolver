import { SenderData } from './sender';

export interface ChatData {
  id: number;
  sender: SenderData;
  content: string;
  read: boolean;
  date: string;
}

export interface ChatResolver {
  contacts: ChatData[];
  error?: any;
}
