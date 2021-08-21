import client from "./client";

class AuthService {
  async signIn(email, password) {
    return client
      .post("user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.authorization) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getUserInfo(email) {
    return client.get(`user/info/${email}`);
  }

  logout() {
    localStorage.removeItem("user");
  }

  signUp(values) {
    return client.post("user/register", {
      email: values.email,
      password: values.password,
      userDetails: {
        name: values.firstName,
        surname: values.lastName,
        phone: values.phone,
        address: {
          province: values.province,
          city: values.city,
          street: values.street,
          house_no: values.house_no,
          postal: values.postal,
        },
      },
    });
  }
}

export default new AuthService();
