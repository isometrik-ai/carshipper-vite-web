import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { TrackShipmentResponse, TrackShipmentData } from "@/types/TrackShipment.types";
import { TRACK_SHIPMENT_ENDPOINT } from "@/constants/apiConstants";

const fetchTrackShipment = async (): Promise<TrackShipmentData> => {
    const { data } = await apiClient.get<TrackShipmentResponse>(TRACK_SHIPMENT_ENDPOINT);
    return data.data;
};

export const useTrackShipment = () => {
    return useQuery({
        queryKey: ["track-shipment"],
        queryFn: fetchTrackShipment,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};
