import { makeAutoObservable, observable } from "mobx";
import { toast } from "react-toastify";
import axios from '../utils/axios';
import { IUser } from '../interfaces/User';

export class UserStore {
  isLoading: boolean = false;
  users: IUser[];

  constructor () {
    makeAutoObservable(this)

    this.users = [];
  }

  getUsers = async () => {
    const response = await axios.get('/api/getUsers');
    this.users = [...response.data.users];
    return;
  }
  
  addUser = async (user: IUser) => {
    const exists = this.users.filter(item => item.username === user.username);
    if (exists.length > 0) {
      toast.error("User already exists", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    } 

    await axios.post('/api/addUser', user);

    this.users.push(user);
    toast.success("New User added", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  updateUser = async (user: IUser) => {
    const exists = this.users.filter(item => item.id === user.id);
    if (exists.length > 1 || exists.length === 0) {
      toast.error("User error", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    } 

    this.isLoading = true;
    await axios.post('/api/updateUser', user);
    this.isLoading = false;

    const updatedUsers = this.users.map(item => {
      if (item.id === user.id) {
        return { ...user };
      }
      return item;
    });
    this.users = updatedUsers;
    console.log(this.users);
    toast.success("User updated", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    
  };

  getUser = (id: number) => {
    const user = this.users.filter(item => item.id === id);
    return user;
    // console.log("id", typeof(id));
    // console.log("users", this.users);
    // const exists = this.users.filter(item => item.id === id);
    // console.log(exists.length);
  }

  deleteUser = async (id: number) => {
    const updatedUsers = this.users.filter(user => user.id !== id);
    
    this.users = updatedUsers;
    toast.info("User deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    return;
  };
}