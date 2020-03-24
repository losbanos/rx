<template>
  <div id="app" class="abc">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/poke">Poke</router-link> |
      <router-link to="/rxjs">RX JS</router-link>
    </div>
    <router-view/>
  </div>
</template>

