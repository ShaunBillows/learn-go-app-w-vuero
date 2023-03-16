<template>
  <div class="section has-bg-dots">
    <div class="container">
      <!--Title-->
      <div class="section-title has-text-centered">
        <h2 class="title is-2">Test your Programming Knowledge</h2>
        <h4>Answer Multiple Choice Questions to Brush Up Your Skills</h4>
      </div>
      <!-- Connection error message -->
      <div class="cta-block no-border" v-if="error">
        <div class="head-text">
          <h3>
            An error occurred connecting to the server. Sorry this game isn't available
            right now, check back later!
          </h3>
        </div>
      </div>
      <div v-else>
        <div class="pricing-wrapper">
          <!-- Question -->
          <div class="column is-4">
            <div class="card card-icon-box">
              <div class="card-content">
                <VIconBox size="medium" color="purple"> Q </VIconBox>
                <h4 class="title is-5 py-1">Question</h4>
                <p class="subtitle is-6 light-text" style="min-height: 3em">
                  {{ question }}
                </p>
              </div>
            </div>
          </div>
          <!-- difficulty/topic box -->
          <div class="column is-4">
            <div class="card card-icon-box">
              <div class="card-content">
                <VIconBox size="medium" color="purple"> {{ difficulty }} </VIconBox>
                <h4 class="title is-5 py-1">{{ `${difficultyText} difficulty` }}</h4>
                <p class="subtitle is-6 light-text" style="min-height: 3em">
                  {{ `This question is about ${topic}.` }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Answers -->
        <CurrentAnswers
          msg=""
          :answers="answers"
          :getQuestion="getQuestion"
          :answerQuestion="answerQuestion"
        />
        <!--Footer-->
        <div class="cta-block no-border">
          <!-- Score -->
          <div class="head-text">
            <h3>Scoreboard</h3>
            <p class="mt-2">
              {{
                `You answered ${score} out of ${total} questions correctly on the first try`
              }}
            </p>
          </div>
          <!-- Next question button -->
          <div class="head-action">
            <div class="buttons">
              <VButton
                class="action-button"
                color="primary"
                rounded
                elevated
                @click="clickNextQuestion"
              >
                Next Question
              </VButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs, reactive } from 'vue'
import CurrentAnswers from './components/Answers.vue'
import { fetchRandomQuestion } from '../../services/questionService'

interface Answer {
  text: string
  correct: boolean
}

interface Data {
  id: number
  question: string
  answer: string
  incorrect_answer_1: string
  incorrect_answer_2: string
  difficulty: number
  topic: string
  error: false
}

const state = reactive({
  answers: [] as Answer[],
  score: 0,
  questionAttempted: false,
  error: false,
  data: {} as Data,
  total: 0,
})

const getQuestion = async () => {
  state.questionAttempted = false
  state.data = await fetchRandomQuestion()
  if (state.data.error) {
    state.error = true
    return
  }
  state.answers = [
    { text: state.data.answer, correct: true },
    { text: state.data.incorrect_answer_1, correct: false },
    { text: state.data.incorrect_answer_2, correct: false },
  ].sort(() => Math.random() - 0.5)
}
const answerQuestion = (answer: Answer) => {
  // increments the score if answered correctly first time
  if (answer.correct && !state.questionAttempted) {
    state.score++
  }
  if (!state.questionAttempted) {
    state.total++
  }
  state.questionAttempted = true
}

const clickNextQuestion = () => {
  if (!state.questionAttempted) {
    state.total++
  }
  getQuestion()
}

const question = computed(() => state.data.question)
const topic = computed(() => state.data.topic)
const difficulty = computed(() => state.data.difficulty)
const getDifficultyText = (difficulty: number): string => {
  switch (difficulty) {
    case 5:
      return 'Very Hard'
    case 4:
      return 'Hard'
    case 3:
      return 'Medium'
    case 2:
      return 'Easy'
    case 1:
      return 'Very Easy'
    default:
      return 'Unknown Difficulty'
  }
}
const difficultyText = computed(() => getDifficultyText(state.data.difficulty))

const { answers, score, total, error } = toRefs(state)

onMounted(() => getQuestion())
</script>
