export interface DestinationConfig {
  uuid: string;
  centerLat: number;
  centerLng: number;
  zoom: number;
}

export const DESTINATION_CONFIG: Record<string, DestinationConfig> = {
  "rio-de-janeiro": {
    uuid: "7f047742-427f-4b11-8286-781af899c57d",
    centerLat: -22.9068,
    centerLng: -43.1729,
    zoom: 11,
  },
  "miami": {
    uuid: "88f3aa4e-eb5b-46e4-a10e-869a83b2ea25",
    centerLat: 25.7617,
    centerLng: -80.1918,
    zoom: 11,
  },
  "nova-york": {
    uuid: "24c45a84-70a9-43b6-b1fa-0063457d9644",
    centerLat: 40.7128,
    centerLng: -74.0060,
    zoom: 11,
  },
  "sao-paulo": {
    uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    centerLat: -23.5505,
    centerLng: -46.6333,
    zoom: 11,
  },
  "ibiza": {
    uuid: "79f6d0cd-b490-4037-92a8-4bf371b8511e",
    centerLat: 38.9067,
    centerLng: 1.4206,
    zoom: 11,
  },
};

export const DESTINO_IDS: Record<string, string> = Object.fromEntries(
  Object.entries(DESTINATION_CONFIG).map(([slug, cfg]) => [slug, cfg.uuid])
);

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Destino {
  slug:  string;
  nome:  string;
  foto?: string;
}

export interface GuiaContextValue {
  destinoSelecionado: Destino | null;
  selecionarDestino:  (d: Destino) => void;
}

const GuiaContext = createContext<GuiaContextValue>({
  destinoSelecionado: null,
  selecionarDestino:  () => {},
});

export function GuiaProvider({ children }: { children: ReactNode }) {
  const [destinoSelecionado, setDestino] = useState<Destino | null>(null);

  const selecionarDestino = useCallback((d: Destino) => {
    setDestino(d);
  }, []);

  return (
    <GuiaContext.Provider value={{ destinoSelecionado, selecionarDestino }}>
      {children}
    </GuiaContext.Provider>
  );
}

export function useGuia() {
  return useContext(GuiaContext);
}
