/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor(modal) {
    this.modal = modal;
  }
  createTicketElement(ticket) {
    const header = ticket ? "Изменить тикет" : "Добавить тикет";
    this.modal.innerHTML = `
          <h3 class="header">${header}</h3>
          <form class="form" name="ticket-form">
          <input type="hidden" name="id" value="${ticket ? ticket.id : ""}"/>
          <div class="wrapper">
            <p>Краткое описание</p>
            <input class="short-name" name="name" value="${
              ticket ? ticket.name : ""
            }"/>
            <p>Подробное описание</p> 
            <textarea class="long-name" name="description" value="${
              ticket ? ticket.description : ""
            }"></textarea>
          </div>
          <div class="btn-wrrapper">
            <button class="btn success" type="submit">ОК</button>
            <button class="btn cancel" type="reset">Отмена</button>
          </div>
          </form>
            `;
  }

  showModal(ticket) {
    this.createTicketElement(ticket);
    this.modal.classList.remove("hidden");
  }

  closeModal() {
    this.modal.classList.add("hidden");
  }

  initListener(onCreate, onUpdate) {
    this.modal.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const description = event.target.description.value;
      const id = event.target.id.value;
      if (id) {
        onUpdate({ name, description, id });
      } else {
        onCreate({ name, description });
      }
      this.closeModal();
    });
    this.modal.addEventListener("reset", (event) => {
      event.preventDefault();
      this.closeModal();
    });
  }
}
