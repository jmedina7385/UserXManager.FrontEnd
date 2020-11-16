<template>
  <div class="container">
      <PermissionTypeForm 
         @saveDescription="saveDescriptionType" 
         v-on:show-form="showForm" 
         v-on:hide-form="hideForm"
         :show="show"
         :showTable="showTa"/>
      <br/>
      <PermissionTypeList :permissionTypes="permissionTypeList" :showTable="showTa" v-on:action-delete="hideForm"/>
  </div>
</template>

<script>
import PermissionTypeForm from './PermissionTypeForm.vue';
import PermissionTypeList from './PermissionTypeList.vue';
import EventPass from '../services/permissionService';

export default {
  name: 'PermissionType',
  data:  function(){
     return {
       permissionTypeList: [],
       show: false,
       showTa: true,
     }
  },
  methods: {
    loadList() {
      let self = this;
      let res = EventPass.getAllPermissionType();
      res.then(data => self.permissionTypeList = data);
    },
    saveDescriptionType(description) {
      console.log(description);
    },
    showForm(){
      this.show = true;
      this.showTa = false;
    },
    hideForm(){
      this.show = false;
      this.showTa = true;
      this.loadList();
    }
  },
  components: {
    PermissionTypeForm,
    PermissionTypeList
  },
  mounted: function(){
    let self = this;
    self.loadList();
    EventPass.$on('action-delete', value => {
      alert(`${value.description} has been Deleted`);
      self.hideForm();
    });
    EventPass.$on('action-save', value => {
        self.hideForm();
        self.permissionTypeList.push({id: value.id, description: value.description});
        self.show = false;
        self.showTa = true;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
