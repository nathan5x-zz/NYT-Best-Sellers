<template>
<div>
	<div class="breadcrumb-container">		
		<ul class="breadcrumb">
			<li> <i class="fa fa-home"> </i> <div class="item"> <span> Home </span> <a href="#"> Home Page </a> </div> </li>
			<li> <i class="fa fa-th-list"> </i> <div class="item"> <span> Lists </span> <a href="/lists"> Collections </a> </div> </li>
			<li> <i class="fa fa-book"> </i> <div class="item"> <span> Collections </span> <a href="/lists/books"> {{selectedCollectionName}} </a> </div> </li>
			<li> <i class="fa fa-file"> </i> <div class="item"> <span> Book </span> <a href="#"> {{bookDetail.title}} </a> </div> </li> 
		</ul>
	</div>
  <div class="detail-layout">
		<div class="cover">
			<div class="promo">
				<div class="img-slot">
					<img class="avatar" :src="bookDetail.book_image" />
				</div>
				<div class="details-container">			
					<div class="rank"> {{bookDetail.rank}} </div>
					<h2 class="book-name">{{bookDetail.title | validateData}}</h2>
					<h3> {{bookDetail.contributor | validateData}}</h3>
					<p class="desc-text"> {{bookDetail.description | validateData}}</p>
				</div>
			</div>
		</div>
		
		<div class="desc">			
			<div class="meta-container"> 
				<ul class="data-list">
						<li class="meta"> 
							<span class="prop"> Publisher</span>
							<p class="data"> {{bookDetail.publisher | validateData}}</p>
						</li>
					
					<li class="meta"> 
							<span class="prop"> Author</span>
							<p class="data"> {{bookDetail.author | validateData}}</p>
						</li>
					
					<li class="meta"> 
							<span class="prop"> ISBN (10) </span>
							<p class="data"> {{bookDetail.primary_isbn10 | validateData}}</p>
						</li>
					
					<li class="meta"> 
							<span class="prop"> ISBN (13)</span>
							<p class="data"> {{bookDetail.primary_isbn13 | validateData}}</p>
						</li>
					
					<li class="meta"> 
							<span class="prop"> Created </span>							
							<p class="data"> {{bookDetail.created_date | validateData}}</p>
						</li>
					
					<li class="meta"> 
							<span class="prop"> Weeks on List</span>
							<p class="data"> {{bookDetail.weeks_on_list | validateData}}</p>
					</li>					
				</ul>				
			</div>
		</div>
		
		<div class="footer">
			<span> Buying options </span>
			<ul class="buy-options">
				<li v-for="buyOption in bookDetail.buy_links" v-bind:key="buyOption.url"> 
					<a :href="buyOption.url"> <i class="fa fa-shopping-cart"> </i> {{buyOption.name}} </a>
				</li>				
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      bookDetail: {}
    };
  },
  created: function() {
    this.bookDetail = this.$store.state.selectedBook;
  },
  computed: {
	  /**
     * Vue Computed function to retreive a collection name. 
     */
    selectedCollectionName() {
      return this.$store.getters.collectionName;
    }
  }
};
</script>
