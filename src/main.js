import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import app from './App.vue'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue)


window.onload = () => {
  new Vue({
    el: "#assspp",
    computed: {
      editableFields() {
        return this.fields.filter((field) => field.editable);
      }
    },
    data() {
      return {
        userRow: null,
        fields: [
          { key: "id" },
          { key: "first_name", editable: true },
          { key: "last_name", editable: true },
          { key: "age", editable: true, type: "number", isNumber: true },
          { key: "actions" }
        ],
        items: [
          { id: 1, first_name: "Mikkel", last_name: "Hansen", age: 56 },
          { id: 2, first_name: "Mads", last_name: "Mikkelsen", age: 39 },
          { id: 3, first_name: "Anders", last_name: "Matthesen", age: 42 }
        ]
      };
    },
    methods: {
      editUser(user) {
        let doEdit = true;
        if (
          this.userRow &&
          !confirm(
            "You have unsaved changes, are you sure you want to continue?"
          )
        ) {
          doEdit = false;
        }

        if (doEdit) {
          this.userRow = { user };
        }
      },
      saveEdit() {
        let user = this.items.find((u) => u.id === this.userRow.id);
        Object.assign(user, this.userRow);

        this.resetEdit();
      },
      resetEdit() {
        this.userRow = null;
      }
    }
  });
};



new Vue({
  el: '#app',
  computed: {
      editableFields() {
        return this.fields.filter((field) => field.editable);
      }
    },
  data() {
    return {
      url:'http://127.0.0.1:8000/api/team/',
      next:null,
      previous:null,

      info: null,
       items: null,
       loading:null,
       userRow: null,
       id_tmp:null,
       name_tmp:null,
       tag_tmp:null,
       rating_tmp:null,
       wins_tmp:null,
       losses_tmp:null,
       last_match_time_tmp:null,
       logo_tmp:null,
       errors: [],
      fields: [
      { key: "id" },
        { key: "name", sortable: true },
        { key: "tag", sortable: true },
        { key: "rating", sortable: true },
        { key: "wins", sortable: true },
        { key: "losses", sortable: true },
        { key: "last_match_time", sortable: true },
        { key: "logo", },
        {key:'actions'}

      ]
    };
  },
  mounted() {
    axios
      .get(this.url)
      .then(response => (this.items = response.data['results'],this.next=response.data['next'],this.previous=response.data['previous'] ,this.loading = false));
  },
  //
  methods:{
  go_forward:function(event){
    if(this.next ==null){
    alert("Вы дошли до конца списка.")
    }
    else{
        axios
      .get(this.next)
      .then(response => (this.items = response.data['results'],this.next=response.data['next'],this.previous=response.data['previous'] ));
    }
  },

  go_back:function(event){
    if(this.previous==null){
        alert("Вы дошли до начала списка.")
    }
    else{
        axios
      .get(this.previous)
      .then(response => (this.items = response.data['results'],this.next=response.data['next'],this.previous=response.data['previous'] ));
    }

  },
  delete_element(item){
  console.log(item);
      for(var i =0;i<this.items.length;i++){
        if(item==this.items[i]['id']){

             axios.post('http://127.0.0.1:8000/api/delete/',{'body':JSON.stringify(this.items[i]['id'])}).then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
        }
      }
      document.location.reload();
      console.log(this.item)
  },

  save (item) {
      console.log(item);
      for(var i =0;i<this.items.length;i++){
        if(item==this.items[i]['id']){

             axios.post('http://127.0.0.1:8000/api/save/',{'body':JSON.stringify(this.items[i])}).then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
        }
      }
      document.location.reload();
      console.log(this.item)

    },
    change(id){
        for(var i = 0; i<this.items.length;i++){
            if (this.items[i].id != id) {
                return
                }
                }
    },
   showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      },
      checkForm: function (e) {


      this.errors = [];
       for(var i = 0; i<this.items.length;i++){
            if (this.items[i].id == this.id) {
                this.errors.push('Id занято.');
                break;
                }
                }
      if (!this.id_tmp) {
        this.errors.push('Требуется указать Id.');

      }
      if (!this.name_tmp) {
        this.errors.push('Требуется указать Name.');
      }
      if (!this.tag_tmp) {
        this.errors.push('Требуется указать Tag.');
      }
      if (!this.rating_tmp) {
        this.errors.push('Требуется указать Rating.');
      }
      if (!this.wins_tmp) {
        this.errors.push('Требуется указать Wins.');
      }
      if (!this.losses_tmp) {
        this.errors.push('Требуется указать Losses.');
      }
      if (!this.last_match_time_tmp) {
        this.errors.push('Требуется указать Last Match Time.');
      }
      if (!this.logo_tmp) {
        this.errors.push('Требуется указать Logo.');
      }
       if(this.errors.length>0){
            alert(this.errors)
       }
       else{


        this.items.push({
        "id":this.id_tmp,
        "name":this.name_tmp,
         "tag":this.tag_tmp,
        "rating":this.rating_tmp,
        "wins":this.wins_tmp,
         "losses":this.losses_tmp,
        "last_match_time":this.last_match_time_tmp,
        "team_logo":this.logo_tmp
        })
        save(this.id_tmp)
       }



      e.preventDefault();

    }






}
})