import { useEffect, useState } from "react";
import { supabase, type Neighborhood } from "@/lib/supabase";

type State = {
  neighborhoods: Neighborhood[];
  loading: boolean;
  error: string | null;
};

export function useNeighborhoods(): State {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);

      try {
        // Fetch neighborhoods
        const { data: neighborhoodsData, error: neighborhoodsError } = await supabase
          .from("stay_neighborhoods")
          .select("*");

        if (cancelled) return;
        if (neighborhoodsError) throw neighborhoodsError;

        // Fetch all hotels
        const { data: hotelsData, error: hotelsError } = await supabase
          .from("stay_hotels")
          .select("*");

        if (cancelled) return;
        if (hotelsError) throw hotelsError;

        // Combine: for each neighborhood, attach hotels with matching neighborhood_slug
        const combined = (neighborhoodsData || []).map((neighborhood) => ({
          ...neighborhood,
          hotels: (hotelsData || []).filter(
            (hotel) => hotel.neighborhood_slug === neighborhood.neighborhood_slug
          ),
        }));

        setNeighborhoods(combined as Neighborhood[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { neighborhoods, loading, error };
}
