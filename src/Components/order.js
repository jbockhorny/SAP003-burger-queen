import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Button from './button';
import LinkMenu from './linkMenu';
import Input from './input';

const style = StyleSheet.create({

  aside: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    marginBottom: '2%',
    marginTop: '1%',
    background: '#8C251C',
    color: '#F2F2F2',
    fontFamily: 'sans-serif',
    border: '1px solid black',
    borderRadius: '1vw',
    width: '58vw',
    fontSize: '2vw',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1px',
    alignItems: 'flex-end',
  },

  placeholder: {
    margin: '1vw 1vw 1vw 0',
    border: '1px solid black',
    borderRadius: '1vw',
    padding: '6%',
    width: '86%',
  },

  buttonOrder: {
    border: '1px solid black',
    borderRadius: '1vw',
    padding: '1vw',
    background: '#F28627',
    color: '#8C251C',
    fontSize: '2vw',
    margin: '0 1vw 1vw 1vw',
  },

  activeButtonOrder: {
    ':active': {
      background: 'black',
      color: '#F28627',
    },
  },
})

const Order = (props) => {

  return (
    <aside className={css(style.aside)}>
          <form className={css(style.form)}>
            <p>Resumo do pedido</p>
            <div className={css(style.input)}>

              <label>
                Nome: <Input className={css(style.placeholder)} id='name-client' type='text' onChange={props.onClientChange} value={props.client} placeholder={'Digite o nome'} />
              </label>

              <label >
                Mesa: <Input className={css(style.placeholder)} id='table' type='number' onChange={props.onTableChange} value={props.table} placeholder={'Digite a mesa'} />
              </label>
            </div>

          </form>

          <p>Cliente: {props.client} Mesa: {props.table}</p>
          

          <section>

            <section>

              {props.order.map((item, index) =>

                <div>

                  <Button className={css(style.buttonOrder, style.activeButtonOrder)} children='-' onClick={() => props.decrement(item)} />
                  <span>{item.counter}</span>
                  <Button className={css(style.buttonOrder, style.activeButtonOrder)} children='+' onClick={() => props.increment(item)} />
                  < LinkMenu title={item.name} />
                  <Button className={css(style.buttonOrder, style.activeButtonOrder)} children='x' key={index} onClick={() => props.deleteOrder(item)} />
                </div>
              )}

            </section >
            {(props.order.length === 0) ? '' :
              (<>
                <p>Total: R$ {props.totalPrice},00 </p>
                <Button className={css(style.buttonOrder, style.activeButtonOrder)} children='Enviar pedido' onClick={() => props.sendOrder(props.order)} />
              </>
              )}
          </section>

        </aside>
  )
}

export default Order;