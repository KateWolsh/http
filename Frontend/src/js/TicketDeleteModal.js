export default class TicketDeleteModal {
  constructor(modal) {
    this.modal = modal;
  }
  createModalElement(id) {
    this.modal.innerHTML = `
            <form class="form-delete" name="modal-form">
            <h3 class="header">Удалить тикет</h3>
            <input type="hidden" name="id" value="${id ? id : ""}"/>
            <div class="confirmation-text">
            Вы уверены, что хотите удалить тикет? Это действие необратимо.
            </div>
            <div class="btn-wrrapper">
              <button class="btn success" type="submit">ОК</button>
              <button class="btn cancel" type="reset">Отмена</button>
            </div>
            </form>
              `;
  }

  showModal(id) {
    this.createModalElement(id);
    this.modal.classList.remove("hidden");
  }

  closeModal() {
    this.modal.classList.add("hidden");
  }

  initListener(onDelete) {
    this.modal.addEventListener("submit", (event) => {
      event.preventDefault();
      const id = event.target.id.value;
      onDelete(id);
      this.closeModal();
    });
    this.modal.addEventListener("reset", (event) => {
      event.preventDefault();
      this.closeModal();
    });
  }
}
