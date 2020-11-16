<template>
  <div class="container" v-if="showTable_permission && permissions.length">
       <h3>Permission Types</h3>
       <br/>
  <table class="table striped" v-if="permissions.length">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Employee Name</th>
      <th scope="col">Employee Last Name</th>
      <th scope="col">Permission Date</th>
      <th scope="col">Reason</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="per of permissions" v-bind:key="per.id">
      <th scope="row">{{per.id}}</th>
      <td>{{per.employeeName}}</td>
      <td>{{per.employeeLastName}}</td>
      <td>{{per.permissionDate | moment}}</td>
      <td>{{per.permissionType.description}}</td>
      <td><button class="btn btn-outline-info mr-2" @click="edit(per)">Edit</button><button class="btn btn-outline-danger sm" @click="deleteData(per)">Delete</button></td>
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
import moment from 'moment';

export default {
    name: 'PermissionList',
    props: ['permissions', 'showTable_permission'],
    data: function(){
      return{
        perObj: {}
      }
    },
    filters: {
      moment: function(date){
        return moment(date).format('YYYY-MM-DD');
      }
    },
    methods: {
        edit(type){
          EventPass.$emit('edit-list-permission', type);
        },
      deleteData(type){
        EventPass.deletePermission(type);
        EventPass.$emit('action-delete-permission', type);
      }
    }
}
</script>