import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

import Header from '../Components/header';

function Kitchen() {

  const [kitchen, setKitchen] = useState([]);


  useEffect(() => {

    db.collection('Order')
      .get()
      .then((snapshot) => {
        const kitchenCollection = snapshot.docs.map((doc) => ({
          ...doc.data()
        }));
        setKitchen(kitchenCollection)

      });
  }, [])

  return (
    <>
      <Header className={css(style.header)}/>
        {
          kitchen.map(elem =>
            <p> Cliente: {elem.nameClient}</p>
          )
        }
    </>

  )
}

const style = StyleSheet.create({

  header: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default Kitchen;