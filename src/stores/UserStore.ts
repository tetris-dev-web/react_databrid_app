import { decorate, observable } from "mobx";
import { toast } from "react-toastify";
import axios from '../utils/axios';

export interface IUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
  lastlogin: Date;
}

export class UserStore {
  // public users: IUser[] = [
  //   { id: 1, username: "dilara516", firstname: "Dilara", lastname: "Sfuanova", enabled: true },
  //   { id: 2, username: "daniel1014", firstname: "Daniel", lastname: "Gilbert", enabled: true },
  //   { id: 3, username: "daniel1014", firstname: "Daniel", lastname: "Gilbert", enabled: true }
  // ];

  public users: IUser[] = [];

  public getUsers = async () => {
    const response = await axios.get('/api/getUsers');
    this.users = response.data.users;
  }
  
  public addUser = async (user: IUser) => {
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

  public updateUser = async (user: IUser) => {
    const exists = this.users.filter(item => item.id === user.id);
    if (exists.length > 1 || exists.length === 0) {
      toast.error("User error", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return;
    } 

    await axios.post('/api/updateUser', user);

    const updatedUsers = this.users.map(item => {
      if (item.id === user.id) {
        return { ...user };
      }
      return item;
    });
    this.users = updatedUsers;
    toast.success("User updated", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    
  };

  public getUser = (id: number) => {
    const user = this.users.filter(item => item.id === id);
    return user;
    // console.log("id", typeof(id));
    // console.log("users", this.users);
    // const exists = this.users.filter(item => item.id === id);
    // console.log(exists.length);
  }

  public deleteUser = (id: number) => {
    const updatedUsers = this.users.filter(user => user.id !== id);
    
    this.users = updatedUsers;
    toast.info("User deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };
}

decorate(UserStore, {
  users: observable
});
