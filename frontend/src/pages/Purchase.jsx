import React from 'react'
import BookItem from "./BookItem/BookItem"
import "./Purchase.css"

const Purchase = ({index, books, purchaseID, shippingAddress, totalAmmount}) => {
  let indexBook = 0;
  const incrIndex = () => {
      indexBook+=1;
      return indexBook;
  }
  return (
    <div className='purchase'>
      <div className="heading">
        <div className="upper">
          <p className="index">{index}</p>
          <p className="total">Total: RM {totalAmmount}</p>
        </div>
        <p className="purchaseId">ID: {purchaseID}</p>
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