import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

import LinkMenu from '../Components/linkMenu';
import Order from '../Components/order';
import Button from '../Components/button';
import Header from '../Components/header';
import Input from '../Components/input';

function Hall() {

  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [print, setPrint] = useState([]);
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

  function verifyAdditional(item) {

    const verify = item.extra.length > 1;

    (verify) ? optionAndExtra(item) : updateOrder(item)
  }


  function updateOrder(item) {

    if (order.find(element => element.name === item.name) === undefined) {
      return setOrder([...order, { ...item, id: new Date().getTime() }])
    } else {
      counterOrder(item)
    }

  }

  function optionAndExtra(item) {

    setModal({ status: true, item })

  }

  const addOptionAndExtra = (item) => {

    if (!option || !extra) {
      growl.error({ text: 'Escolha o hamburguer e o extra!', fadeAway: true, fadeAwayTimeout: 2000 })
    } else if (extra !== 'Sem extra') {
      const updateItem = { ...modal.item, price: modal.item.price + 1, name: `${modal.item.name} ${option} ${extra} ` }
      updateOrder(updateItem)
      setModal({ status: false });
    } else {
      const updateItem = { ...modal.item, name: `${modal.item.name} ${option}${extra}` }
      updateOrder(updateItem)
      setModal({ status: false });

    }
    setOption("");
    setExtra("");

  }

  function breakfast() {

    const sliceMenu = menu.filter(item =>
      (item.breakfast === true)
    )
    setPrint(sliceMenu);
  }

  function allDay() {

    const sliceMenu = menu.filter(item =>
      (item.breakfast === false)
    )
    setPrint(sliceMenu);

  }

  function counterOrder(item) {
    const includeCount = order.map(elem => {
      return (elem.name === item.name) ? { ...elem, counter: elem.counter + 1 } : elem
    })
    setOrder(includeCount)
    console.log(item);

  }
  const getClientName = (e) => {
    let clientNameValue = e.target.value;
    setClient(clientNameValue);
    // setOrder([...order, {client: clientNameValue}])
  }

  const getClientTable = (e) => {
    let clientTableValue = e.target.value;
    setTable(clientTableValue);
  }

  // const buttonStatus = 

  return (
    <div className={css(style.hall)}>
      <nav className={css(style.navHall)}>
        <Header className={css(style.header)} />
        <div className={css(style.buttonHall)}>
          <Button className={css(style.button)} children='Café da Manhã' onClick={() => breakfast()} />
          <Button className={css(style.button)} children='Dia inteiro' onClick={() => allDay()} />
        </div>
      </nav>
      <main className={css(style.main)}>

      <section className={css(style.menu)}>
        {modal.status ? (
          <div>
            <h3>Opções</h3>
            {modal.item.option.map((elem, index) => (
              <div key={index}>

                <input type='radio' name='Opção' checked={elem === option} onChange={() => setOption(elem)} value={elem} />
                <label>{elem}</label>
              </div>
            ))}
            <h3>Extras</h3>
            {modal.item.extra.map((elem, index) => (
              <div key={index}>
                <input type='radio' name='Extra' checked={elem === extra} onChange={() => setExtra(elem)} value={elem} />
                <label>{elem}</label>
              </div>
            ))}

            <Button children='Adicionar' onClick={addOptionAndExtra} />
          </div>
        ) : ''}

        {
          print.map((item, index) =>



            <LinkMenu key={index} className={css(style.linkMenu, style.active)}
              title={item.name} children={item.price} onClick={() => verifyAdditional(item)} />
          )
        }
      </section>

        <aside className={css(style.aside)}>
        <form className={css(style.form)}>
        <p>Informações do cliente</p>
        <div className={css(style.input)}>

          <label>
            Nome: <Input id='name-client' type='text' onChange={getClientName} />
          </label>

          <label>
            Mesa: <Input id='table' type='number' onChange={getClientTable} />
          </label>
        </div>

      </form>

      <p>Cliente: {client} Mesa: {table}</p>
  
      <Order order={order} setOrder={setOrder} counterOrder={counterOrder} client={client}
        table={table} />

        </aside>
      

      {/* <div className={css(style.hall)}>  */}

      
        
      
        </main>
    </div>
    
  )
};


const style = StyleSheet.create({

  // form: {
  //   display: 'flex',
  //   flexDirection: 'column',
  // },

  navHall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '1%',

  },
  button: {
    display: 'flex',
    marginLeft: '10%',
    width: '360px',
    height: '80px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    // padding: '5%',
    fontFamily: 'sans-serif',
    fontSize: '150%',
    background: '#8C251C',
    color: '#F2F2F2',

  

  },

  main: {
    display: 'flex',
    margin: '1%',

  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
  },

  hall: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans Serif',
    fontSize: '16px',

  },
  input: {
    display: 'flex',
    flexDirection: 'row',

  },
  buttonHall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    // alignItems: 'center',

  },

  menu: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1%',
    width: '30%',
    fontFamily: 'sans-serif'
  },

  linkMenu: {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '5%',
    marginBottom: '3%'
  },

  active: {
    ':active': {
      border: '3px solid black',
      borderRadius: '5px'
    },
  },

  header: {
    width: '20%',
    height: 'auto%',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Hall;