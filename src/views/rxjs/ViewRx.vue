<template>
    <div>
        <h3>View RX js</h3>
        <ul>
            <li><router-link to="news">Rx News</router-link></li>
            <li><router-link to="system">System Login</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script src="./ViewRx.ts" lang="ts"></script>
