function getEnvConfig(name: string, required = true) {
    const value = process.env[name];
  
    if (!value && required) {
      throw new Error(`❌ Missing environment variable: ${name}`);
    }
  
    return value;
  }
  
  export const ENV_CONFIG = {
    STRAPI_API_URL: getEnvConfig("NEXT_PUBLIC_STRAPI_API_URL"),
  };