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
        path: "/student",
        name: "Student",
        component: () => import("../views/Student/table/Student.vue"),
      },
      {
        path: "/edit",
        name: "edit",
        component: () => import("../views/Student/edit/StudentEdit.vue"),
      },
      {
        path: "/edit/:id",
        name: "edit",
        props: true,
        component: () => import("../views/Student/edit/StudentEdit.vue"),
      },
      {
        path: "/UserList",
        name: "UserList",
        component: () => import("../views/User/UserList/UserList.vue"),
      },
      {
        path: "/useredit",
        name: "useredit",
        component: () => import("../views/User/UserEdit/UserEdit"),
      },
      {
        path: "/useredit/:id",
        name:"usereditId",
        props: true,
        component: () => import("../views/User/UserEdit/UserEdit"),
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
        path: "/scoreEdit/:id",
        props: true,
        name: "ScoreEdit",
        component: () => import("../views/Score/edit/ScoreEdit.vue"),
      },
      {
        path: "/roleedit/:id",
        props: true,
        name: "RoleEdit",
        component: () => import("../views/Role/RoleEdit/RoleEdit.vue"),
      },
      {
        path: "/roleedit",
        name: "RoleEdit",
        component: () => import("../views/Role/RoleEdit/RoleEdit.vue"),
      },
      {
        path: "/rolelist",
        name: "RoleList",
        component: () => import("../views/Role/RoleList/RoleList"),
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
    component: () => import("../views/Login/Login.vue"),
    name: "Login",
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
