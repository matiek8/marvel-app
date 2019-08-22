<template>
    <div class="about">
        <b-container class="mt-5">
            <b-row>
                <b-col>
                    <b-img id="poster"
                           class="float-right"
                           src="https://i.annihil.us/u/prod/marvel/i/mg/9/40/5d54225db2e6e/clean.jpg"></b-img>
                </b-col>
                <b-col>
                    <h1>This project was created for studying purposes.</h1>
                    <h1>In the project <a href="https://developer.marvel.com/">Marvel Comics API</a> and <a
                            href="https://opentdb.com/api_config.php">Open Trivia API</a> are used.</h1>
                    <h1>Checkout a <a href="https://github.com/matiek8/marvel_app">github repository</a>.</h1>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style>
    .about {
        height: 100vh;
    }

    #poster {
        height: 600px;
    }
    h1 {
        color: white;
    }
</style>
