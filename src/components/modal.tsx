import React from 'react';
import '../assets/modal.css'
import { AiOutlineClose } from 'react-icons/ai';

function modal({show, close, total}: any) {
  
  return (
    <>
    {show ?
    <div className="modal">
    <div className="modalContainer">
      <div className="inputs">
          <p className="close" onClick={() => close()}><AiOutlineClose /></p>
          <h1 className="modalTitle">Paiement sécurisé par prélèvement bancaire</h1>
          <div className="modalInfo">
            <p>Mise en place d'un mandat SEPA MANGOPAY</p>
          </div>
          
            <div className="inputContent">
              <label className="inputLabel">Titulaire du compte <span>*</span></label>
              <input className="inputModal" type="text" value="Soan solutions"/>
            </div>
            <div className="inputContent">
              <label className="inputLabel">Adresse du titulaire <span>*</span></label>
              <input className="inputModal" type="text" placeholder="Adresse du titulaire"/>
            </div>
            <div className="inputContainer">
              <div className="inputContent">
                <label className="inputLabel">Ville <span>*</span></label>
                <input className="inputModalSplit" type="text" placeholder="Ville"/>
              </div>
              <div className="inputContent">
                <label className="inputLabel">Region <span>*</span></label>
                <input className="inputModalSplit" type="text" placeholder="Région" />
              </div>
            </div>
            <div className="inputContainer">
              <div className="inputContent">
                <label className="inputLabel">Code postal <span>*</span></label>
                <input className="inputModalSplit" type="text" placeholder="Code postal"/>
              </div>
              <div className="inputContent">
                <label className="inputLabel">Pays <span>*</span></label>
                <input className="inputModalSplit" type="text" placeholder="France"/>
              </div>
            </div>
            <div className="inputContent">
              <label className="inputLabel">IBAN <span>*</span></label>
              <input className="inputModal" type="text" placeholder="____ ____ ____ ____ ____ ____ ___"/>
            </div>
            <div className="modalReturn">
              <p className="return" onClick={() => close()}>Annuler</p>
              <div className="buttonPay">
                <p className="payAmount">Payer {total} €</p>
              </div>
            </div>
        </div>
    </div></div> : null}
    </>
    
  )
}

export default modal
