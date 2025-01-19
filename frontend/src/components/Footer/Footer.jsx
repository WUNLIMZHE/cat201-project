import './Footer.css'
export default function Footer(){
    const currentYear = new Date().getFullYear();
    return (
        <div className='footer'>
            <p className='copyright'>Copyright &#169; {currentYear} - All rights reserved by Sunny Papyrus LLC</p>
        </div>
    );
}