import React, { useEffect, useState } from 'react'
import InvoiceNotPayed from '../components/InvoiceNotPayed';
import InvoicePayed from '../components/InvoicePayed';
import { Invoice } from '../modules/Invoice';
import WebService from '../services/WebService';
import { AiFillLock } from 'react-icons/ai';
import moment from 'moment';
import '../assets/payments.css'

function Payments() {
  const [checked, setChecked] = useState(true)

  const [data, setData] = useState<Invoice[]>([])
  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  useEffect(() =>{
    WebService.getInvoices().then((invoices) => {
      invoices.map((invoice: Invoice) =>{
        if(invoice.discount !== null){
          const newPrice = parseInt(invoice.amount, 10) - (parseInt(invoice.amount, 10) * invoice.discount.rate / 100)
          invoice.newPrice = newPrice 
        }else(
          invoice.newPrice = parseInt(invoice.amount, 10)
        );
        const maxDate = new Date(invoice.sentDate);
        maxDate.setDate(maxDate.getDate() + 30); 
        invoice.maxDate = moment(maxDate).format('DD/MM/YYYY');
        if(invoice.payedDate !== null){
          invoice.payedDate = moment(invoice.payedDate).format('DD/MM/YYYY')
        }
        return null
        
      })
      setData(invoices as unknown as Invoice[])
      setCheckedState(new Array(invoices.length).fill(false))    
    })
  },[])
  
  if(data === null){
    return <div>Loading...</div>
  }
  return (
    <>
    <div className="body">
      <div className="statusChecked">
        <div onClick={() => setChecked(true)} className={checked === true ? 'checked' : 'notChecked'}><p className="checkedName">Factures à payer</p></div>
        <div onClick={() => setChecked(false)} className={checked === true ? 'notChecked' : 'checked'}><p className="checkedName">Factures payées</p></div>
      </div>
      {checked === true ? 
      <InvoiceNotPayed data={data} checkedState={checkedState} setCheckedState={setCheckedState} />
      :<InvoicePayed data={data} />
      }
    </div>
    {checked === true ? <p className="secure"><AiFillLock /> Paiement en ligne 100 % sécurisé</p> : null}
    </>
  )
}

export default Payments
