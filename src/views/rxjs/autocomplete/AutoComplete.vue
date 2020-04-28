<template>
    <div id="autocomplete">
        <p><input type="input" id="search" placeholder="검색어 넣어" ref="search_inp"></p>
        
        <table v-if="!isLoading">
            <thead>
                <th scope="col">아이디</th>
                <th scope="col">아바타</th>
                <th scope="col">사용자명</th>
                <th scope="col">홈페이지 주소</th>
            </thead>
            <tbody>
                <tr v-for="item in results" :key="item.id">
                    <td>{{item.id}}</td>
                    <td><img :src="item.avatar_url" /></td>
                    <td>{{item.login}}</td>
                    <td><a :href="item.html_url" target="_blank">{{item.html_url}}</a></td>
                </tr>
            </tbody>
        </table>
        <div v-else class="sbl-meter"></div>
        <p>총 개수: {{totalCount}}</p>
    </div>
</template>
<script lang="ts" src="./AutoComplete.ts"></script>
<style scoped>
table{
    border-collapse: collapse;
}
table tr{
    border-bottom: 1px solid #aaa;
}
table tr:nth-child(odd) {
    background-color: #eee;
}
img{
    width: 60px;height: 60px;
}
  
.sbl-meter {
  height: 48px;
  width: 48px;
  color: #5a5a5a;
  border-radius: 50%;
  border: 5px solid;
  position: relative;
  display: inline-block; }
  .sbl-meter::after {
    content: '';
    height: 25%;
    width: 0;
    border-radius: 5px;
    border: 3px solid;
    display: block;
    color: inherit;
    position: absolute;
    left: 22px;
    top: 5px;
    transform-origin: bottom;
    animation: rotate 1s linear infinite; }

@keyframes rotate {
  0% {
    transform: rotate(0); }
  100% {
    transform: rotate(360deg); } }
</style>