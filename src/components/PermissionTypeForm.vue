<template>
  <form v-if="show">
  <div class="form-group">
    <label for="description">Description</label>
    <input type="text" class="form-control" id="description" aria-describedby="descriptionHelp" v-model="type.description">
    <small id="descriptionHelp" class="form-text text-muted" v-bind:style="{color: 'red !important'}" v-if="errorDesc.show">We'll never share your email with anyone else.</small>
    <input v-model="type.id" type="hidden"/>
  </div>
  <button type="button" class="btn btn-primary" @click="sendData">Submit</button>
</form>
<form v-else>
  <button class="btn btn-primary" @click="$emit('show-form')">New Permission Type</button>
</form>
</template>
<script>
import EventPass from '../services/permissionService';

export default {
  name: 'PermissionTypeForm',
  data: function() {
          return {
            type: {
            id: 0, 
            description: ''
            },
            errorDesc: {
              desc: '',
              show: false
            }
          }
  },
  props: ['show'],
  methods: {
      sendData: function(event) {
          let eddthis = this;
          event.preventDefault();
          let permissionType = {
              id: this.type.id,
              description: this.type.description
          }
          let result = EventPass.savePermissionType(permissionType);
          if(result.id) {eddthis.type = result; eddthis.errorDesc.show = false;}
          else
           eddthis.errorDesc = result;
           EventPass.$emit('action-save', result);
      }
  },
  mounted: function(){
    let eddthis = this;

    EventPass.$on('edit-list', value => {
      eddthis.type = value;
      eddthis.$emit('show-form');
    });
  }
}
</script>