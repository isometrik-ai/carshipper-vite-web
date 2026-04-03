import axios, { AxiosRequestConfig } from "axios";
import { appSecret, licenseKey } from "@/lib/config";

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
      //`Bearer eyJhbGciOiJSU0EtT0FFUCIsImN0eSI6IkpXVCIsImVuYyI6IkExMjhHQ00iLCJ0eXAiOiJKV1QifQ.Xo-FPFY_J4V75rG9sdBU-W6VKM_CP4rZKsNgdR6m__aQvs7Tlvhztv1CGu1_63S9zAECDjuKsY-kM8hOQsNmmD10ADPFEiVWUs4qAalW6kWwfsz7wRpqL5G61Yvnv9qfvyZhX2vMc8LQXtoPPztOQCIa16l5Uvw0oZ8h8cnNy3U.mYql-UTBClpyFZ84.rA_RW1QNmMHZzW7g8l7lYE4hGoP1gfMFk3TASDAD8ldRm7GjJz4Euk2sOVJrNE04vHyb6VPPeuJgTCX-AooyJw7HMllLpPmw1Ptl11yoBt3E_dSKLZbjil6d3NNI50ozbmJD__83UdbK6Sq8ek0h3miJ3reMz0Rhbm3AG32luv5nyC0hgXPHtbVgmcUB5O8DdXwlDC6qtaHOSfMTZs3gzKCKkUmoFaOg814Y1acNWWFlo4RAn79EixI-HbyIJvU37GRA7JXh5WhRKKJDs_MWB6gQDy5JeqZBl0XoTau1PjgpKytPP4hcwfg8582QKOLGlM3-qsp0G-6ZYvo4IqzP8fqSOlN4TOc9PgZse7TBeQdUpN_lpAyjm4uN6syN2qsGe7xCdtMIA1ZxSCqYGZrhme`;
      //JSON.stringify(buildMetadata());
    }

    config.headers = headers;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


// leads api axios instance 

const leadsAxiosInstance = axios.create();

leadsAxiosInstance.interceptors.request.use(
  (config) => {
    // Axios may use AxiosHeaders; cast to any to safely mutate while
    // keeping call sites strongly typed.
    const headers: any = config.headers || {};

    // Enforce exact leads header keys expected by downstream service.
    // delete headers["app-secret"];
    // delete headers["license-key"];
    headers["appSecret"] = "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAADbQAAAAlhY2NvdW50SWRtAAAAGDY5MWFkMjdjMzQ4ZjcwZjUxOGVlMDA1M20AAAAIa2V5c2V0SWRtAAAAJDk4MzIzZTQ2LWY4NzAtNDBiMS1hOWIzLTQ0YzdhMjhjZjkwYW0AAAAJcHJvamVjdElkbQAAACQwMzBmNjIzMS05ZDE3LTQxZjktOGE0Zi0yYTNhODMzNzE1ZmJkAAZzaWduZWRuBgBo2cE-nQE.eVQQiW9ZSvQxRPCur3cvQ-jp5vJB-eTOZ8TgwYWet_k";
    headers["licenseKey"] = "lic-IMKS/zdVziEHEBWxJEWrSgMasbVNNrxT71e";

    config.headers = headers;
    return config;
  },
  (error) => Promise.reject(error)
);

export { leadsAxiosInstance }