<template>
  <div class="container">
      <PermissionForm  
         v-on:show-form-permission="showForm" 
         v-on:hide-form-permission="hideForm"
         :show_permission="showPermission"
         :showTable-permission="showTaPermission"
         :permissionTypes="permissionTypes"/>
      <br/>
      <PermissionList :permissions="permissionList" :showTable_permission="showTaPermission" v-on:action-delete="hideForm"/>
  </div>
</template>

<script>
import PermissionForm from './PermissionForm.vue';
import PermissionList from './PermissionList.vue';
import EventPass from '../services/permissionService';

export default {
  name: 'Permission',
  data:  function(){
     return {
       permissionList: [],
       permissionTypes: [],
       showPermission: false,
       showTaPermission: true,
     }
  },
  methods: {
    loadList() {
      let self = this;
      let res = EventPass.getAllPermissions();
      res.then(data => self.permissionList = data);
      let res2 = EventPass.getAllPermissionType();
      res2.then(data => self.permissionTypes = data);
    },
    showForm(){
      this.showPermission = true;
      this.showTaPermission = false;
    },
    hideForm(){
      this.showPermission = false;
      this.showTaPermission = true;
      this.loadList();
    }
  },
  components: {
    PermissionForm,
    PermissionList
  },
  mounted: function(){
    let self = this;
    self.loadList();
    EventPass.$on('action-delete-permission', value => {
      alert(`${value.employeeName} has been Deleted`);
      self.hideForm();
    });
    EventPass.$on('action-save-permission', value => {
        self.hideForm();
        console.log(value);
        self.showPermission = false;
        self.showTaPermission = true;
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
