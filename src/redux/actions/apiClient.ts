// import type  { Dispatch } from 'redux';
// import type { Profile } from '../../interfaces/interfaces';

// questa è l'api con la key
const BASE_URL = 'https://striveschool-api.herokuapp.com/api/'
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTBhZTM2YjA2YmJlOTAwMTVkZWU1ODQiLCJpYXQiOjE3NzkwOTg0NzUsImV4cCI6MTc4MDMwODA3NX0.-amWlkvhLkyvFEa7toH1UhJxcWNFuvFda6biS6swSVA';

export async function customFetch<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body?: unknown
): Promise<T> {
  const headers: Record<string, string> = {
    'Authorization': TOKEN
  };

  let finalBody: BodyInit | undefined = undefined;
  if (body) {
    if (body instanceof FormData) {
      finalBody = body;
    } else {
      headers['Content-Type'] = 'application/json';
      finalBody = JSON.stringify(body);
    }
  };
     
  const config: RequestInit = {
    method,
    headers,
    body: finalBody
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`Errore API: ${response.status}`);
  }

  if (method === 'DELETE') return {} as T;

  return await response.json();
}


// // esporto le azioni di GET
// export const GET_PROFILE_LOADING = 'GET_PROFILE_LOADING';
// export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
// export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

// // esporto le azioni di PUT
// export const PUT_PROFILE_LOADING = 'PUT_PROFILE_LOADING';
// export const PUT_PROFILE_SUCCESS = 'PUT_PROFILE_SUCCESS';
// export const PUT_PROFILE_ERROR = 'PUT_PROFILE_ERROR';

// // qui ci sono le interfacce per lavorarci sopra
// interface GetProfileLoadingAction { type: typeof GET_PROFILE_LOADING }
// interface GetProfileSuccessAction { type: typeof GET_PROFILE_SUCCESS; payload: Profile }
// interface GetProfileErrorAction { type: typeof GET_PROFILE_ERROR; payload: string }

// interface PutProfileLoadingAction { type: typeof PUT_PROFILE_LOADING }
// interface PutProfileSuccessAction { type: typeof PUT_PROFILE_SUCCESS; payload: Profile }
// interface PutProfileErrorAction { type: typeof PUT_PROFILE_ERROR; payload: string }

// export type ProfileActions = 
//   | GetProfileLoadingAction 
//   | GetProfileSuccessAction 
//   | GetProfileErrorAction
//   | PutProfileLoadingAction
//   | PutProfileSuccessAction
//   | PutProfileErrorAction;

// //   fetch per richiamare il mio profilo
// export const getMyProfileAsync = () => {
//   return async (dispatch: Dispatch<ProfileActions>) => {
//     dispatch({ type: GET_PROFILE_LOADING });
//     try {
//       const response = await fetch(`${BASE_URL}me`, { headers });
//       if (!response.ok) throw new Error('Errore nel recupero del profilo');
      
//       const data = await response.json();
//       dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message: 'Errore sconosciuto'
//       dispatch({ type: GET_PROFILE_ERROR, payload: errorMessage });
//     }
//   };
// };

// //  fetch per modificare il profilo
// export const updateProfileAsync = (profileData: Profile) => {
//   return async (dispatch: Dispatch<ProfileActions>) => {
//     dispatch({ type: PUT_PROFILE_LOADING });
//     try {
//       const response = await fetch(BASE_URL, {
//         method: 'PUT',
//         headers,
//         body: JSON.stringify(profileData)
//       });
//       if (!response.ok) throw new Error("Errore durante la modifica del profilo");

//       const data = await response.json();
//       dispatch({ type: PUT_PROFILE_SUCCESS, payload: data });
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message: 'Errore sconosciuto'
//       dispatch({ type: PUT_PROFILE_ERROR, payload: errorMessage });
//     }
//   };
// };
