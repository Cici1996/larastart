<template>
    <div class="row mt-5">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Users Table</h3>

                    <div class="card-tools">
                        <button class="btn btn-success" data-toggle="modal" data-target="#addNew">
                            Add New <i class="fas fa-user-plus fa-fw"></i>
                        </button>
                    </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Register At</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,indexNum) in users" :key="user.id">
                                <td>{{indexNum + 1}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type | upFirtsText}}</td>
                                <td>{{user.created_at | myDate}}</td>
                                <td>
                                    <a href="#">
                                        <i class="fas fa-edit textblue"></i>
                                    </a>
                                    /
                                    <a href="javascript:void(0)" @click="deleteUser(user.id)">
                                        <i class="fas fa-trash textred"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>

        <form class="form-horizontal" @submit.prevent="createUser">
            <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addNewLabel">Add New</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 control-label">Name</label>
                                <div class="col-sm-10">
                                    <input v-model="form.name" id="name" type="text" name="name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                    <has-error :form="form" field="name"></has-error>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-10">
                                    <input v-model="form.email" id="email" type="email" name="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                    <has-error :form="form" field="email"></has-error>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 control-label">Bio</label>
                                <div class="col-sm-10">
                                    <textarea v-model="form.bio" id="bio" name="bio" class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                    <has-error :form="form" field="bio"></has-error>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 control-label">User Role</label>
                                <div class="col-sm-10">
                                    <select name="type" id="type" v-model="form.type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                        <option value="">Select User Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">Standard User</option>
                                        <option value="author">Author</option>
                                    </select>
                                    <has-error :form="form" field="type"></has-error>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 control-label">Password</label>
                                <div class="col-sm-10">
                                    <input v-model="form.password" id="password" type="password" name="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                    <has-error :form="form" field="password"></has-error>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" :disabled="form.busy" class="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div> 
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                users : {},
                form : new Form({
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : ''
                })
            }
        },
        methods:{
            loadUser(){
                axios.get("api/user").then(({data}) => (this.users = data.data))
            },
            createUser(){
                this.$Progress.start()
                this.form.post('api/user').then(({ data }) => { 
                    console.log(data); 
                    
                    this.$Progress.finish() 
                    
                    $("#addNew").modal('hide')
                    Toast.fire({
                        type: 'success',
                        title: 'Signed in successfully'
                    }) 

                    this.$emit('afterCreated')
                })
                .catch(() => {

                })
            },
            deleteUser(id){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if(result.value){
                        this.form.delete('api/user/'+id)
                            .then(() => {
                                Swal.fire({
                                    title: 'Success',
                                    text: "Delete Data Success",
                                    type: 'success'
                                })
                                this.$emit('afterCreated')
                            })
                            .catch(() => {
                                Swal.fire(
                                    'Failed!',
                                    'There Was Something Wrong',
                                    'warning'
                                )
                            })
                    }
                })
            }
        },
        mounted() {
            this.loadUser()
            this.$on('afterCreated',function(){
                this.loadUser()
            })
        }
    }
</script>
