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

// qui ci sono i dati per l'aggiornamento profilo
export type UpdateProfileInput = Omit<Profile, '_id' | 'username' | 'createdAt' | 'updatedAt' | 'image'>;