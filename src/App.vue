<template>
    <div id="app">
        <b-navbar toggleable="sm"
                  type="dark"
                  variant="danger">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand href="/">SH</b-navbar-brand>

            <b-collapse id="nav-text-collapse"
                        is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/quiz">Quiz</b-nav-item>
                    <b-nav-item href="/about">About</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view/>
    </div>
</template>

<script>

  export default {
    name: 'app',
    components: {}
  }
</script>

<style>
    /*#app {*/
    /*    font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*    -webkit-font-smoothing: antialiased;*/
    /*    -moz-osx-font-smoothing: grayscale;*/
    /*    text-align: center;*/
    /*    color: #2c3e50;*/
    /*}*/

    /*#nav {*/
    /*    padding: 30px;*/
    /*}*/

    /*#nav a {*/
    /*    font-weight: bold;*/
    /*    color: #2c3e50;*/
    /*}*/

    /*#nav a.router-link-exact-active {*/
    /*    color: #42b983;*/
    /*}*/
</style>
