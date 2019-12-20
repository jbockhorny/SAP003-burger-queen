import React from 'react';
import { StyleSheet, css } from 'aphrodite'

import Input from './input'
import LinkMenu from '../Components/linkMenu';
import Button from './button';



const Order = (props) => {

  console.log(props.order.id);
  //Criar um id para identificar e juntar os itens iguais. 

  function banana (item){
    const teste = props.order.filter(elem => elem !== item);
    props.setOrder(teste);    
  }
    

    
  return (
  
    <section className={css(style.order)}>
      <p>Pedido do cliente</p>
      <form>
        Nome: <Input type='text' />
        <br></br>
        Mesa: <Input type='number' />
      </form>
      {props.order.map((item) =>
        <>
          < LinkMenu className={css(style.linkPedido)} title={item.name} children={item.price} />
          <Button children='Delete' onClick={() => banana(item)} />
        </>)}
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