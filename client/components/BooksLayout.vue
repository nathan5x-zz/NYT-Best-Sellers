<template>
<div>
	<div class="breadcrumb-container">
		<ul class="breadcrumb">
			<li> <i class="fa fa-home"> </i> <div class="item"> <span> Home </span> <a href="#"> Home Page </a> </div> </li>
			<li> <i class="fa fa-th-list"> </i> <div class="item"> <span> Lists </span> <a href="/lists"> <i class="fa fa-book"> </i> Collections </a> </div> </li>
			<li> <i class="fa fa-book"> </i> <div class="item"> <span> Collections </span> <a href="#"> {{selectedCollection}} </a> </div> </li>
		</ul>
	</div>
<ul class="thumbnail-container">	
	<li class="books-tile" v-for="bookObj in bookData" v-bind:key="bookObj.primary_isbn10">
		<div class="shelf"> 
			<div class="rank"> </div>
		<img class="image-slot" :src="bookObj.book_image"/>
		<div class="detail-container"> 
			<p class="publisher"> {{bookObj.publisher}}</p>
			<h3 class="book-name">{{bookObj.title}} </h3>
			<p class="author">{{bookObj.contributor}} </p>
		</div>
		</div>
	<div class="desc-container">
		<p class="desc"> {{bookObj.description | validateData}}</p>
		<div class="more"> 
			<a href="#" v-on:click="loadSelectedBook(bookObj)">  See More Details <i class="fa fa-arrow-right"> </i></a>
		</div>
	</div>
		<section class="footer">
			<div class="options">
				<a :href="buyOption.url" target="_blank" v-for="buyOption in bookObj.buy_links" v-bind:key="buyOption.url"> <i class="fa fa-external-link"> </i> {{buyOption.name}}</a>
			</div>
		</section>
	</li> 
</ul>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      bookData: {}
    };
  },
  created: function() {
    this.bookData = this.$store.state.selectedList;
  },
  computed: {
    /**
     * Vue Computed function to retreive a List name. 
     */
    selectedCollection() {
      return this.$store.getters.collectionName;
    }
  },
  methods: {
    /**
     * Load book data from the store.
     */
    loadSelectedBook(book) {
      this.$store.dispatch({
        type: "setSelectedBook",
        book: book
      });

      this.$router.push({ path: "/lists/books/detail" });
    }
  }
};
</script>
