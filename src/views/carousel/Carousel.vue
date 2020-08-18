<template>
    <div id="carousel" class="view" ref="carousel">
        <ul id="container" class="container" ref="container">
            <li v-for="item in items" :key="item.id" class="panel" :style="`background-color:#${Math.random().toString(16).substr(-6)};`">{{item.text}}</li>
        </ul>
    </div>
</template>
<script lang="ts" src="./Carousel.ts"></script>
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
</style>