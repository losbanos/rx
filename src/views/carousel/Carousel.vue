<template>
    <div id="carousel" class="view" ref="carousel">
        <ul id="container" class="container" ref="container">
            <li v-for="item in items" :key="item.id" class="panel">{{item.text}}</li>
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
}
.view .panel {
    width: 100%;
    max-height: 200px;
    display: inline-block;
}
</style>