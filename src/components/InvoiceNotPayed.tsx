import React, { useState } from 'react';
import { Invoice } from '../modules/Invoice';
import { IoIosFlash } from 'react-icons/io';
import '../assets/invoice.css';
import Modal from './modal';

function InvoiceNotPayed({data, checkedState,setCheckedState}: {data : Invoice[], checkedState: boolean[], setCheckedState: any}) {
  
  const [total, setTotal] = useState<number>(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const Toggle = () => setShow(false) ;

  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + data[index].newPrice;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };
  return (
    <div>
      <Modal show={show} close={Toggle} total={total}/>
      {data.map((invoice: Invoice, key: number) =>{
        return(
          <div key={key} className="container">
            {invoice.payedDate === null ? 
            <div className="content">
              <div className="input">
                <input
                  type="checkbox"
                  className="checkbox"
                  id={`custom-checkbox-${key}`}
                  checked={checkedState[key]}
                  onChange={() => handleOnChange(key)}
                />
              </div>
              <div className="invoice">
                <p className="invoiceNumber">{invoice.invoiceNumber}</p>
                <p className="invoiceDays">A régler avant le {invoice.maxDate}</p>
              </div>
              <div className="payments">
                {invoice.discount !== null && invoice.multiPaymentStatus !== "AVAILABLE"? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> Escompte</p>
                  <p className="paymentsFormuleInfo"> -{invoice.discount.rate}% pendant {invoice.discount.maxDaysToPay} jours</p>   
                </div>
                : null}

                {invoice.multiPaymentStatus === "AVAILABLE" && invoice.discount === null? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> 3x sans frais</p>
                  <p className="paymentsFormuleInfo">Disponible</p>   
                </div> 
                : null}

                {invoice.multiPaymentStatus === "AVAILABLE" && invoice.discount !== null ? 
                <div className="paymentsContent">
                  <p className="paymentsFormule"><IoIosFlash /> 3x sans frais et Escompte</p>
                  <p className="paymentsFormuleInfo">Disponible et -{invoice.discount.rate}% pendant {invoice.discount.maxDaysToPay} jours</p>   
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
      <div className="pay" onClick={() => handleShow()}>
        <p className="payAmount">Payer {total} €</p>
      </div>
    </div>
  )
}

export default InvoiceNotPayed


