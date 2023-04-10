import { http } from "@/utils/http"

const baseUrl = "https://yoobright.top:8089"
const testUrl = "http://localhost:8089"

const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `${testUrl}/${url}`
    : `${baseUrl}/${url}`;

export const getHello = (data?: object) => {
    return http.request<string>("get", baseUrlApi("api"), { data });
  };

export const submitCaseData = (data?: object) => {
    return http.request<string>("post", baseUrlApi("oert_ade_case"), { data });
}