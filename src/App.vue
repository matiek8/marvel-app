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
        <Footer/>
    </div>
</template>

<script>
    import Footer from "./components/Footer";

  export default {
    name: 'app',
    components: {
      Footer
    }
  }
</script>

<style>
    #app {
        background: black;
    }
</style>
