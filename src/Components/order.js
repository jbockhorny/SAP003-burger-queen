import React from 'react';
import { StyleSheet, css } from 'aphrodite'

const Order = ({order}) => {
    console.log(order);
    return (
        <section className={css(style.order)}>
            {order.map((i) => 
            <p> {i.name} </p>)}

        </section>
    )
}

const style = StyleSheet.create({
    order: {
        border: '1px solid black',
        padding: '10px',
        marginBottom: '10px',
        width: '500px'
    }
})

export default Order;