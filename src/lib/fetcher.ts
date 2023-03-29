import axios from 'axios';

export default function fetcher(url: string): any {
  return axios.get(url).then((res) => {
    return res.data;
  });
}
