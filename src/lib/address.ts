export type BasicAddress = {
  addLine1: string;
  addLine2?: string;
  city: string;
  state: string;
  zip: string;
};

export function formatFullAddress(address: BasicAddress): string {
  const { addLine1, addLine2, city, state, zip } = address;
  const line2Part = addLine2 ? `${addLine2}, ` : "";
  return `${addLine1}, ${line2Part}${city}, ${state}, ${zip}`;
}

export function formatAddressWithEllipsis(
  address: BasicAddress,
  maxLength = 60
): string {
  const full = formatFullAddress(address);
  if (!full) return "";
  return full.length > maxLength ? `${full.slice(0, maxLength - 3)}...` : full;
}

