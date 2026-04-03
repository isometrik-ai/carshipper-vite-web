import { CREATE_NEW_SHIPMENT_BOOKING, GET_CONTACTS_LIST, GET_VEHICLES_LIST, GET_VEHICLE_COLOR_LIST } from "@/lib/api.endpoint-constants";
import { getWithToken, postWithToken } from "./axios-request";

export const createNewShipmentBooking = async (payload: any) => {
  try {
    const endpoint = `${CREATE_NEW_SHIPMENT_BOOKING}`;
    const response = await postWithToken(endpoint, payload, '', '');
    return response;
  } catch (error) {
    console.error('Error creating shipment booking:', error);
    return { success: false, error: error.message || error };
  }
};

// GET Contact List
export const getAllContactList = async (
  payload: { skip?: number; limit?: number; search: string, isTmsOrCarrierVendor?: boolean } = {
    skip: 0,
    limit: 10,
    search: "",
    isTmsOrCarrierVendor: false
  }
) => {
  const { skip, limit, search, isTmsOrCarrierVendor } = payload;
  try {
    let endpoint = `${GET_CONTACTS_LIST}/all?limit=${limit}&skip=${skip}&status=1`;
    if (search) {
      endpoint += `&search=${search}`;
    }
    if (isTmsOrCarrierVendor) {
      endpoint += `&isTmsOrCarrierVendor=${isTmsOrCarrierVendor}`;
    }
    const response = await getWithToken(endpoint, {}, "");
    return response;
  } catch (error) {
    return error;
  }
};

// GET Vehicles List
export const getAllVehiclesTypesList = async (
) => {
  try {
    let endpoint = `${GET_VEHICLES_LIST}`;
    const response = await getWithToken(endpoint);
    return response;
  } catch (error) {
    return error;
  }
};

// GET Vehicle Color List
export const getAllVehicleColorsList = async (
) => {
  try {
    let endpoint = `${GET_VEHICLE_COLOR_LIST}`;
    const response = await getWithToken(endpoint);
    return response;
  } catch (error) {
    return error;
  }
};