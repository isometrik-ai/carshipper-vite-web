import { VinNumberDetails } from "@/services/quote-services";
import axiosInstance from "@/services/axios-base";

jest.mock("@/services/axios-base", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

const mockedAxios = axiosInstance as unknown as {
  post: jest.Mock;
};

describe("VinNumberDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls decode-vin endpoint and returns data", async () => {
    const apiResponse = {
      data: {
        data: { year: "2020", make: "Toyota", model: "Camry" },
      },
    };
    mockedAxios.post.mockResolvedValue(apiResponse);

    const payload = { vin: "1HGCM82633A004352" };
    const result = await VinNumberDetails(payload);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toBe(
      "http://localhost:7009/v2/vehicle/decode-vin"
    );
    expect(mockedAxios.post.mock.calls[0][1]).toEqual(payload);
    expect(result).toEqual(apiResponse.data);
  });

  it("returns undefined when request fails in axios helper", async () => {
    const requestError = new Error("Network error");
    mockedAxios.post.mockRejectedValue(requestError);

    const result = await VinNumberDetails({ vin: "1HGCM82633A004352" });

    expect(result).toBeUndefined();
  });
});
