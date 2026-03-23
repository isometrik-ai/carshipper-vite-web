export const validVinPayload = {
  data: {
    year: "2020",
    make: "Toyota",
    model: "Camry",
  },
};

export const undecodableVinPayload = {
  data: {
    year: "",
    make: "",
    model: "",
  },
};

export const vinApiErrorPayload = {
  message: "VIN decode failed",
};
