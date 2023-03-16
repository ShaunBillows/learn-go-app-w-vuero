import axios from 'axios'

export const fetchRandomQuestion = async () => {
  try {
    const { data } = await axios.get('http://localhost:1323/questions/random')
    return data
  } catch (error) {
    return { error: error }
  }
}
