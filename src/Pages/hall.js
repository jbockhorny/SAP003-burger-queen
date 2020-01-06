import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

import LinkMenu from '../Components/linkMenu';
import Order from '../Components/order';
import Button from '../Components/button';
import Header from '../Components/header';

function Hall() {

  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);


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

      optionAndExtra(item)
    }

    setOrder((currentState) => [...currentState, { ...item, id: new Date().getTime() }])

  }

  function optionAndExtra(item) {

    const optionExtra = item.option.map((option) =>
      <Button children={item.option} />)
    console.log(optionExtra);

  }
  function breakfast() {
    console.log('breakfast')
  }
  function allDay() {
    console.log('allDay')
  }

  return (
    <>
      <Header className={css(style.header)} />

      <div className={css(style.hall)}>
        <div>
          <section className={css(style.menu)}>
            <Button children='Café da Manhã' onClick={() => breakfast()} />
            <Button children='Dia inteiro' onClick={() => allDay()} />
            {
              menu.map((item) =>
                <>
                  < LinkMenu className={css(style.linkMenu, style.active)} title={item.name} children={item.price}
                    onClick={() => updateOrder(item)} />

                </>
              )
            }
          </section>

        </div>
        <Order order={order} setOrder={setOrder} />
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
    flexDirection: 'row'

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