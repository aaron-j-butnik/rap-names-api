const deleteButton = document.querySelector("#delete-button");
const deleteName = document.querySelector("#delete-name");
const messageDiv = document.querySelector("#message");
const trashCan = document.querySelectorAll("#trash-can");
const likeButton = document.querySelectorAll("#likes");

likeButton.forEach((element) => element.addEventListener("click", addLike));

trashCan.forEach((element) =>
  element.addEventListener("click", trashCanDelete)
);

async function addLike() {
  const sName = this.parentNode.childNodes[1].innerText;
  const bName = this.parentNode.childNodes[3].innerText;
  const tLikes = Number(this.parentNode.childNodes[5].innerText);
  try {
    const response = await fetch("/addLike", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageNameS: sName,
        birthNameS: bName,
        likesS: tLikes,
      }),
    });
    const data = response.json();
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function trashCanDelete() {
  const sName = this.parentNode.childNodes[1].innerText;
  try {
    const response = await fetch("/trashCanDelete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stageNameDelete: sName }),
    });
    const data = await response.json();
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

deleteButton.addEventListener("click", async () => {
  try {
    const response = await fetch("/deleteName", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stageName: deleteName.value,
      }),
    });
    const data = await response.json();
    if (data === "No names to delete.") {
      messageDiv.textContent = `All entries of '${deleteName.value}' have been deleted.`;
    } else {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
});
