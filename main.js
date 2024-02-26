/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/api/createRequest.js
const createRequest = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let callback = arguments.length > 1 ? arguments[1] : undefined;
  const {
    method,
    params,
    body
  } = options;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        callback(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
  const url = new URL("http://localhost:7070/");
  url.searchParams.append("method", params.method);
  url.searchParams.append("id", params.id);
  xhr.open(method, url);
  xhr.send(JSON.stringify(body));
};
/* harmony default export */ const api_createRequest = (createRequest);
;// CONCATENATED MODULE: ./src/js/TicketService.js


/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
class TicketService {
  list(callback) {
    api_createRequest({
      method: "GET",
      params: {
        method: "allTickets"
      }
    }, callback);
  }
  get(id, callback) {
    api_createRequest({
      method: "GET",
      params: {
        method: "ticketById",
        id
      }
    }, callback);
  }
  create(data, callback) {
    api_createRequest({
      method: "POST",
      params: {
        method: "createTicket"
      },
      body: data
    }, callback);
  }
  update(id, data, callback) {
    api_createRequest({
      method: "POST",
      params: {
        method: "updateById",
        id
      },
      body: data
    }, callback);
  }
  delete(id, callback) {
    api_createRequest({
      method: "GET",
      params: {
        method: "deleteById",
        id
      }
    }, callback);
  }
}
;// CONCATENATED MODULE: ./src/js/TicketForm.js
/**
 *  Класс для создания формы создания нового тикета
 * */
class TicketForm {
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
            <input class="short-name" name="name" value="${ticket ? ticket.name : ""}"/>
            <p>Подробное описание</p> 
            <textarea class="long-name" name="description" value="${ticket ? ticket.description : ""}"></textarea>
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
    this.modal.addEventListener("submit", event => {
      event.preventDefault();
      const name = event.target.name.value;
      const description = event.target.description.value;
      const id = event.target.id.value;
      if (id) {
        onUpdate({
          name,
          description,
          id
        });
      } else {
        onCreate({
          name,
          description
        });
      }
      this.closeModal();
    });
    this.modal.addEventListener("reset", event => {
      event.preventDefault();
      this.closeModal();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/TicketView.js
/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
class TicketView {
  constructor(ul) {
    this.ul = ul;
  }
  formatTimestamp(timestamp) {
    const d = new Date(timestamp);
    const formattedDate = `${("0" + d.getDate()).slice(-2)}.${("0" + (d.getMonth() + 1)).slice(-2)}.${d.getFullYear()}`;
    return formattedDate;
  }
  createTicket(ticket) {
    const formattedTime = this.formatTimestamp(ticket.created);
    return `
            <li id="${ticket.id}" class="item">
              <div class="wrapper-input">
                <input type="radio" class="check" ${ticket.status ? "checked" : ""}/>
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
    const ticketElements = tickets.map(ticket => {
      return this.createTicket(ticket);
    });
    this.ul.innerHTML = ticketElements.join("");
  }
  initListeners(onStatusChange, onTicketEdit, onDelete) {
    this.ul.addEventListener("click", event => {
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
        if (Array.from(actualItem.querySelector(".description").classList).includes("hidden")) {
          actualItem.querySelector(".description").classList.remove("hidden");
        } else {
          actualItem.querySelector(".description").classList.add("hidden");
        }
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/js/TicketDeleteModal.js
class TicketDeleteModal {
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
    this.modal.addEventListener("submit", event => {
      event.preventDefault();
      const id = event.target.id.value;
      onDelete(id);
      this.closeModal();
    });
    this.modal.addEventListener("reset", event => {
      event.preventDefault();
      this.closeModal();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/HelpDesk.js




/**
 *  Основной класс приложения
 * */
class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.ticketForm = new TicketForm(this.container.querySelector(".form-modal"));
    this.ticketDeleteModal = new TicketDeleteModal(this.container.querySelector(".delete-modal"));
    this.ticketView = new TicketView(this.container.querySelector("ul"));
  }
  init() {
    this.container.querySelector(".add-ticket").addEventListener("click", event => {
      this.ticketForm.showModal();
    });
    this.ticketForm.initListener(data => this.handleCreate(data), data => this.onUpdate(data));
    this.showTickets();
    this.ticketDeleteModal.initListener(id => this.onDelete(id));
    this.ticketView.initListeners((id, checked) => this.handleStatusChange(id, checked), id => this.onTicketEdit(id), id => this.ticketDeleteModal.showModal(id));
  }
  handleCreate(data) {
    this.ticketService.create(data, () => {
      this.showTickets();
    });
  }
  handleStatusChange(id, checked) {
    this.ticketService.update(id, {
      status: !checked
    }, () => {
      this.showTickets();
    });
  }
  showTickets() {
    this.ticketService.list(tickets => {
      this.ticketView.showTickets(tickets);
    });
  }
  onTicketEdit(id) {
    this.ticketService.get(id, ticket => {
      this.ticketForm.showModal(ticket);
    });
  }
  onUpdate(_ref) {
    let {
      name,
      description,
      id
    } = _ref;
    this.ticketService.update(id, {
      name,
      description
    }, () => {
      this.showTickets();
    });
  }
  onDelete(id) {
    this.ticketService.delete(id, () => {
      console.log(id);
      this.showTickets();
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here

const root = document.getElementById("root");
const app = new HelpDesk(root);
app.init();

// comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;