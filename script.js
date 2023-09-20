const tbody = document.querySelector("tbody");
const btnEdit = document.getElementById("btnEdit");

const getUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    // console.log(res);
    return res.data;
  } catch (error) {
    return [];
  }
};

const setUsers = async () => {
  const users = await getUsers();
  // console.log(users);
  tbody.innerHTML = "";

  users.map((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="fw-bold">${index + 1}</td>
        <td class="fw-bold">${user.name}</td>
        <td>${user.email}</td>
        <td><a href="https://maps.google.com/?q=${user.address.geo.lat},${
      user.address.geo.lng
    }" target="_blank">${user.address.city} ${user.address.suite} ${
      user.address.street
    }</a> </td>
        <td>${user.phone}</td>
        <td><a target="_blank" href="https://www.${user.website}"> ${
      user.website
    } </a></td>
        <td>${user.company.name}</td>
        <td class="d-flex">
            <button class="btn btn-dark me-2" 
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalEdit"
              
            >
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger me-2" onclick="deleteUsers(${
              user.id
            })">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tbody.appendChild(row);
  });
};

setUsers();

const deleteUsers = async (id) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    console.log(res);
    setUsers();
  } catch (error) {
    console.log(error);
  }
};

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const website = document.getElementById("website");
const myModal = new bootstrap.Modal("#exampleModal");

const clearValue = () => {
  fullName.value = "";
  email.value = "";
  website.value = "";
  nameEdit.value = "";
  emailEditing.value = "";
  websiteEdit.value = "";
};

const postUser = async () => {
  try {
    const res = await axios.post("https://jsonplaceholder.typicode.com/users", {
      name: fullName.value,
      email: email.value + "@gmail.com",
      website: website.value,
    });
    alert("Muvaffaqiyatli qo`shildi!");
    setUsers();
    myModal.hide();
    clearValue();
  } catch (error) {
    console.log(error);
  }

  // myModal.hide();
};

const nameEdit = document.getElementById("nameEdit");
const emailEditing = document.getElementById("emailEditing");
const websiteEdit = document.getElementById("websiteEdit");
const myModalEdit = new bootstrap.Modal("#exampleModalEdit");

const putUser = async () => {
  try {
    const res = await axios.put(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        name: nameEdit.value,
        email: emailEditing.value + "gmail.com",
        website: websiteEdit,
      }
    );

    alert("Muvaffaqiyatli o`zgartirildi!");
    // console.log(res.data);
    // return res.data;
    setUsers();
    myModalEdit.hide();
    clearValue();
  } catch (error) {
    console.log(error);
  }
};
