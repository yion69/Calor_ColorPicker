import '../index.css';
import { CircleMinus, ArrowLeftRight } from 'lucide-react';
import { CircleChevronUp } from 'lucide-react';
import { CircleChevronDown } from 'lucide-react';

function RecentCard (prop) {
    let value = prop.value; 
    let tempval = '#000000';
    let tempLabel = 'HEX';
    let temp = 1;
    let styles = {
        visible: 'block',
        invisible: 'none',
    }
    
    const remove = prop.remove;
    
    function colorValueSwap() {
        console.log(temp, tempval);
        let color = document.getElementById('color');
        let colorLabel = document.getElementById('colorLabel');
        
        if(temp === 1){tempval = value.hex; tempval = 'HEX';temp++}
        else if( temp === 2){tempval = value.rgb; tempLabel = 'RGB'; temp++}
        else if( temp === 3){tempval = value.hsl; tempLabel = 'HSL'; temp = 1}
        color.innerText = tempval;
        colorLabel.innerText = tempLabel;

    }

    return(
        <div id='colorCard' className='flex place-items-center h-14 w-11/12 mx-auto my-3 p-3 bg-colors-primary bg-opacity-80 rounded-md shadow-md'>
            <div className='size-9 md:size-5 lg:size-10 rounded-3xl' style={{backgroundColor: value.hex}}></div>
            <div className='flex w-22 h-full mx-auto place-items-center  text-colors-text2'>
                <h3 className=' w-12 lg:w-16 ml-auto -mt-1 mr-auto font-light text-xs lg:text-base lg:text-md text-center text-colors-text2' style={{display: styles.visible}}>
                       <p id='colorLabel' className='text-xs -mb-1'>HEX</p>
                       {value.hex}
                </h3>
                <h3 className=' w-16 lg:w-20 ml-auto -mt-1 mr-auto font-light text-xs lg:text-base text-center text-colors-text2' style={{display: styles.visible}}>
                       <p id='colorLabel' className='text-xs -mb-1'>RGB</p>
                       {value.rgb}
                </h3>
                <h3 className=' w-16 lg:w-20 ml-auto -mt-1 mr-auto font-light text-xs lg:text-base text-center text-colors-text2' style={{display: styles.visible}}>
                       <p id='colorLabel' className='text-xs -mb-1'>HSL</p>
                       {value.hsl}
                </h3>
           </div>

            <button className='card w-7 h-9 mx-auto' onClick={remove}>
                <CircleMinus className='mx-auto my-auto size-5 md:size-7 lg-size-9' />
            </button>
        </div>
    )
}

export default RecentCard;