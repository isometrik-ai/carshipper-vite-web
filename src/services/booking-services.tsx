import { CREATE_NEW_SHIPMENT_BOOKING } from "@/lib/api.endpoint-constants";
import { postWithToken } from "./axios-request";

export const createNewShipmentBooking = async (payload: any) => {
    try {
      const endpoint = `${CREATE_NEW_SHIPMENT_BOOKING}`;
      const response = await postWithToken(endpoint, payload, '', 'application/json');
      return response;
    } catch (error) {
      console.log('error', error)
      return error;
    }
  };