import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

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


  function updateOrder(item) {


    const index = item.name.indexOf("Hambúrguer");
    console.log(index);
    if (index !== -1) {

      console.log(item.option);
      console.log(item.extra);

      // const optionExtra = item.map((elem) =>
      // return <Button children={elem.option} />)
      // setOrder(optionExtra)

      // optionAndExtra(item)
    } 

    if (order.find(element => element.name === item.name) === undefined) {
      return setOrder([...order, { ...item, id: new Date().getTime() }])
    } else {
      counterOrder(item)
    }
  }


  // function optionAndExtra(item) {

  //   const optionExtra = item.option.map((option) =>
  //     <Button children={item.option} />)
  //   console.log(optionExtra);

  // }

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
      return (elem.name === item.name) ? {...elem, counter: elem.counter +1} : elem
    })
    setOrder(includeCount)
    
  }
  const clientName = (e) => {
    const inputValue = e.target.value;
    setClient(inputValue);
  }

  const clientTable = (e) => {
    const inputValue = e.target.value;
    setTable(inputValue);
  }
  
  return (
    <>
      <Header className={css(style.header)} />
      <p>Informações do cliente</p>
        <form>
          Nome: <Input id='name-client' type='text' onChange={clientName}/>
          <br></br>
          Mesa: <Input id='table'type='number' onChange={clientTable}/>
        </form>

      <div className={css(style.hall)}>
        <div>
          <section className={css(style.menu)}>
            <Button children='Café da Manhã' onClick={() => breakfast()} />
            <Button children='Dia inteiro' onClick={() => allDay()} />

            {
              print.map((item, index) =>

                <LinkMenu className={css(style.linkMenu, style.active)} title={item.name} children={item.price} key={index} onClick={() => updateOrder(item)} />
              )
            }



          </section>

        </div>
        <>
        {/* {(client || table) } */}
          <p>{client}</p>
          <p>{table}</p>
          <Order order={order} setOrder={setOrder} counterOrder={counterOrder} />
        </>
      </div>
    </>
  )
};


const style = StyleSheet.create({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1%',
    width: '120%',
    fontFamily: 'sans-serif'
  },

  hall: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Hall;