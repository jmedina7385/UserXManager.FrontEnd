import Vue from 'vue';
const permissionService = new Vue({
    methods: {
        savePermissionType(type){
          let returnData = {};

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Access-Control-Allow-Origin', '*')
          let requestOptions = {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(type),
              redirect: 'follow'
          }
        fetch('https://localhost:44357/api/permissiontypes/', requestOptions).then(data => {
            returnData = data;
        }).catch(err => returnData = err);

        return returnData;
        },
        deletePermissionType(type){
            let returnData = {};
  
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*')
            let requestOptions = {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(type),
                redirect: 'follow'
            }
          fetch('https://localhost:44357/api/permissiontypes/', requestOptions).then(data => {
              returnData = data;
          }).catch(err => returnData = err);
  
          return returnData;
          },
       async getAllPermissionType(){
            let res = await fetch('https://localhost:44357/api/permissiontypes/');
            let data = await res.json();         
            return data;
        },
        savePermission(type){
            let returnData = {};
  
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*')
            let requestOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(type),
                redirect: 'follow'
            }
          fetch('https://localhost:44357/api/permissions/', requestOptions).then(data => {
              returnData = data;
          }).catch(err => returnData = err);
  
          return returnData;
          },
          deletePermission(type){
              let returnData = {};
    
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('Access-Control-Allow-Origin', '*')
              let requestOptions = {
                  method: 'DELETE',
                  headers: headers,
                  body: JSON.stringify(type),
                  redirect: 'follow'
              }
            fetch('https://localhost:44357/api/permissions/', requestOptions).then(data => {
                returnData = data;
            }).catch(err => returnData = err);
    
            return returnData;
            },
         async getAllPermissions(){
              let res = await fetch('https://localhost:44357/api/permissions/');
              let data = await res.json();         
              return data;
          }
    }
});

export default permissionService;