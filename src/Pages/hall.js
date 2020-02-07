import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

import Header from '../Components/header';
import Button from '../Components/button';
import Input from '../Components/input';
import LinkMenu from '../Components/linkMenu';
import Order from '../Components/order';


const style = StyleSheet.create({

  hall: {
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans Serif',
    background: 'black',
    width: '100vw',
    height: '100vw', 
    padding: '1vw',
  },

  navHall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '4vw',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },

  buttonHall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    display: 'flex',
    width: '30vw',
    height: '8vw',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2vw',
    fontFamily: 'sans-serif',
    fontSize: '2vw',
    background: '#8C251C',
    color: '#F2F2F2',
    border: '1px solid black',
    borderRadius: '1vw',
    marginLeft: '1vw',
  },

  activeButtonMenu: {
    ':active': {
      color: '#8C251C',
      background: '#F2F2F2',
    },
  },

  main: {
    display: 'flex',
    flexDirection: 'row',
  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1vw',
    width: '30vw',
    fontFamily: 'sans-serif'
  },

  modal: {
    border: '1px solid black',
    borderRadius: '1vw',
    padding: '1vw',
    paddingLeft: '2vw',
    margin: '0 1vw 1vw 0',
    background: '#F28627',
    color: '#8C251C',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '90%',
  },

  buttonModal: {
    border: '1px solid black',
    borderRadius: '1vw',
    padding: '1vw 2vw',
    color: '#F28627',
    background: '#8C251C',
    fontSize: '90%',
    margin: '1vw 2vw',
    fontWeight: 'bold',
  },

  activeLinkMenu: {
    ':active': {
      background: '#8C251C',
      color: '#F28627',
    },
  },

  linkMenu: {
    display: 'flex',
    width: '25vw',
    border: '1px solid black',
    borderRadius: '1vw',
    padding: '8%',
    marginBottom: '3%',
    background: '#F28627',
    color: 'black',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '90%',
  },

  icon: {
    width: '10%',
    height: 'auto',
    marginRight: '2%',
  },

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
})

function Hall() {

  const [menu, setMenu] = useState([]);
  const [printMenu, setPrintMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState();
  const [modal, setModal] = useState({ status: false });
  const [extra, setExtra] = useState();
  const [option, setOption] = useState({ status: false });

  useEffect(() => {

    db.collection('Menu')
      .get()
      .then((snapshot) => {
        const menuCollection = snapshot.docs.map((doc) => ({
          ...doc.data()
        }));
        setMenu(menuCollection)

      });
  }, [])

  function breakfast() {

    const sliceMenu = menu.filter(item =>
      (item.breakfast === true)
    )
    setPrintMenu(sliceMenu);
  }

  function allDay() {

    const sliceMenu = menu.filter(item =>
      (item.breakfast === false)
    )
    setPrintMenu(sliceMenu);

  }

  function verifyAdditional(item) {

    const findExtra = item.extra.length > 1;

    (findExtra) ? optionAndExtra(item) : updateOrder(item)
  }

  function optionAndExtra(item) {

    setModal({ status: true, item })

  }

  function updateOrder(item) {

    if (order.find(element => element.name === item.name) === undefined) {
      return setOrder([...order, { ...item, id: new Date().getTime() }])
    } else {
      counterOrder(item)
    }
  }

  function decrement(item) {

    if (item.counter > 1) {
      const removeCount = order.map(elem => {
        return (elem.name === item.name) ? { ...elem, counter: elem.counter - 1 } : elem
      })
      setOrder(removeCount)

    } else {
      deleteOrder(item);

    }
  };

  function increment(item) {
    counterOrder(item)

  };

  function deleteOrder(item) {
    const deleteItem = order.filter(elem => elem !== item);
    setOrder(deleteItem);
  }

  function sendOrder(order) {

    if (!client || !table) {
      growl.error({ text: 'Escreva o nome do cliente e da mesa.', fadeAway: true, fadeAwayTimeout: 2000 })
    } else {
      let timestamp = new Date();
      growl.success({ text: 'Pedido enviado!', fadeAway: true, fadeAwayTimeout: 2000 })
      db.collection("Order").add({
        nameClient: client,
        table: table,
        order: order,
        status: "Pendente",
        hour: timestamp,
      })
        .then()
        .catch(function () {
          growl.error({ text: 'Falha no sistema. Por favor, refaça o Pedido!', fadeAway: true, fadeAwayTimeout: 2000 })
        });
      setOrder([]);
      setTable('');
      setClient('');
    }
  }


  const addOptionAndExtra = () => {

    if (!option || !extra) {
      growl.error({ text: 'Escolha o hamburguer e o extra!', fadeAway: true, fadeAwayTimeout: 2000 })
    } else if (extra !== 'Sem extra') {
      const updateItem = { ...modal.item, price: modal.item.price + 1, name: `${modal.item.name} ${option} com ${extra} ` }
      updateOrder(updateItem)
      setModal({ status: false });
    } else {
      const updateItem = { ...modal.item, name: `${modal.item.name} ${option}` }
      updateOrder(updateItem)
      setModal({ status: false });

    }
    setOption("");
    setExtra("");

  }

  function counterOrder(item) {
    const includeCount = order.map(elem => {
      return (elem.name === item.name) ? { ...elem, counter: elem.counter + 1 } : elem
    })
    setOrder(includeCount)

  }
  const getClientName = (e) => {
    let clientNameValue = e.target.value;
    setClient(clientNameValue);
  }

  const getClientTable = (e) => {
    let clientTableValue = e.target.value;
    setTable(clientTableValue);
  }

  let totalPrice = order.reduce((accum, current) =>
    accum + (current.price * current.counter), 0)

  return (
    <div className={css(style.hall)}>
      <nav className={css(style.navHall)}>
        <Header className={css(style.header)} />
        {/* <Button children= "Voltar" /> */}
        <div className={css(style.buttonHall)}>
          <Button className={css(style.button, style.activeButtonMenu)} children='Café da Manhã' onClick={() => breakfast()} />
          <Button className={css(style.button, style.activeButtonMenu)} children='Dia inteiro' onClick={() => allDay()} />
        </div>
      </nav>
      <main className={css(style.main)}>

        <section className={css(style.menu)}>
          {modal.status ? (
            <div className={css(style.modal)}>
              <h3>Opções</h3>
              {modal.item.option.map((elem, index) => (
                <div key={index}>

                  <Input type='radio' name='Opção' checked={elem === option} onChange={() => setOption(elem)} value={elem} />
                  <label>{elem}</label>
                </div>
              ))}
              <h3>Extras</h3>
              {modal.item.extra.map((elem, index) => (
                <div key={index}>
                  <Input type='radio' name='Extra' checked={elem === extra} onChange={() => setExtra(elem)} value={elem} />
                  <label>{elem}</label>
                </div>
              ))}

              <Button className={css(style.buttonModal)} children='Adicionar' onClick={addOptionAndExtra} />
              <Button className={css(style.buttonModal)} children='x' onClick={() => setModal({ status: false })} />
            </div>
          ) : ''}

          {
            printMenu.map((item, index) =>

              <LinkMenu key={index} className={css(style.linkMenu, style.activeLinkMenu)}
                onClick={() => verifyAdditional(item)} >
                <img className={css(style.icon)} src={'./img/' + item.name +'.png'} />
                {item.name} {` ${item.price},00`}
              </LinkMenu>
            )
          }

        </section>
        <Order 
          order={order} 
          onClientChange={getClientName} 
          onTableChange={getClientTable} 
          client={client} 
          table={table} 
          increment={increment} 
          decrement={decrement} 
          deleteOrder={deleteOrder} 
          totalPrice={totalPrice} 
          sendOrder={sendOrder}
        /> 

      </main>
    </div>

  )
}

export default Hall;