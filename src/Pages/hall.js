import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

import LinkMenu from '../Components/linkMenu';
import Order from '../Components/order'

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
    if(index !== -1){

      console.log(item.option);
      console.log(item.extra);
    }

    setOrder((currentState) => [...currentState, {...item, id: new Date().getTime()}])
  }

  return (
    <div className={css(style.hall)}>
      <div>
        <section className={css(style.menu)}>
          {

            menu.map((item) =>
              < LinkMenu className={css(style.linkMenu)} title={item.name} children={item.price} onClick={() => updateOrder(item)} />
            )
          }
        </section>

      </div>
      <Order order={order} setOrder={setOrder} />
    </div>
  )
};



const style = StyleSheet.create({
  menu: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    width: '250px',
    fontFamily: 'sans-serif'
  },
  hall: {
    display: 'flex',
    flexDirection: 'row'

  },

  linkMenu: {
    border: '1px solid black',
    padding: '10px',
    marginBottom: '10px',
  }
})

export default Hall;