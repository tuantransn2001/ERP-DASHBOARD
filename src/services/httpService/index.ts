import * as qs from "querystring";

import { serverErrorDataToString } from "./helpers";

const API_HOST = process.env.NEXT_PUBLIC_API_BASE_URL;
interface Options extends Pick<RequestInit, "headers"> {
  baseUrl?: string;
}

interface RequestParams<T = unknown> {
  url: string;
  data?: T;
  options?: Options & {
    baseUrl?: string;
  };
}

type Methods = "GET" | "POST" | "PUT" | "PATCH";

export class HttpService {
  private baseUrl: string | undefined = API_HOST;

  private getUrl(url: string, options?: Options) {
    if (options?.baseUrl) {
      return `${options.baseUrl}${url}`;
    }
    return `${this.baseUrl}${url}`;
  }

  private async request<T = unknown, P = unknown>(
    { url, options = {}, data }: RequestParams<T>,
    method: Methods
  ): Promise<P> {
    const newOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };
    if (newOptions.baseUrl) {
      delete newOptions.baseUrl;
    }
    const newUrl =
      method === "GET" && data ? `${url}?${qs.stringify(data)}` : url;
    let body: string | undefined | FormData = "";

    if (data) {
      if (typeof data === "string") {
        body = data;
      } else {
        body = JSON.stringify(data);
      }
    }

    if (method === "GET") {
      body = undefined;
    }

    return new Promise((resolve, reject) => {
      fetch(this.getUrl(newUrl, options), {
        method,
        body,
        ...newOptions,
      })
        .then(async (response) => {
          const resp = await response.json();
          // if (!resp) throw new Error('User not found');
          if (resp?.error) {
            const msg = serverErrorDataToString(resp);
            if (msg) {
              throw Error(msg);
            }
          }
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async get<T = unknown, P = unknown>(data: RequestParams<T>): Promise<P> {
    return this.request<T, P>(data, "GET");
  }

  async post<T = unknown, P = unknown>(data: RequestParams<T>): Promise<P> {
    return this.request<T, P>(data, "POST");
  }
}
