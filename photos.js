const tbody = document.querySelector("tbody");

const getUsers = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    return [];
  }
};

const setUsers = async () => {
  const photos = await getUsers();
  // console.log(users);
  tbody.innerHTML = "";

  photos.map((photo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td class="fw-bold">${index + 1}</td>
          <td class="fw-bold">${photo.title}</td>
          <td><a href="${photo.url}" target="_blank">${photo.url}</a></td>
          <td><a href="${photo.thumbnailUrl}" target="_blank">
          ${photo.thumbnailUrl}</a></td>
          <td class="d-flex">
              
              <button class="btn btn-danger me-2" onclick="deletePhotos(${
                photo.id
              })">
                  <i class="fas fa-trash"></i>
              </button>
          </td>
      `;

    tbody.appendChild(row);
  });
};

setUsers();

const deletePhotos = async (id) => {
  try {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );

    console.log(res);
    setUsers();
  } catch (error) {
    console.log(error);
  }
};
