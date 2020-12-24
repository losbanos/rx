<template>
    <div id="slideWrapper" class="view" ref="view">
        <ul id="slide" ref="container" class="container">
            <li v-for="item in items" :key="item.id" class="panel" :style="`background-color:#${Math.random().toString(16).substr(-6)};`">{{item.text}}</li>
        </ul>
    </div>
</template>
<script lang="ts" src="./Slide.ts"></script>
<style>
.view{
    overflow: hidden;
}
.view .container {
    white-space: nowrap;
    padding: 0;
    list-style: none;
    font-size: 0;
    background: #eee;
}
.view .panel {
    width: 100%;
    min-height: 200px;
    max-height: 200px;
    display: inline-block;
}