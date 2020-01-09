import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite'

import LinkMenu from '../Components/linkMenu';
import Button from './button';


const Order = (props) => {

  //Criar um id para identificar e juntar os itens iguais. 

  function deletePedido(item) {
    const teste = props.order.filter(elem => elem !== item);
    props.setOrder(teste);
  }  
  
   const [total, setTotal] = useState(0);

  let totalPrice = props.order.reduce((accum, current) => accum + (current.price * current.counter), 0)
  
  useEffect(() => {
    setTotal(totalPrice);
  },[props])

  function decrement(item){

   if(item.counter >= 2){
      const removeCount = props.order.map(elem => {
        return (elem.name === item.name) ? {...elem, counter: elem.counter -1} : elem
      })
      props.setOrder(removeCount)

     }else{
       deletePedido(item);     

      }

            // if (removeCount.counter === 0){
      //   deletePedido(item)
      // } else{
      //   props.setOrder(removeCount) 

  };

  function increment(item){
    props.counterOrder(item)
  };


  return (
    <section className={css(style.orderLayout)}>

      <section className={css(style.order)}>
 
        {props.order.map((item, index) => 
<>

          <Button children='-' onClick={() => decrement(item)}/>
        <span>{item.counter}</span>
          <Button children='+' onClick={() => increment(item)}/>
            < LinkMenu className={css(style.linkPedido)}  title={item.name} children={item.price} 
            />
            <Button children='Delete' key={index} onClick={() => deletePedido(item)} />
            </>
        )}

      </section >
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
  },
  orderLayout:{
   width: '50%', 
  }
})

export default Order;