<template>
    <div class="quiz">
        <b-row class="ml-0 mr-0 mt-5">
            <b-col sm="4">
                <div class="row">
                    <b-col v-if="numTotal<10">
                        <h1 class="display-1 text-danger text-center">{{numCorrect}}</h1>
                        <p class="text-danger text-center" style="margin-top: -25px">score</p>
                    </b-col>
                    <b-col></b-col>
                </div>
            </b-col>
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
                    <b-container v-for="char in character" class="text-center">
                        <b-img id="sh_character_img"
                               center
                               :src="char.thumbnail.path+'/portrait_uncanny.jpg'"
                               img-alt="Image"
                               img-top
                               tag="article"
                               class="mb-2"></b-img>
                        <div class="container" style="width: 300px; margin-top: -180px; color: white">
                            <h3>Good job, {{char.name}}</h3>
                            <h4>Your result: {{numCorrect}}/{{numTotal}}</h4>
                            <b-button variant="danger"
                                      @click="update_sh">Try again
                                <font-awesome-icon icon="redo"/>
                            </b-button>
                        </div>
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
    import {mapState} from 'vuex'

    export default {
        name: "quiz",
        components: {
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
        max-width: 600px;
        padding-top: 50px;
    }
</style>
