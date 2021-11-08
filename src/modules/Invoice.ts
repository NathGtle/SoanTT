export interface InvoiceInterface {
  status: string, 
  payments: Invoice;
}

export interface Invoice extends Imap {
  payedDate: string | null;
  invoiceNumber: string;
  sentDate: any;
  newPrice: number;
  maxDaysToPay: number;
  amount: string;
  discount: Discount | null;
  multiPaymentStatus: string;
}

export interface Imap {
  [key: string]: any;
}

export interface Discount {
  rate: number;
  maxDaysToPay: number;
}