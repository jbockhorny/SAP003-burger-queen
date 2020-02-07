import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db } from '../keyFirebase';

import Header from '../Components/header';
import LinkMenu from '../Components/linkMenu';
import Button from '../Components/button';

const style = StyleSheet.create({

  kitchen: {
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans Serif',
    background: 'black',
    width: '100vw',
    height: '100vw',
    padding: '1vw',
  },

  navKitchen: {
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

  activeButtonKitchen: {
    ':active': {
      color: '#8C251C',
      background: '#F2F2F2',
    },
  },

  main: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid white',
    borderRadius: '1vw',
    background: 'blue',
    margin: '1vw',
    padding: '1vw',
    width: '30vw',
    height: '32vw',
    justifyContent: 'space-between', 

  },

  teste2:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', 
    backgroundColor: 'green', 

  },

  teste:{
    display: 'flex',
    flexDirection:'column',
    // alignItems: 'flex-end',
    // backgroundColor: 'black',
    // justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonStatus:{
    
    
  },
  activeButtonStatus: {
    ':active': {
      color: '#8C251C',
      background: '#F2F2F2',
    },
  },
})

function Kitchen() {

  const [kitchen, setKitchen] = useState([]);
  const [printStatus, setPrintStatus] = useState([]);

  useEffect(() => {
    db.collection('Order')
      .onSnapshot((snapshot) => {
        const kitchenCollection = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()

        }));
        setKitchen(kitchenCollection)


      });
  }, [])

  useEffect(() => {

    status("Pendente")
  }, [kitchen])



  function status(param) {

    const statusKitchen = kitchen.filter(item => 
      (item.status === param)      
    )
    setPrintStatus(statusKitchen);
  }

  // function verifyStatus(elem) {
  //   console.log(elem)
  //   if(elem.status === "Pendente"){
  //    let param = "Em preparo";
  //   } else if ( elem.status === "Em preparo"){
  //    let param = "Finalizado"
  //   } else {
  //     let param = "Tempo de preparo"
  //   }
  // }

  // function changeStatusInPreparation(){
  //   console.log("Em preparo")
  // }
  // function changeStatusFinished(){
  //   console.log("Finalizado")
  // }
  // function checkTheTime(){
  //   console.log("Tempo")
  // }

  function changeNameButton(param) {
        if (param === "Pendente") {
      return "Em preparo"

    } else if (param === "Em preparo") {
      return "Finalizado"
     }
     else {
      return "Tempo de preparo"
    }
}

  function teste(){
     console.log()
    
  }

  return (
    <div className={css(style.kitchen)}>
      <div className={css(style.navKitchen)}>
        <Header className={css(style.header)} />
        <LinkMenu className={css(style.button, style.activeButtonKitchen)}
          children='Pendente' onClick={() => status("Pendente")} />
        <LinkMenu className={css(style.button, style.activeButtonKitchen)}
          children='Em preparo' onClick={() => status("Em Preparo")} />
          />
        <LinkMenu className={css(style.button, style.activeButtonKitchen)}
          children='Finalizado' onClick={() => status("Finalizado")} />
          />
      </div>

      <main className={css(style.main)}>
        

        {
          printStatus.map(elem => (

            <div className={css(style.card)}>
              <div className={css(style.teste2)}>
                <p>Mesa: {elem.table}</p>

                {elem.order.map(element => (
                  <p>{element.counter} {element.name}</p>
                ))}
              </div>

              <div className={css(style.teste)}>

                  <Button className={css(style.buttonStatus, style.activeButtonStatus)} children={changeNameButton()} onClick={() => teste(elem)} />               

              </div>
            </div>

          ))
        }

      </main>
    </div>




  )
}

export default Kitchen;