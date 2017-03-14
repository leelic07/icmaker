<template>
    <div class="col-xs-24 tab">
        <ul class="col-xs-8 tab-box clearfix">
            <li class="col-xs-12 active pull-left">
                <router-link class="col-xs-24 pull-left" to="/crimexamine/prison">转监狱审核</router-link>
            </li>
            <li class="col-xs-12 pull-left">
                <router-link class="col-xs-24 pull-left" to="/crimexamine/ward">转监区审核</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
		data(){
			return{

			}
		}
	}
</script>