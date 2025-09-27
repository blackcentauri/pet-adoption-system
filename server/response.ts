export type ActionResponse = {
  success: boolean;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
};
