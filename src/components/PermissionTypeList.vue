<template>
  <div class="container" v-if="showTable">
       <h3>Permission Types</h3>
       <br/>
  <table class="table striped" v-if="permissionTypes.length">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="perType of permissionTypes" v-bind:key="perType.id">
      <th scope="row">{{perType.id}}</th>
      <td>{{perType.description}}</td>
      <td><button class="btn btn-outline-info mr-2" @click="edit(perType)">Edit</button><button class="btn btn-outline-danger sm" @click="deleteData(perType)">Delete</button></td>
    </tr>
  </tbody>
</table>
<div v-else>
  Loadding Items....
</div>
</div>
</template>
<script>
import EventPass from '../services/permissionService';

export default {
    name: 'PermissionTypeList',
    props: ['permissionTypes', 'showTable'],
    data: function(){
      return{
        perTypeObj: {}
      }
    },
    methods: {
        edit(type){
          let pType = {
            id: type.id,
            description: type.description
          }
          EventPass.$emit('edit-list', pType);
        },
      deleteData(type){
        let pType = {
          id: type.id,
          description: type.description
        }
        EventPass.deletePermissionType(pType);
        EventPass.$emit('action-delete', pType);
      }
    }
}
</script>