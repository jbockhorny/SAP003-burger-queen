import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite'

import Input from './input'
import LinkMenu from '../Components/linkMenu';
import Button from './button';


const Order = (props) => {

  console.log('id', props.order.id);
  //Criar um id para identificar e juntar os itens iguais. 

  function deletePedido(item) {
    const teste = props.order.filter(elem => elem !== item);
    props.setOrder(teste);
  }  
  
   const [total, setTotal] = useState(0);

  let totalPrice = props.order.reduce((accum, current) => accum + current.price, 0)
  useEffect(() => {
    setTotal(totalPrice);
  },[props])


  return (
    <section>

      <section className={css(style.order)}>
        <p>Pedido do cliente</p>
        <form>
          Nome: <Input type='text' />
          <br></br>
          Mesa: <Input type='number' />
        </form>
        {props.order.map((item) =>
          <>
            < LinkMenu className={css(style.linkPedido)} title={item.name} children={item.price}
            />
            <Button children='Delete' onClick={() => deletePedido(item)} />
          </>)}

      </section>
      {(props.order.length === 0) ? '': 
      (<>
      <p>Total: {total} </p>
      <Button children='Enviar pedido'/>
      </>
  )}
    </section>

  )

}


const style = StyleSheet.create({

  order: {
    padding: '10px',
    marginBottom: '10px',
    width: '500px'
  },

  linkPedido: {
    display: 'flex',
    flexDirection: 'column'
  }
})

export default Order;