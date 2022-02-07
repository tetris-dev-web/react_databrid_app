import { decorate, observable, computed } from "mobx";
import { toast } from "react-toastify";

export interface IUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  enabled: boolean;
}

export class UserStore {
  public users: IUser[] = [
    { id: 1, username: "dilara516", firstname: "Dilara", lastname: "Sfuanova", enabled: true },
    { id: 2, username: "daniel1014", firstname: "Daniel", lastname: "Gilbert", enabled: true },
    { id: 3, username: "daniel1014", firstname: "Daniel", lastname: "Gilbert", enabled: true }
  ];

  public addUser = (user: IUser) => {
    this.users.push(user);
    toast.success("New User added", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  public updateUser = (updatedUser: IUser) => {
    const updatedUsers = this.users.map(user => {
      if (user.id === updatedUser.id) {
        return { ...updatedUser };
      }
      return user;
    });
    this.users = updatedUsers;
  };

  public getUser = (id: number) => {
    const user = this.users.filter(user => user.id === id);
    console.log("user", user);
    return user;
  }

  public deleteUser = (id: number) => {
    console.log("users", this.users);
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
