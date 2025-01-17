import "./BookItem.css"

export default function BookItem({ index, image, purchaseUnit, totalPrice, price, id, title }) {
    return (
        <li className="book">
            <p className="bookIndex">{index}</p>
            <img src={image} alt={title} />
            <table className="info">
                <tr>
                    <td><p className="label">Book ID: </p></td>
                    <td><p className="bookId">{id}</p></td>
                </tr>
                <tr>
                    <td><p className="label">Book Title: </p></td>
                    <td><p className="bookId">{title}</p></td>
                </tr>
                <tr>
                    <td><p className="label">Copies Purchased: </p></td>
                    <td><p className="bookId">{purchaseUnit}</p></td>
                </tr>
                <tr>
                    <td><p className="label">Price per copy: </p></td>
                    <td><p className="bookId">{price}</p></td>
                </tr>
                <tr>
                    <td><p className="label">Total Price: </p></td>
                    <td><p className="bookId">{totalPrice}</p></td>
                </tr>
            </table>
        </li>
    );
}
