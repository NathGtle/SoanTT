import { Invoice } from "../modules/Invoice";

interface DefaultInvoiceResponse {
  status: string;
  payments: Invoice;
}

class WebService {
  static baseUrl = 'https://test.soan-solutions.io/test_front/datas'

  static async call(url: string): Promise<DefaultInvoiceResponse>{
    let res = await fetch(url)
    return await res.json()
  }

  static async getInvoices(){

    let response = await WebService.call(`${WebService.baseUrl}/`)
    let payments = response.payments
    let data: Invoice[] = []
    for (let key in payments){
      let value = payments[key];
      data.push(value)
    }
    return data as unknown as Invoice
  }
}

export default WebService