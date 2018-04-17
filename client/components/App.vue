<template>
  <div id="app" class="app best-sellers-app">   
    <Header> </Header>    
    <transition name="app-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer> </Footer>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "components/Header";
import Footer from "components/Footer";
import Breadcrumb from "components/Breadcrumb";

/**
 * Vue custom filter to format field data
 */
Vue.filter('validateData', function (value, type) {
  if (!value || value === "") return "N/A"  
  if(type === 'date') {
      return new Date(value).toDateString();
  }
  return value.toString()
})

export default {
  components: {
    Breadcrumb, Header, Footer
  },
  created: function() {
    /**
     * Load data from external API once the initial load
     * is complete.
     */
    this.$store.dispatch({
      type: "getBookData"
    });
  }
};
</script>