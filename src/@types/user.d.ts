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

export interface BookingProps {
  isBookingContainerVisible: boolean;
  setIsBookingContainerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignupProps {
  isSignupContainerVisible: boolean;
  setIsSignupContainerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DateProps {
  isDateContainerVisible: boolean;
  setIsDateContainerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface FormProps {
  isFormContainerVisible: boolean;
  setIsFormContainerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
// export type LeafletMapProps = {
//   center: [number, number];
//   children: ReactNode;
//   zoom: number;
//   scrollZooom: boolean;
// } & MapOptions;
export interface HomeState {
  animal: string | null;
  user_address: string | null;
  disponibility_date: string | null;
  size: string | null;
  radius: string | null;
  longitude: string | null;
  latitude: string | null;
}

export interface LoginState {
  firstname: string | null;
  lastname: string | null;
  user_address: string | null;
  description: string | null;
  accomodation: string | null;
  garden: string | null;
  additionnal_information: string[] | null;
  animal_size: string[] | null;
  error: string | null;
}
