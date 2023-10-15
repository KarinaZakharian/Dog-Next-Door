interface DisponibilityProps {
  id: string;
  start_date: string;
  end_date: string;
}

export interface UserProps {
  description: string | null;
  garden: string | null;
  accommodation: string | null;
  additionnal_information: string | null;
  size: string | null;
  distance: string | null;
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  town: string | null;
  country: string | null;
  avatar: string | null;
  latitude: number | null;
  longitude: number | null;
  user_address: string | null;
  disponibility_date: DisponibilityProps[] | nulle;
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
  disponibility_date: DisponibilityProps;
  id: string;
  bookingNotAvailibleEnd: string;
  bookingNotAvailibleStart: string;
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

export interface MessageProps {
  clientId: string;
  isMessageOpen: boolean;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
