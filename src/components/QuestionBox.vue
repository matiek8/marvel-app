<template>
    <div class="question-box-container">
        <b-jumbotron bg-variant="danger"
                     lead="Bootstrap v4 Components for Vue.js 2">
            <template slot="lead">
                <p id="sh_question">{{ currentQuestion.question | unescape_str }}</p>
            </template>

            <hr class="my-4">

            <b-list-group>
                <b-list-group-item
                        variant="danger"
                        v-for="(answer, index) in shuffledAnswers"
                        :key="index"
                        @click="selectAnswer(index)"
                        :class="answerClass(index)">
                    {{ answer | unescape_str }}
                </b-list-group-item>
            </b-list-group>

            <b-button variant="outline-dark"
                      @click="is_answer_submitted">Next
            </b-button>

        </b-jumbotron>
    </div>
</template>

<script>
  import lodash from 'lodash'

  export default {
    name: "QuestionBox",
    props: {
      currentQuestion: Object,
      next: Function,
      increment: Function,
      showAlert: Function,
    },
    data() {
      return {
        selectedIndex: null,
        correctIndex: null,
        shuffledAnswers: [],
        answered: false
      }
    },
    watch: {
      currentQuestion: {
        immediate: true,
        handler() {
          this.selectedIndex = null;
          this.shuffleAnswers();
          this.answered = false
        }
      }
    },
    methods: {
      is_answer_submitted() {
            if (this.selectedIndex!=null) {
              this.next()
            } else {
              this.showAlert()
            }
      },
      selectAnswer(index) {
        this.selectedIndex = index
                let isCorrect = false;
        if (this.selectedIndex === this.correctIndex) {
          isCorrect = true
        }
        this.answered = true;
        this.increment(isCorrect)

      },
      shuffleAnswers() {
        let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
        this.shuffledAnswers = lodash.shuffle(answers);
        this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer);
      },
      answerClass(index) {
        let answerClass = '';
        if (!this.answered && this.selectedIndex === index) {
          answerClass = 'selected'
        } else if (this.answered && this.correctIndex === index) {
          answerClass = 'correct'
        } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
          answerClass = 'incorrect'
        }
        return answerClass
      }
    },
    filters: {
      unescape_str: function (value) {
        return value.replace(/&quot;/g, '\"')
          .replace(/&amp;/g, '\&')
          .replace(/&ldquo;/g, '“')
          .replace(/&rdquo;/g, '”')
          .replace(/&gt;/g, '\>')
          .replace(/&lt;/g, '\<')
          .replace(/&#039;/g, '\'')
      }
    },
    mounted() {
      this.shuffleAnswers()
    }
  }
</script>

<style scoped>
    #sh_question {
        color: white;
    }

    .list-group {
        margin-bottom: 15px;
    }

    .list-group-item:hover {
        background: #ee7373;
        color: white;
        cursor: pointer;
    }

    .btn {
        margin: 0 5px;
    }

    .selected {
        background-color: #3a3737;
        color: white;
    }

    .correct {
        background-color: #33b1ae;
        color: white;
    }

    .incorrect {
        background-color: #e5c75d;
    }
</style>
