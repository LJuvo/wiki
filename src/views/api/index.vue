<template>
  <div>
    <!-- <p>当前路径：{{$route.path}}</p>
    <p>当前参数：{{$route.params | json}}</p>
    <p>路由名称：{{$route.name}}</p>
    <p>路由查询参数：{{$route.query | json}}</p>
    <p>路由匹配项：{{$route.matched | json}}</p>-->
    <h1>API</h1>
  </div>
</template>

<script>
import { user } from "../../data/user";
export default {
  mounted() {
    console.log(this.$route.path);
    console.log(this.$route.params);
    console.log(this.$route.query);
    console.log(user);
  }
};
</script>

<style>
</style>
