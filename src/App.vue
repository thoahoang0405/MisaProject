<template>

  <Header />
  <Menu />
  <Main />
  <Container />

</template>

<script>
import Header from '../src/components/layout/TheHeader.vue';
import Menu from '../src/components/layout/TheMenu.vue';
import Main from '../src/components/layout/TheMain.vue';
import Container from './components/layout/TheContainer.vue';


export default {
  name: 'App',
  components: {
    Header, Menu, Main, Container

  }
}
</script>

<style>

</style>
