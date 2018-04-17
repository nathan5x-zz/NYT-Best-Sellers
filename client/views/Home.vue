<template>
  <div class="page home">
    <div class="stack">
            <img v-for="(listImage, index) in listData" v-bind:key="listImage.list_id"
              :src="listImage.list_image" 
              v-bind:style="{ 'z-index': index * 10, 'right': index * 10 + 'px', 'top': index * 10 + 'px' }"/>
        </div>    
    <a href="/lists" class="browse-button"> Browse </a>
  </div>
</template>

<script>
import DetailLayout from 'components/DetailLayout'

export default {
  computed: {
		listData() {			
			return this.$store.getters.listData;
		}
	}
}
</script>
