const tbody = document.querySelector("tbody");

const getUsers = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/albums?_limit=10"
    );
    console.log(res);
    return res.data;
  } catch (error) {
    return [];
  }
};

getUsers();

const setUsers = async () => {
  const albums = await getUsers();
  // console.log(users);
  tbody.innerHTML = "";

  albums.map((album, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="fw-bold">${index + 1}</td>
          <td class="fw-bold">${album.title}</td>
          
          <td class="d-flex justify-content-center">   

              <button class="btn btn-danger me-2" onclick="deleteUsers(${
                album.id
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
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );
    // console.log(typeof res);
    setUsers();
  } catch (error) {
    console.log(error);
  }

  //   console.log(typeof tbody.children);
};
