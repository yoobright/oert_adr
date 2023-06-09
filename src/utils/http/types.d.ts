// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Axios, {
    Method,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
  } from "axios";
  
  export type resultType = {
    accessToken?: string;
  };
  
  export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
  >;
  
  export interface PureHttpError extends AxiosError {
    isCancelRequest?: boolean;
  }
  
  export interface PureHttpResponse extends AxiosResponse {
    config: PureHttpRequestConfig;
  }
  
  export interface PureHttpRequestConfig extends InternalAxiosRequestConfig {
    beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
    beforeResponseCallback?: (response: PureHttpResponse) => void;
  }
  
  export default class PureHttp {
    request<T>(
      method: RequestMethods,
      url: string,
      param?: AxiosRequestConfig,
      axiosConfig?: PureHttpRequestConfig
    ): Promise<T>;
    post<T, P>(
      url: string,
      params?: T,
      config?: PureHttpRequestConfig
    ): Promise<P>;
    get<T, P>(
      url: string,
      params?: T,
      config?: PureHttpRequestConfig
    ): Promise<P>;
  }