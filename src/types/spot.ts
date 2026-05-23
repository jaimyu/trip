export interface Spot {
  id: string;
  name: string;
  province: string;
  type: "nature" | "history" | "mixed";
  cover: string;
  rating: number;
  summary: string;
  overview: {
    description: string;
    openTime: string;
    ticket: string;
    duration: string;
    bestSeason: string;
  };
  transport: {
    flights: string[];
    local: string;
    parking: string;
  };
  routes: RoutePlan[];
  hotels: Hotel[];
  foods: Food[];
  tips: string[];
  gallery: string[];
}

export interface RoutePlan {
  title: string;
  type: string;
  steps: string[];
}

export interface Hotel {
  name: string;
  level: "high" | "mid" | "low";
  price: string;
  description: string;
}

export interface Food {
  name: string;
  description: string;
  restaurant: string;
  price: string;
}

export type SpotType = Spot["type"];
