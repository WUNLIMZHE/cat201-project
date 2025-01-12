import './Cart.css'
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CartItems from '../../components/cartItem/cartItem';
import cartList from '../../cartList';
import bookList from '../../../../backend/src/main/resources/Data.json'
const Cart = (props) => {
    const [totalPrice, setTotalPrice] = useState(0);
    // to be called by cards in the menu, to modify number of items in the cart
    // bookId: book Id
    //qtyChange: change in number of books (1 for adding 1 book, -1 for removing 1 book)
    function changeBookQtyFromMenu(bookId, qtyChange){
        // Find the price of the selected book, which is used in calculating the total price of the purchase
        const bookListIndex = bookList.findIndex(item => item.id===bookId);
        const bookPrice = bookList[bookListIndex].price;
        // Find if the book is already present in the cart
        const cartContentIndex = cartList.findIndex(item => item.id===bookId);
        if(cartContentIndex>0){
            //At least 1 book exists in cart
            cartList[cartContentIndex].quantity += qtyChange;
            if(cartList[cartContentIndex].quantity === 0 ){
                // remove item from cart
                cartList = cartList.filter(item => item.id !== book.id);
            }
        }
        else{
            // The book does not exist in the cart, hence it needs to be added by referring to the bookList
            cartList.push({
                id: bookList[bookListIndex].id,
                title: bookList[bookListIndex].title,
                isbn: bookList[bookListIndex].isbn,
                image: bookList[bookListIndex].image,
                author: bookList[bookListIndex].author,
                genre: bookList[bookListIndex].genre,
                category: bookList[bookListIndex].category,
                price: bookList[bookListIndex].price,
                language: bookList[bookListIndex].language,
                quantity: qtyChange
            });
        }
        // Update the total price
        updateTotalPrice(bookPrice, qtyChange);
    }
    function updateTotalPrice(bookPrice, qtyChange){
        setTotalPrice(totalPrice + bookPrice*qtyChange);
    }
    return (
        <>
            <Navbar/>
            <button className='return'>&#8592; I want to continue shopping</button>
            <h1 className='title'>My Cart</h1>
            <div className='items'>
                {
                    cartList.map((book)=>{
                        <CartItems {...book} updateFinalPrice={updateTotalPrice}/>
                    })
                }
            </div>
            <div className="checkout">
                <span className='finalPrice' ></span>
            </div>
        </>
    );
}

export { changeBookQtyFromMenu };
export default Cart;