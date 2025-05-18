<template>
    <div class="coopfluenced-container">
        <v-container fluid>
            <!-- Hero Section -->
            <v-row justify="center" class="mt-4">
                <v-col cols="12" class="text-center">
                    <v-img :src="bgBackground" height="300px" cover class="mx-auto rounded-lg mb-6" max-width="800" />

                    <h1 class=" pokemon-font text-white mb-2">
                        Live Coopfluenced Count:
                    </h1>
                    <p class="pokemon-font text-white mb-6">
                        {{ count }}
                    </p>
                    <v-btn @click="openDialog" color="#099FDC" class="px-6 py-3 rounded-lg" size="x-large">
                        I've been Coopfluenced!
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Messages Section -->
            <v-row justify="center" class="mt-8">
                <v-col cols="12" md="10">
                    <MessagesComponent />
                </v-col>
            </v-row>

            <!-- About Coop Section -->
            <v-row justify="center" class="mt-8 mb-8">
                <v-col cols="12" md="10">
                    <div class="text-white leading-relaxed">
                        <p class="font-bangers mb-4">
                            CoopsCollection is more than just a name—it's a movement. Coop has inspired countless
                            individuals to get into collecting, sharing his passion, knowledge, and signature energy
                            with a
                            growing community.
                            <br /><br />
                            One of Coop's most powerful impacts has been on the younger generation. He regularly "slabs
                            a
                            kid," giving out graded cards to show them the value of their interest and to spark a
                            lifelong
                            love for collecting. These acts of generosity speak volumes about his character and his
                            belief
                            in giving
                            back.
                            <br /><br />
                            Beyond the slabs, Coop constantly runs giveaways, engages his audience with real enthusiasm,
                            and
                            brings people together through a shared passion. He's done so much for the hobby—and for the
                            community around it—that it only felt right to give back in some small way.
                            <br /><br />
                            That's why I built this site—as a fun tribute to Coop and everything he's done. The counter
                            is
                            just a goofy way to show how many of us have been "Coopfluenced" into joining the hobby or
                            upping our game. Please don't abuse it—it's all for fun and out of respect for someone who's
                            made a real
                            difference.
                            <br /><br />
                            Thanks for being part of the community—and big ups to Coop.
                        </p>
                    </div>
                </v-col>
            </v-row>

            <!-- Footer Section -->
            <v-footer class="text-white">
                <div class="mx-auto text-center">
                    <a href="https://linktr.ee/coops_collection" target="_blank" rel="noopener noreferrer"
                        class="text-white font-bangers">
                        Linktree
                    </a>
                </div>
            </v-footer>

            <!-- Add Count Dialog -->
            <v-dialog v-model="dialogVisible" max-width="600px" scrollable>
                <v-card class="bg-dark text-white rounded-lg">
                    <v-card-title class="justify-center">
                        <v-row no-gutters align="center" justify="center" class="text-center">
                            <v-col cols="12">
                                <div class="font-bangers text-h5">
                                    I've been Coopfluenced!
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-title>

                    <v-divider class="border-opacity-50" />

                    <v-card-text class="px-4 py-4">
                        <v-img :src="djKhaled" class="mb-6 mx-auto rounded-lg" max-width="300" contain />

                        <div class="text-center text-body-1 mb-6">
                            Send a message to Coop and let him know how he has influenced
                            you! Your message will be displayed on the site for others to
                            see. You can also choose to remain anonymous by leaving the
                            name field blank.
                        </div>

                        <v-text-field v-model="name" label="Name (Optional)" outlined class="mb-4"
                            bg-color="grey-darken-3" hide-details />

                        <v-textarea v-model="message" label="Your Message (Optional)" outlined maxlength="300" rows="3"
                            bg-color="grey-darken-3" hide-details class="mb-2" />
                        <div class="text-caption text-right text-grey mb-4">
                            {{ message.length }}/300 characters
                        </div>
                    </v-card-text>

                    <v-card-actions class="px-4 pb-4 justify-space-between">
                        <v-btn color="grey" variant="text" @click="closeDialog" class="px-4">
                            Cancel
                        </v-btn>
                        <v-btn color="#099FDC" variant="flat" @click="addToCount" class="px-6"
                            :disabled="disableConfirmButton">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>


<script>
import MessagesComponent from '@/components/MessagesComponent.vue'
import { mapState, mapActions } from 'vuex'
import banner from '@/assets/coopbanner.jpg'
import dj from '@/assets/djkhaled-dancing.gif'
export default {
    components: {
        MessagesComponent
    },
    data() {
        return {
            dialogVisible: false,
            name: '',
            message: '',
            bgBackground: banner,
            djKhaled: dj
        }
    },
    computed: {
        ...mapState('count', ['count']),

        disableConfirmButton() {
            return this.name !== '' && !this.message
        }
    },
    methods: {
        ...mapActions('count', ['fetchCount', 'incrementCount']),
        ...mapActions('messages', ['addMessage']),

        openDialog() {
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false
            this.name = ''
            this.message = ''
        },
        addToCount() {
            this.incrementCount()
            if (this.name || this.message) {
                this.addMessage({
                    name: this.name,
                    message: this.message
                })
            }
            this.closeDialog()
        }
    },
    mounted() {
        this.fetchCount()

        const coopfluenced = this.$route.query.coopfluenced
        if (coopfluenced === '1') {
            this.openDialog()
            this.$router.replace({ query: {} })
        }
    }
}
</script>

<style scoped>
.changa-text {
    font-family: 'Changa One', sans-serif;
}

.font-bangers {
    font-family: 'Bangers', system-ui;
    font-weight: 300;
    font-style: normal;
    font-size: clamp(1.25rem, 2vw + 0.5rem, 2rem);
    /* scales with screen width */
}

.bg-coopbg {
    background-color: #161925;
}

.v-img {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bg-dark {
    background-color: #161925;
}

.v-card {
    border: 1px solid #333;
}

.v-btn {
    font-weight: bold;
    letter-spacing: 0.5px;
}

@font-face {
    font-family: 'PokemonGb';
    src: url('../assets/fonts/PokemonGb-RAeo.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;

    /* scales with screen width */
}

.pokemon-font {
    font-family: 'PokemonGb', sans-serif;
    font-size: clamp(1.5rem, 2vw + 0.5rem, 1.75rem);
}

@media (max-width: 600px) {
    .v-img {
        max-width: 95%;
    }
}
</style>