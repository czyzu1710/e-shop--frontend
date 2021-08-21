export default function header() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authorization) {
    return {
      Authorization: "bearer " + user.authorization,
      "Content-Type": "application/json",
      "content-type": "multipart/form-data",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}
