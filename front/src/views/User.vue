<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="u in users">

      <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{u.name}}</h3>
              <div>{{u.age}} </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange" @click="postRea">Post Go</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/user')
      .then((res) => {
        console.log(res)
        this.users = res.data.users
      })
      .catch((e) => {
        console.log(e.message)
      })
    console.log('sssss')
  },
  methods: {
    postRea () {
      axios.post('http://localhost:3000/api/user', { name: 'test', age: 39 })
        .then(r => {
          console.log(r)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
