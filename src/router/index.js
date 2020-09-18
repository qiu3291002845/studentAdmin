import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Student",
    component: () => import("../views/Student/table/Student.vue"),
  },
  {
    path: "/edit",
    name: "StudentEdit",
    component: () => import("../views/Student/edit/StudentEdit.vue"),
  },
  {
    path: "/score",
    name: "Score",
    component: () => import("../views/Score/table/ScoreEdit.vue"),
  },
  {
    path: "/scoreEdit",
    name: "ScoreEdit",
    component: () => import("../views/Score/edit/ScoreEdit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
