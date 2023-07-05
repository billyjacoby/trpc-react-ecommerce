export interface ResponseError {
  message: string;
  error?: any;
}

export const createResponse = {
  error: (error: ResponseError) => ({data: null, error}),
};
