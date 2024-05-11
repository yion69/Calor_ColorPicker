import { CircleMinus, CircleChevronUp, CircleChevronDown } from 'lucide-react';
import '../index.css';

function Card (prop) {

    const value = prop.value;
    const remove = prop.remove;
    const moveColorUp = prop.moveUp;
    const moveColorDown = prop.moveDown;

    return(
        <div id='colorCard' className='flex place-items-center h-14 w-11/12 mx-auto my-3 p-3 bg-colors-primary bg-opacity-80 rounded-md shadow-md'>
            <div className='size-9 md:size-5 lg:size-10 rounded-3xl' style={{backgroundColor: value}}></div>
            <h3 className='flex flex-col w-20 ml-auto -mt-1 mr-auto font-light text-xl md:text-lg lg:text-lg text-center text-colors-text2'>
                <span className='-mb-1 text-xs'>
                    Hex
                </span>
                {value}
            </h3>
            <button className='card w-6 h-9 ml-0 md:ml-auto lg:ml-2 lg:mr-1 px-1 py-1' onClick={moveColorUp}>
                <CircleChevronUp className='mx-auto my-auto size-5 md:size-7 lg-size-9' />
            </button>

            <button className='card w-6 h-9 ml-0 md:ml-auto lg:ml-2 lg:mr-1 px-1 py-1' onClick={moveColorDown}>
                <CircleChevronDown className='mx-auto my-auto size-5 md:size-7 lg-size-9' />
            </button>

            <button className='card w-6 h-9 ml-0 md:ml-auto lg:ml-2 lg:mr-3 px-1 py-1' onClick={remove}>
                <CircleMinus className='mx-auto my-auto size-5 md:size-7 lg-size-9' />
            </button>
        </div>
    )
}

export default Card;