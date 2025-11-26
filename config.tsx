export const BASE_URL =  "https://imdb236.p.rapidapi.com/api/imdb"

export const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.EXPO_PUBLIC_RAPID_API_HOST,
    },
};

