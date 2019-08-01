<template>
    <div class="quiz">
        <Header
                :numCorrect="numCorrect"
                :numTotal="numTotal"/>
        <b-container class="bv-example-row">
            <b-row>
                <b-col sm="6"
                       offset="3">
                    <div v-if="numTotal<10">
                        <QuestionBox
                                v-if="questions.length"
                                :currentQuestion="questions[index]"
                                :next="next"
                                :increment="increment"/>
                    </div>
                    <div v-else>
                        <h1>Your result: {{numCorrect}}/{{numTotal}}</h1>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import QuestionBox from "@/components/QuestionBox";
  import Header from "@/components/Header";
  import axios from 'axios'

  export default {
    name: "quiz",
    components: {
      Header,
      QuestionBox
    },
    data() {
      return {
        questions: [],
        index: 0,
        numCorrect: 0,
        numTotal: 0
      }
    },
    methods: {
      next() {
        this.index++
      },
      increment(isCorrect) {
        if (isCorrect) {
          this.numCorrect++
        }
        this.numTotal++
      }
    },
    async mounted() {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=29&type=multiple`);
        response.data.results.forEach((item) => {
          this.questions.push(item)
        });
        console.log(this.questions)
      } catch (e) {
        console.error(e)
      }

    }
  }

</script>
