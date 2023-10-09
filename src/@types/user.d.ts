export interface UserProps {
    description: string;
    garden: string;
    accommodation: string;
    additionnal_information: string;
    size: string;
    distance: string;
    id: string;
    firstname: string;
    lastname: string;
    town: string;
    country: string;
    avatar: string;
    latitude: number;
    longitude: number;
    user_address: string;
  }
  
  export interface CardProps {
    avatar: string;
    firstname: string;
    lastname: string;
    distance: string;
    id: srting;
    town: string;
    user_address: string;
    country: string;
  }
  
  interface LeafletMapProps {
    center: [number, number];
    zoom: number;
    children: React.ReactNode;
  }
  
  // export type LeafletMapProps = {
  //   center: [number, number];
  //   children: ReactNode;
  //   zoom: number;
  //   scrollZooom: boolean;
  // } & MapOptions;
  