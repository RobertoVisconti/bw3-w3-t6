// interfaccia base
export interface Profile {
  _id: string;
  name: string;
  surname: string;
  email: string;
  bio: string;
  title: string;
  area: string;
  image: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// interfaccia per sezione profilo
export interface ProfileState {
  myProfile: Profile | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

// qui ci sono i dati per l'aggiornamento profilo
export type UpdateProfileInput = Omit<Profile, '_id' | 'username' | 'createdAt' | 'updatedAt' | 'image'>;