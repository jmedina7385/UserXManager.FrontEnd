<template>
  <form v-if="show_permission">
  <input v-model="type.id" type="hidden"/>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="employeeName">Employee Name</label>
      <input type="text" class="form-control" id="employeeName" v-model="type.employeeName" required>
      <div v-if="errorDesc.show" v-bind:style="{color: 'red !important'}">
        {{errorDesc.desc}}
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="employeeLastName">Employee Last Name</label>
      <input type="text" class="form-control is-valid" id="employeeLastName" v-model="type.employeeLastName" required>
      <div v-if="errorDesc.show" v-bind:style="{color: 'red !important'}">
        {{errorDesc.desc}}
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="permissionDate">Date</label>
      <input type="date" class="form-control" id="permissionDate" v-model="type.permissionDate" required>
      <div v-if="errorDesc.show" v-bind:style="{color: 'red !important'}">
        {{errorDesc.desc}}
      </div>
    </div>
    <div class="col-md-6 mb-3">
      <label for="permissionTypeId">Permission Types</label>
      <select class="custom-select" id="permissionTypeId" required v-model="type.permissionTypeId">
        <option disabled value="0">Choose...</option>
        <option v-for="perType of permissionTypes" :value="perType.id" :key="perType.id">{{perType.description}}</option>
      </select>
      <div v-if="!type.permissionTypeId" v-bind:style="{color: 'red !important'}">
        Please Select a Permission Type
      </div>
    </div>
  </div>
  <button class="btn btn-primary" @click="sendData">Save</button>
</form>
<form v-else>
  <button class="btn btn-primary" @click="$emit('show-form-permission')">New Permission</button>
</form>
</template>
<script>
import EventPass from '../services/permissionService';
import moment from 'moment';

export default {
  name: 'PermissionForm',
  data: function() {
          return {
            type: {
            id: 0, 
            employeeName: '',
            employeeLastName: '',
            permissionTypeId: 0,
            permissionDate: new Date().toISOString().substring(0,10)
            },
            errorDesc: {
              desc: '',
              show: false
            },
            permissionType: {}
          }
  },
  props: ['show_permission', 'permissionTypes'],
  methods: {
      sendData: function(event) {
          let eddthis = this;
          event.preventDefault();
          let permission = {
              id: this.type.id,
              employeeName: this.type.employeeName,
              employeeLastName: this.type.employeeLastName,
              permissionTypeId: this.type.permissionTypeId,
              permissionDate: this.type.permissionDate
          }
          let result = EventPass.savePermission(permission);
          if(result.id) {eddthis.type = result; eddthis.errorDesc.show = false;}
          else
           eddthis.errorDesc = result;
           EventPass.$emit('action-save-permission', result);
           eddthis.$router.push("/");
      }
  },
  mounted: function(){
    let eddthis = this;

    EventPass.$on('edit-list-permission', value => {
      eddthis.type = value;
      eddthis.type.permissionDate = moment(value.permissionDate).format('YYYY-MM-DD');
      eddthis.$emit('show-form-permission');
    });
  }
}
</script>