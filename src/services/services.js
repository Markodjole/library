import axios from 'axios';

export const  fetch = (url) => axios.get(url);
export const  avatarBaseUrl = 'https://i.pravatar.cc/50?u=';