const deleteButton = document.querySelector("#delete-button");
const deleteName = document.querySelector("#delete-name");
const messageDiv = document.querySelector("#message");
const trashCan = document.querySelector("#trash-can");

trashCan.addEventListener("click", trashCanDelete);

function trashCanDelete() {
  const sName = this.parentNode.childNodes[1].innerText;
  fetch("/trashCanDelete", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stageNameDelete: sName }),
  }).then((res) => {
    if (res.ok) return res.json();
    location.reload();
  });
}

deleteButton.addEventListener("click", () => {
  fetch("/deleteName", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stageName: deleteName.value,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No names to delete.") {
        messageDiv.textContent = `All entries of '${deleteName.value}' have been deleted.`;
      } else {
        window.location.reload(true);
      }
    });
});
