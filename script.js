const tbody = document.querySelector("tbody");

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
  console.log(users);
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
            <button class="btn btn-dark me-2">
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
