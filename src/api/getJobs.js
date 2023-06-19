import axios from 'axios'

const getJobs = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/jobs`
  await axios.get(url)
}

export default getJobs
