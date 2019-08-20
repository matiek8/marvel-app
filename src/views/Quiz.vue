<template>
    <div class="quiz">
        <Header
                :numCorrect="numCorrect"
                :numTotal="numTotal"/>
        <b-row class="ml-0 mr-0 mt-5">
            <b-col sm="4"></b-col>
            <b-col id="question_box_col"
                   sm="4">
                <div v-if="numTotal<10">
                    <QuestionBox
                            v-if="questions.length"
                            :currentQuestion="questions[index]"
                            :next="next"
                            :showAlert="showAlert"
                            :increment="increment"/>
                </div>
                <div v-else>
                    <b-container v-for="char in character">
                        <b-img id="sh_character_img"
                               center
                               :src="char.thumbnail.path+'/portrait_uncanny.jpg'"
                               img-alt="Image"
                               img-top
                               tag="article"
                               class="mb-2"></b-img>
                        <h1>Good job, {{char.name}}</h1>
                        <h1>Your result: {{numCorrect}}/{{numTotal}}</h1>
                        <b-button variant="outline-danger"
                                  @click="update_sh">Try again
                            <font-awesome-icon icon="redo"/>
                        </b-button>
                    </b-container>
                </div>
            </b-col>
            <b-col sm="4"
                   class="pr-5 pl-5">
                <b-alert variant="danger"
                         dismissible
                         fade
                         :show="dismissCountDown"
                         @dismiss-count-down="countDownChanged">
                    Choose an answer and press Submit.
                </b-alert>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import QuestionBox from "@/components/QuestionBox";
  import Header from "@/components/Header";
  import {mapState} from 'vuex'

  export default {
    name: "quiz",
    components: {
      Header,
      QuestionBox
    },
    data() {
      return {
        index: 0,
        numCorrect: 0,
        numTotal: 0,
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        sh_result_id: '',
        sh_result_characters: {
          10: 1010726,
          9: 1009411,
          8: 1009504,
          7: 1017103,
          6: 1009652,
          5: 1011038,
          4: 1011212,
          3: 1011146,
          2: 1014989,
          1: 1011071,
          0: 1010373
        }
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      next() {
        this.index++
      },
      increment(isCorrect) {
        if (isCorrect) {
          this.numCorrect++
        }
        this.numTotal++;
        if (this.numTotal === 10) {
          this.sh_result()
        }
      },
      sh_result() {
        this.sh_result_id = this.sh_result_characters[this.numCorrect];
        this.$store.dispatch('getCharacter', this.sh_result_id)
      },
      async update_sh() {
        this.$store.dispatch('getQuestions');
        this.numCorrect = 0;
        this.numTotal = 0;
      }
    },
    computed: {
      ...mapState({
        character: state => state.character,
        questions: state => state.questions,
      }),
    },
    async mounted() {
      this.$store.dispatch('getQuestions')
    }
  }
</script>

<style>
    .quiz {
        min-height: 87.9vh;
    }

    #question_box_col {
        min-width: 500px;
    }
</style>
