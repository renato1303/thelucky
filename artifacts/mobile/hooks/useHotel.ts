import { useEffect, useState } from "react";
import { supabase, type Hotel, type Neighborhood } from "@/lib/supabase";

export type HotelWithNeighborhood = Hotel & {
  neighborhood: Omit<Neighborhood, "hotels">;
};

type State = {
  hotel: HotelWithNeighborhood | null;
  loading: boolean;
  error: string | null;
};

export function useHotel(hotelId: string): State {
  const [hotel, setHotel] = useState<HotelWithNeighborhood | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hotelId) {
      setLoading(false);
      return;
    }
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);

      try {
        // Fetch hotel
        const { data: hotelData, error: hotelError } = await supabase
          .from("stay_hotels")
          .select("*")
          .eq("id", hotelId)
          .single();

        if (cancelled) return;
        if (hotelError) throw hotelError;

        // Neighborhood data is not available in stay_neighborhoods, so we skip it
        setHotel({ ...hotelData, neighborhood: undefined as any });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [hotelId]);

  return { hotel, loading, error };
}
