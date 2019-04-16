<template>
 <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="u in users" v-bind:key="u._id">

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
          <v-btn flat color="orange" @click="putDialog(u)">수정</v-btn>
          <v-btn flat color="orange" @click="delUser(u._id)">삭제</v-btn>
        </v-card-actions>
      </v-card>

      </v-flex>
      <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="pink"
            @click="moUp"
          >
           <v-icon>add</v-icon>
      </v-btn>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="userName" label="Legal first name*" required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
             </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
      {{sbMsg}}
      <v-btn color="pink" flat @click="snackbar=false">
        close
      </v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      userAges: [],
      userName: '',
      userAge: 0,
      dialog: false,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 3; i < 40; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    moUp () {
      this.dialog = true
      this.name = ''
      this.age = ''
    },
    getUsers () {
      axios.get('/api/user')
        .then((res) => {
          // console.log(res)
          this.users = res.data.users
        })
        .catch((e) => {
          // console.log(e.message)
        })
    },
    postUser () {
      console.log(this.userAge, this.userName)
      this.dialog = false
      axios.post('/api/user', { name: this.userName, age: this.userAge })
        .then(r => {
          this.pop('사용자 등록 성공')
          this.getUsers()
          // console.log(r)
        })
        .catch(e => {
          // console.log(e)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      axios.put(`/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then(r => {
          this.pop('사용자 수정 성공')
          this.getUsers()
          // console.log(r)
        })
        .catch(e => {
          // console.log(e)
        })
    },
    delUser (id) {
      axios.delete(`/api/user/${id}`)
        .then(r => {
          this.pop('사용자 삭제 완료')
          this.getUsers()
          console.log(r)
        })
        .catch(e => {
          console.log(e)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
