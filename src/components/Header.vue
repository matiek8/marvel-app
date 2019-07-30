<template>
    <div id="header">
        <div>
            <b-nav>
              <b-nav-item disabled><b>SuperHero Quiz</b></b-nav-item>
                <b-nav-item disabled>Counter: {{numCorrect}}/{{numTotal}}</b-nav-item>
            </b-nav>
        </div>
    </div>
</template>

<script>
  export default {
    id: "header",
    props: [
      'numCorrect',
      'numTotal'
    ]
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
