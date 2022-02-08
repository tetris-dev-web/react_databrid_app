// import faker from "faker";
// import jwt from "jsonwebtoken";
// utils
import mock from "../utils/mock";
import fakeRequest from "../utils/fakeRequest";

// ----------------------------------------------------------------------

const users = [
  {
    id: 1644268582478,
    username: "dilara516",
    firstname: "Dilara",
    lastname: "Sfuanova",
    enabled: true,
    lastlogin: Date.now()
  },
  {
    id: 1644268582432,
    username: "daniel1014",
    firstname: "Daniel",
    lastname: "Gilbert",
    enabled: true,
    lastlogin: Date.now()
  }
];

// ----------------------------------------------------------------------

// get user list
mock.onGet('/api/getUsers').reply(200, { users });

// add user
mock.onPost('/api/addUser').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const user = config.data;
    const exists = users.find((_user) => _user.username === user.username);

    if (exists) {
      return [400, { message: 'User already exists' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/updateUser').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const user = config.data;

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/deleteUser').reply(async (config) => {
  try {
    await fakeRequest(1000);

    return [200, {  }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
