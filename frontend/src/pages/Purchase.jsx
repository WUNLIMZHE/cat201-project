import React from 'react'
import BookItem from "./BookItem/BookItem"
import "./Purchase.css"

const Purchase = ({books, purchaseID, shippingAddress, totalAmmount}) => {
  let index = 0;
  const incrIndex = () => {
      index+=1;
      return index;
  }
  return (
    <div className='purchase'>
      <div className="heading">
        <div className="upper">
          <p className="purchaseId">{purchaseID}</p>
          <p className="total">Total: RM {totalAmmount}</p>
        </div>
        <p className="shipping">Delivered to: {shippingAddress}</p>
      </div>
      <ul className='book-list'>
        {books.map((book) => (
            <BookItem key={book.id} index={incrIndex()} {...book} />
        ))}
      </ul>
      <div className="separator"></div>
    </div>
  )
}

export default Purchase