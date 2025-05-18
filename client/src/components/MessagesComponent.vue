<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            name: '',
            message: '',
            showMessages: false,
        };
    },
    computed: {
        ...mapState('messages', ['messages']),
        messageItems() {
            return this.messages;
        }
    },
    methods: {
        ...mapActions('messages', ['fetchMessages']),
        toggleMessages() {
            this.showMessages = !this.showMessages;
            if (this.showMessages && this.messageItems.length === 0) {
                this.fetchMessages();
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleString();
        }
    },
    mounted() {
        this.fetchMessages();
    }
};
</script>

<template>
    <v-container>
        <v-btn color="#099FDC" @click="toggleMessages" size="x-large" min-width="311" class="mb-4 px-6 py-3 rounded-lg"
            elevation="2" style="font-weight: bold; letter-spacing: 0.5px;">
            {{ showMessages ? 'Hide Guestbook' : 'Show Guestbook' }}
        </v-btn>

        <v-expand-transition>
            <div v-if="showMessages" style="height: 400px;">
                <v-sheet rounded="lg" class="bg-grey-darken-4 text-white elevation-3" height="100%"
                    style="overflow-y: auto;">
                    <v-virtual-scroll :items="messageItems" item-height="80" height="100%" class="pa-4">
                        <template #default="{ item }">
                            <v-list-item class="px-0 py-4">
                                <v-col cols="12" class="text-center">
                                    <div class="d-flex flex-column align-center">
                                        <span class="text-body-1 font-weight-medium">
                                            {{ item.name || 'Anonymous' }}
                                        </span>
                                        <span class="white-space-pre-line text-body-2 mt-2">
                                            {{ item.message }}
                                        </span>
                                        <span class="text-caption text-grey-lighten-1 mt-2">
                                            {{ formatDate(item.createdAt) }}
                                        </span>
                                    </div>
                                </v-col>
                            </v-list-item>

                            <v-divider class="mx-4" />
                        </template>
                    </v-virtual-scroll>

                    <v-alert v-if="messageItems.length === 0" type="info" border="start" elevation="2" class="mx-4 my-4"
                        text>
                        No messages yet. Be the first to add a message!
                    </v-alert>
                </v-sheet>
            </div>
        </v-expand-transition>
    </v-container>
</template>
