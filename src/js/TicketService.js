import createRequest from "./api/createRequest";

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    createRequest(
      {
        method: "GET",
        params: { method: "allTickets" },
      },
      callback
    );
  }

  get(id, callback) {
    createRequest(
      {
        method: "GET",
        params: { method: "ticketById", id },
      },
      callback
    );
  }

  create(data, callback) {
    createRequest(
      {
        method: "POST",
        params: { method: "createTicket" },
        body: data,
      },
      callback
    );
  }

  update(id, data, callback) {
    createRequest(
      {
        method: "POST",
        params: { method: "updateById", id },
        body: data,
      },
      callback
    );
  }

  delete(id, callback) {
    createRequest(
      {
        method: "GET",
        params: { method: "deleteById", id },
      },
      callback
    );
  }
}
