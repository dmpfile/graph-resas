import axios from 'axios'
import type { PrefObject } from 'Resas'

const axiosInstance = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp',
  headers: {
    'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY,
  },
})

class ResasAPI {
  async fetchPrefList() {
    return axiosInstance.get<PrefObject>('/api/v1/prefectures')
  }
  async fetchPopulationByPref(prefCode: string) {
    return axiosInstance.get(
      `/api/v1/population/composition/perYear?prefCode=${prefCode}`
    )
  }
}

export default new ResasAPI()
