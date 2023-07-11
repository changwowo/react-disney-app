import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://api.themoviedb.org/3', // base가 될 URL
  params : {
    api_key : '08630e9d6882045f8fa0ae0ac97f8bf3', // 나중에 뒤에 붙일것들은 Params로 정의한것!
    language : 'ja-JA' // 이건 나중에 일본어로도 한국어로도 가능
  }
})

export default instance;