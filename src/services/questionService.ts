import axios from 'axios'

class QuestionService {
  baseUrl = 'http://localhost:1323/questions'
  random = async () => {
    try {
      const { data } = await axios.get(`${this.baseUrl}/random`)
      return data
    } catch (error) {
      return { error: error }
    }
  }
}

export default new QuestionService()
