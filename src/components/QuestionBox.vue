<template>
    <div class="question-box-container">
        <b-progress :value="question_number" :max="question_qty" variant="danger"
                    class="m-0 border-0 rounded-0"></b-progress>
        <b-jumbotron class="rounded-0 p-5" lead="Bootstrap v4 Components for Vue.js 2">
            <template slot="lead">
                <p class="text-center">
                    <small>Question {{question_number}}/{{question_qty}}</small>
                </p>
                <p id="sh_question">{{ currentQuestion.question | unescape_str }}</p>
            </template>

            <hr class="my-4">

            <b-list-group>
                <b-list-group-item
                        class="answer_block"
                        v-for="(answer, index) in shuffledAnswers"
                        :key="index"
                        @click="selectAnswer(index)"
                        :class="answerClass(index)">
                    {{ answer | unescape_str }}
                </b-list-group-item>
            </b-list-group>
            <div class="row">
                <b-button variant="outline-dark"
                          class="mx-auto"
                          @click="is_answer_submitted">Next
                </b-button>
            </div>
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
                answered: false,
                question_qty: 10,
                question_number: 1
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
                if (this.selectedIndex != null) {
                    this.question_number += 1;
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
        color: #242424;
    }

    .answer_block {
        margin-bottom: 5px;
        border-radius: 0.6rem;
    }

    .list-group {
        margin-bottom: 15px;
    }

    .list-group-item:hover {
        background: #474747;
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
        background-color: #e54d53;
        color: white;
    }
</style>
