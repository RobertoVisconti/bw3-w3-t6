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
  allProfiles: Profile[];
  selectedProfile: Profile | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
}

// qui ci sono i dati per l'aggiornamento profilo
export type UpdateProfileInput = Omit<Profile, '_id' | 'username' | 'createdAt' | 'updatedAt' | 'image'>;

// interfaccia esperienze
export interface Experience {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  area: string;
  username: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceState {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
}

// interfaccia post
export interface Post {
  _id: string;
  text: string;
  username: string;
  user: Profile;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}