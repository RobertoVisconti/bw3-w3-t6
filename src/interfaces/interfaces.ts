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
export type UpdateProfileInput = Omit<
  Profile,
  "_id" | "username" | "createdAt" | "updatedAt" | "image"
>;

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

// INTERFACCIE PAGINA LAVORI

// interfaccia job
export interface Job {
  _id: string;
  url: string;
  title: string;
  company_name: string;
  category: string;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo_url?: string;
}

// interfaccia risposta API jobs
export interface JobsResponse {
  data: Job[];
}

// interfaccia state jobs
export interface JobsState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}
// interfaccia commenti
export interface Comment {
  _id: string;
  comment: string;
  rate: string;
  elementId: string;
  commentator: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentState {
  commentsByPost: Record<string, Comment[]>;
  isLoading: boolean;
  error: string | null;
}

export interface CommentInput {
  comment: string;
  rate: string;
  elementId: string;
}
