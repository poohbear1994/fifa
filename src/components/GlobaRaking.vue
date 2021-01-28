<!--
 * @Author: your name
 * @Date: 2020-12-01 20:53:38
 * @LastEditTime: 2020-12-26 13:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \football\src\components\GlobaRaking.vue
-->
<template>
  <div class="rounded-lg overflow-auto">
    <div class="position-sticky fixed-top">
        <nav class="navbar navbar-light bg-danger text-white rounded-lg">
            <span class="navbar-brand mb-0 h1 text-white">{{table.title}}</span>
        </nav>
    </div>
    <table v-if="table" class="table table-dark rounded-lg w-100" >
        <thead>
            <tr>
                <th scope="col" v-for="th in table.header" :key="th">{{th}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(team, index) in table.teams" :key="index">
                <th scope="row">{{index+1}}</th>
                <td>
                  <router-link :to="`/teamDetail/${team.teamid}`" class="text-white">
                    {{team.name}}
                  </router-link>
                  </td>
                <td>{{team.victory}}</td>
                <td>{{team.dogfall}}</td>
                <td>{{team.failure}}</td>
                <td>{{team.score}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { GlobalScore } from './../GlobalTypes'
export default defineComponent({
  name: 'GlobaRaking',
  components: {
  },
  props: {
    table: {
      type: Object as PropType<GlobalScore>,
      required: true
    }
  }
})
</script>
