import Vue from "vue";
import VueRouter from "vue-router";
import storage from "sweet-storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Main/Main.vue"),
    children: [
      {
        path: "/",
        name: "Student",
        component: () => import("../views/Student/table/Student.vue"),
      },
      {
        path: "/edit",
        name: "StudentEdit",
        props: true,
        component: () => import("../views/Student/edit/StudentEdit.vue"),
      },
      {
        path: "/edit/:id",
        name: "StudentEdit",
        props: true,
        component: () => import("../views/Student/edit/StudentEdit.vue"),
      },
      {
        path: "/score",
        name: "Score",
        component: () => import("../views/Score/table/Score.vue"),
      },
      {
        path: "/scoreEdit",
        name: "ScoreEdit",
        component: () => import("../views/Score/edit/ScoreEdit.vue"),
      },
      {
        path: "/details/:id",
        name: "details",
        props: true,
        component: () => import("../views/details/details.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
    meta: { isPublic: true },
  },
];
const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !storage.get("token")) {
    return next("/login");
  }
  next();
});
export default router;
