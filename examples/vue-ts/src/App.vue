<script lang="ts">
import { message } from 'ant-design-vue';
import axios from 'axios';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  methods: {
    getData1() {
      axios.get('/mock/demo1/get').then((res) => {
        message.success(JSON.stringify(res.data));
      }).catch((err) => {
        console.log(err);
        message.error(err.message || '请求失败');
      });
    },
    getData2() {
      axios.get('/mock/demo2/get').then((res) => {
        message.success(JSON.stringify(res.data));
      }).catch((err) => {
        console.log(err);
        message.error(err.message || '请求失败');
      });
    },
    getData2_404() {
      axios.get('/mock/demo2/404').then((res) => {
        message.success(JSON.stringify(res.data));
      }).catch((err) => {
        console.log(err);
        message.error(err.message || '请求失败');
      });
    },
    getData2_500() {
      axios.get('/mock/demo2/500').then((res) => {
        message.success(JSON.stringify(res.data));
      }).catch((err) => {
        console.log(err);
        message.error(err.message || '请求失败');
      });
    },
  },
});
</script>

<template>
  <div id="app">
    <a-card title="demo1">
      <a-space>
        <a-button type="primary" @click="getData1">
          Demo1 200
        </a-button>
      </a-space>
    </a-card>
    <a-card title="demo2">
      <a-space>
        <a-button type="primary" @click="getData2">
          Demo2 200
        </a-button>
        <a-button type="primary" @click="getData2_404">
          Demo2 404
        </a-button>
        <a-button type="primary" @click="getData2_500">
          Demo2 500
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<style>

</style>
