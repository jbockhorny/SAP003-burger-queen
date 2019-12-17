import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

import Input from '../Components/input';
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

  function banana(item) {  
    setOrder([item])
  }

  return (
    <div>
      <div>
        <form>
          Nome: <Input type='text' />
          <br></br>
          Mesa: <Input type='number' />
        </form>
        <section className={css(style.menu)}>
          {

            menu.map((item) =>
              < LinkMenu title={item.name} children={item.price} onClick={() => banana(item)} />
            )
          }
        </section>

      </div>
      <Order order = {order}/>
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
  }

})

export default Hall;