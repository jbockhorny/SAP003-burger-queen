import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

import LinkMenu from '../Components/linkMenu';
import Button from './button';

const Order = (props) => {

  const [status, setStatus] = useState({ status: 'Pendente' });

  function deletePedido(item) {
    const deleteItem = props.order.filter(elem => elem !== item);
    props.setOrder(deleteItem);
  }

  const [total, setTotal] = useState(0);


  let totalPrice = props.order.reduce((accum, current) =>
    accum + (current.price * current.counter), 0)

  useEffect(() => {
    setTotal(`R$ ${totalPrice},00`);
  }, [props])

  function decrement(item) {

    if (item.counter >= 2) {
      const removeCount = props.order.map(elem => {
        return (elem.name === item.name) ? { ...elem, counter: elem.counter - 1 } : elem
      })
      props.setOrder(removeCount)

    } else {
      deletePedido(item);

    }
  };

  function increment(item) {
    props.counterOrder(item)

  };

  function sendOrder(item) {

    if (!props.client || !props.table) {
      growl.error({ text: 'Escreva o nome do cliente e da mesa.', fadeAway: true, fadeAwayTimeout: 2000 })
    } else {
      let timestamp = new Date();
      console.log(timestamp);
      growl.success({ text: 'Pedido enviado!', fadeAway: true, fadeAwayTimeout: 2000 })
      db.collection("Order").add({
        nameClient: props.client,
        table: props.table,
        order: props.order,
        hour: timestamp,
        status: status,

      })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      props.setOrder([]);
      props.setTable('');
      props.setClient('');
    }

  }

  return (
    <section className={css(style.orderLayout)}>

      <section className={css(style.order)}>

        {props.order.map((item, index) =>
          <div>

            <Button className={css(style.button)} children='-' onClick={() => decrement(item)} />
            <span>{item.counter}</span>
            <Button className={css(style.button)} children='+' onClick={() => increment(item)} />
            < LinkMenu className={css(style.linkPedido)} title={item.name} children={item.price}
            />
            <Button className={css(style.button)} children='x' key={index} onClick={() => deletePedido(item)} />
          </div>
        )}

      </section >
      {(props.order.length === 0) ? '' :
        (<>
          <p>Total: {total} </p>
          <Button className={css(style.button)} children='Enviar pedido' onClick={() => sendOrder(props.order)} />
        </>
        )}
    </section>

  )

}

const style = StyleSheet.create({

  button: {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '5px 10px 5px 10px',
    color: '#8C251C',
    fontSize: '18px',
    margin: '1%',
    fontWeight: 'bold',
  },
  
})

export default Order;