<template>
    <div>
        <h3>View RX js</h3>
        <ul>
            <li><router-link to="/rxjs/news">Rx News</router-link></li>
            <li><router-link to="/rxjs/system">System Login</router-link></li>
            <li><router-link to="/rxjs/starwars">Star Wars</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script src="./ViewRx.ts" lang="ts"></script>
