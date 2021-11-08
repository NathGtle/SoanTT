import React from 'react';
import { Invoice } from '../modules/Invoice';
import '../assets/invoice.css';
import { IoIosFlash } from 'react-icons/io';

function InvoicePayed({data} : {data: Invoice[]}  ) {

  return (
    <div>
      {data.map((invoice: Invoice, key: number) =>{
        return(
          <div key={key} className="container">
            {invoice.payedDate !== null ? 
            <div className="content" >
              <div className="invoice">
                <p className="invoiceNumber">{invoice.invoiceNumber}</p>
                <p className="invoiceDays">Régler le {invoice.payedDate}</p>
              </div>
              <div className="payments">
                {invoice.discount !== null && invoice.multiPaymentStatus === "NONE"? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> Escompte</p>
                  <p className="paymentsFormuleInfo">Appliqué</p>   
                </div>
                : null}

                {invoice.multiPaymentStatus === "USED" && invoice.discount === null? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> 3x sans frais</p>
                  <p className="paymentsFormuleInfo">Appliqué</p>   
                </div> 
                : null}

                {invoice.multiPaymentStatus === "USED" && invoice.discount !== null ? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> 3x sans frais et Escompte</p>
                  <p className="paymentsFormuleInfo">Appliqués</p>   
                </div>  
                : null}
              </div>
              <div className="amount">
              {invoice.discount !== null ? 
              <div className="amounts">
                <p className="amountNewPrice">{invoice.newPrice} €</p>
                <p className="amountOldPrice">{invoice.amount} €</p> 
              </div>
              
              : <p className="amountNewPrice">{invoice.newPrice} €</p>}
              </div>
            </div>
            : null}
          </div>
        )
      })}
    </div>
  )
}

export default InvoicePayed
