import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./Views/HomePage.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,  // This is your inventory page
    },

    // // Optionally, you can add a route for a fallback page or a 404
    // {
    //     path: "/:pathMatch(.*)*",
    //     name: "not-found",
    //     component: () => import("@/views/NotFound.vue"),
    // },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
