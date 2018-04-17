import Vue from "vue";
import Router from "vue-router";

import Home from "../views/Home";
import Lists from "../views/Lists";
import Books from "../views/Books";
import BookDetail from "../views/BookDetail";

Vue.use(Router);

/**
  * Router configs to load the component based on the URL 
  */
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/lists",
      component: Lists
    },
    {
      path: "/lists/books",
      component: Books
    },
    {
      path: "/lists/books/detail",
      component: BookDetail
    }
  ]
});
