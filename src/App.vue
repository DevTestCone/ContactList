<template>
<div id="app">
  <nav>
    <div class="nav-wrapper green darken-6">
      <div class="brand-logo">
        My Contacts List
      </div>
    </div>
  </nav>
  <div class="container">

    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: #EFFFCE;
  margin: 0;
}

#app {}
</style>
