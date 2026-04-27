// lib/location.ts
export async function searchLocations(query: string) {
  if (!query) return [];

  const res = await fetch(
    `https://us1.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&limit=5&dedupe=1`,
  );

  if (!res.ok) throw new Error("Location fetch failed");

  const data = await res.json();

  return data.map((item: any) => ({
    name: item.display_name,
    lat: item.lat,
    lon: item.lon,
  }));
}
