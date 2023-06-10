const deleteButton = document.querySelector("#delete-button");
const deleteName = document.querySelector("#delete-name");
const messageDiv = document.querySelector("#message");

deleteButton.addEventListener("click", (_) => {
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
