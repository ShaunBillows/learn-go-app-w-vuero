<template>
  <div class="pricing-wrapper pt-4">
    <!-- Answer card-->
    <div
      v-for="(answer, i) in answers"
      :key="i"
      class="pricing-plan qn-card"
      :class="{
        green: answer.correct && answer.clicked,
        red: !answer.correct && answer.clicked,
      }"
    >
      <!-- Answer card-->
      <div class="name">{{ 'Option ' + parseInt(i + 1) }}</div>
      <!-- Card Icon -->
      <img :src="imgSrcCorrect" alt="" v-if="answer.correct && answer.clicked" />
      <img :src="imgSrcIncorrect" alt="" v-else-if="!answer.correct && answer.clicked" />
      <img :src="imgSrc" alt="" v-else />
      <!-- Result text -->
      <p class="p-3" v-if="answer.correct && answer.clicked">That's right!</p>
      <p class="p-3" v-else-if="!answer.correct && answer.clicked">Not quite...</p>
      <p class="p-3" v-else>Make your choice!</p>
      <!-- Choose button -->
      <div class="trial" @click="clickAnswer(answer)" style="cursor: pointer">Choose</div>
      <hr />
      <!-- Answer -->
      <p style="min-height: 13em" class="test">{{ answer.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Answer {
  text: string
  correct: boolean
  clicked: boolean
}

interface Props {
  msg: string
  answers: Answer[]
  answerQuestion: (answer: Answer) => void
}

const props = defineProps<Props>()

const clickAnswer = (answer: Answer) => {
  props.answerQuestion(answer)
  answer['clicked'] = true
}

const imgSrc = '/images/logos/logo/logo-accent.svg'
const imgSrcCorrect = '/images/logos/logo/logo.svg'
const imgSrcIncorrect = '/images/logos/logo/logo-platinum.svg'
</script>
