/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ul) {
    this.ul = ul;
  }

  formatTimestamp(timestamp) {
    const d = new Date(timestamp);
    const formattedDate = `${("0" + d.getDate()).slice(-2)}.${(
      "0" +
      (d.getMonth() + 1)
    ).slice(-2)}.${d.getFullYear()}`;
    return formattedDate;
  }

  createTicket(ticket) {
    const formattedTime = this.formatTimestamp(ticket.created);
    return `
            <li id="${ticket.id}" class="item">
              <div class="wrapper-input">
                <input type="radio" class="check" ${
                  ticket.status ? "checked" : ""
                }/>
              </div>
              <div class="wrapper-text">
                <div class="name">${ticket.name}</div>
                <div class="description hidden">${ticket.description}</div>
              </div>
              <div class="time">${formattedTime}</div>
              <div class="wrapper-btn">
                <button class="edit">✎</buttton>
                <button class="delete">X</button>
              </div>

              </li>
              `;
  }

  showTickets(tickets) {
    const ticketElements = tickets.map((ticket) => {
      return this.createTicket(ticket);
    });
    this.ul.innerHTML = ticketElements.join("");
  }

  initListeners(onStatusChange, onTicketEdit, onDelete) {
    this.ul.addEventListener("click", (event) => {
      const actualItem = event.target.closest(".item");
      if (event.target.className == "check") {
        const isChecked = event.target.hasAttribute("checked");
        onStatusChange(actualItem.id, isChecked);

        return;
      }
      if (event.target.className == "edit") {
        onTicketEdit(actualItem.id);

        return;
      }
      if (event.target.className == "delete") {
        onDelete(actualItem.id);

        return;
      }
      if (actualItem) {
        if (
          Array.from(
            actualItem.querySelector(".description").classList
          ).includes("hidden")
        ) {
          actualItem.querySelector(".description").classList.remove("hidden");
        } else {
          actualItem.querySelector(".description").classList.add("hidden");
        }
      }
    });
  }
}

