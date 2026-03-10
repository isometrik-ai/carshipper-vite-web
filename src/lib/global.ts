import { CountryCode, getExampleNumber } from "libphonenumber-js/max";
import examples from "libphonenumber-js/examples.mobile.json"; 

export const getPhoneNumberLengthRange = (countryCode:CountryCode) => {
    const exampleNumber = getExampleNumber(countryCode, examples);
    if (exampleNumber) {
      const nationalNumber = exampleNumber.nationalNumber;
      return { min: nationalNumber.length, max: nationalNumber.length };
    } else {
      return { min: 0, max: 0 }; // Fallback if no example found
    }
  };

  /**
   * @description Common helper to extract normalized address fields from a Google Places result.
   * Use this wherever we use Google Autocomplete / Places so address parsing is consistent.
   *
   * Expected input: a Place Result object returned by Google Maps Places API
   * (e.g. from Autocomplete or PlacesService.getDetails).
   *
   * Returned shape:
   * {
   *   addressLine1, // e.g. "1600 Amphitheatre Pkwy"
   *   addressLine2, // e.g. "Mountain View"
   *   city,
   *   state,
   *   stateCode,
   *   zipCode,
   *   country,
   *   lat,
   *   long
   * }
   */
export const getFormattedAddressFromGooglePlace = (place: any) => {
    if (!place) return {};

    const components = place.address_components || [];

    const findComponent = (types: string[]) =>
      components.find((comp: any) =>
        comp.types && comp.types.some((t: string) => types.includes(t))
      );

    const streetNumberComp = findComponent(["street_number"]);
    const routeComp = findComponent(["route"]);
    const subLocalityComp = findComponent(["sublocality", "sublocality_level_1", "neighborhood"]);
    const cityComp =
      findComponent(["locality"]) ||
      findComponent(["administrative_area_level_2"]);
    const stateComp = findComponent(["administrative_area_level_1"]);
    const postalCodeComp = findComponent(["postal_code"]);
    const countryComp = findComponent(["country"]);

    const streetNumber = streetNumberComp?.long_name || "";
    const route = routeComp?.long_name || "";

    const addressLine1 = [streetNumber, route]
      .filter(Boolean)
      .join(" ")
      .trim() || place.formatted_address || "";

    const addressLine2 = subLocalityComp?.long_name || "";

    const city = cityComp?.long_name || "";
    const state = stateComp?.long_name || "";
    const stateCode = stateComp?.short_name || "";
    const zipCode = postalCodeComp?.long_name || "";
    const country = countryComp?.short_name || countryComp?.long_name || "";

    const lat =
      typeof place.geometry?.location?.lat === "function"
        ? place.geometry.location.lat()
        : place.geometry?.location?.lat;
    const long =
      typeof place.geometry?.location?.lng === "function"
        ? place.geometry.location.lng()
        : place.geometry?.location?.lng;

    return {
      addressLine1,
      addressLine2,
      city,
      state,
      stateCode,
      zipCode,
      country,
      lat,
      long,
    };
}