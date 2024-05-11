import './index.css'
import { Link } from 'react-router-dom';

function NavigationBar () {
    
    return (
        <div className='w-100 h-24 flex flex-col place-content-center place-items-center bg-colors-background text-colors-text'>
            <h3 className='mt-7 ml-4 text-3xl font-bold drop-shadow-xl'>Calor<span className='text-xs'>color-picker</span></h3>
            <ul className='navbar flex mb-2 pt-2 space-x-10 drop-shadow-xl text-md'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to='./RandomColor'>Random Color</Link>
                </li>
                <li>
                    <a href="./RandomScheme">Random Scheme</a>
                </li>
            </ul>
            <div className='w-[90%] h-[1px] border-t-2 border-colors-secondary mx-auto'></div>
        </div>
    )
}
export default NavigationBar;