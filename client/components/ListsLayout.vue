<template>
<div> 
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li> <i class="fa fa-home"> </i> <div class="item"> <span> Home </span> <a href="#"> Home Page </a> </div> </li>
			<li> <i class="fa fa-th-list"> </i> <div class="item"> <span> Lists </span> <a href="/lists"> Collections </a> </div> </li>			
		</ul>
	</div>
	<ul class="thumbnail-container">	
		<li class="list-tile" v-for="listObj in listData" v-bind:key="listObj.list_id"
			v-on:click="loadSelectedBooks(listObj)">
			<section class="header">
				<img :src="listObj.list_image" class="image-slot"/>
				<div class="desc-container">
					<p class="updated"> {{listObj.updated}} </p>
					<p class="disp-name"> {{listObj.list_name}} </p>
					<p class="books-count"> <i class="fa fa-clone"> </i> Book ({{listObj.books.length}})</p>
				</div>
			</section>
			<section class="footer">
				<a class="link" href="#" v-on:click="loadSelectedBooks(listObj)"> SEE LIST</a>
				<i class="fa fa-arrow-right"> </i>
			</section>
		</li>
	</ul>
</div>
</template>

<script>
export default {
  computed: {
    listData() {
      return this.$store.getters.listData;
    }
  },
  methods: {
	/**
     * Load selected list's book data from the store
     */
    loadSelectedBooks(list) {
      this.$store.dispatch({
        type: "setSelectedList",
        list: list.books,
        listItem: list
      });

      this.$router.push({ path: "/lists/books" });
    }
  }
};
</script>