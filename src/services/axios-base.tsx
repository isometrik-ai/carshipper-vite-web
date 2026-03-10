import axios, { AxiosRequestConfig } from "axios";

/**
 * Builds the metadata object that must be sent
 * in the Authorization header as JSON.
 *
 * If you later need to include more fields, extend
 * this object only here so all requests stay in sync.
 */
const buildMetadata = () => {
    return {"metaData":{"City":"","Country":"USA","Device":"web","Make":"Chrome","OSVersion":"Linux-null","State":"","accountType":2,"appVersion":"49.34.128.79","countryCode":"+1","deviceId":"Chrome-Linux-null","deviceModel":"144.0.0.0","deviceType":3,"email":"spencerwhite40@gmail.org","ipAddress":"","isTeamMember":false,"latitude":0,"longitude":0,"mobile":"9375429013","name":"Spencer White","parentAcccountFCMTopic":null,"parentAcccountMQTTopic":null,"parentAccountId":null,"permissions":null,"role":"customer","sessionId":"69a05b59287355818e4a57f3","sessionStart":1772116825},"type":"Bearer","userId":"69a042d028735529fe4a57b8","userType":"user"}
}

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Axios may use AxiosHeaders; cast to any to safely mutate while
    // keeping call sites strongly typed.
    const headers: any = config.headers || {};

    // Only set Authorization if caller didn't explicitly override it.
    if (!headers.Authorization && !headers.authorization) {
      headers.Authorization = JSON.stringify(buildMetadata());
    }

    config.headers = headers;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
