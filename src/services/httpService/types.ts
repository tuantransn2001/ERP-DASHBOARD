export interface HttpResponseSuccess<T> {
  status: number;
  data: {
    message: string;
    data: T;
  };
}
export interface HttpResponseFail {
  message: string;
  error: {
    message: string;
  };
}

export type HttpResponse<T> = HttpResponseSuccess<T> | HttpResponseFail;
