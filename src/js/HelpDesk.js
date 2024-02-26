import TicketService from "./TicketService";
import TicketForm from "./TicketForm";
import TicketView from "./TicketView";
import TicketDeleteModal from "./TicketDeleteModal";
/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.ticketForm = new TicketForm(
      this.container.querySelector(".form-modal")
    );
    this.ticketDeleteModal = new TicketDeleteModal(
      this.container.querySelector(".delete-modal")
    );
    this.ticketView = new TicketView(this.container.querySelector("ul"));
  }
  init() {
    this.container
      .querySelector(".add-ticket")
      .addEventListener("click", (event) => {
        this.ticketForm.showModal();
      });
    this.ticketForm.initListener(
      (data) => this.handleCreate(data),
      (data) => this.onUpdate(data)
    );
    this.showTickets();
    this.ticketDeleteModal.initListener((id) => this.onDelete(id));
    this.ticketView.initListeners(
      (id, checked) => this.handleStatusChange(id, checked),
      (id) => this.onTicketEdit(id),
      (id) => this.ticketDeleteModal.showModal(id)
    );
  }

  handleCreate(data) {
    this.ticketService.create(data, () => {
      this.showTickets();
    });
  }

  handleStatusChange(id, checked) {
    this.ticketService.update(id, { status: !checked }, () => {
      this.showTickets();
    });
  }

  showTickets() {
    this.ticketService.list((tickets) => {
      this.ticketView.showTickets(tickets);
    });
  }

  onTicketEdit(id) {
    this.ticketService.get(id, (ticket) => {
      this.ticketForm.showModal(ticket);
    });
  }

  onUpdate({ name, description, id }) {
    this.ticketService.update(id, { name, description }, () => {
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
