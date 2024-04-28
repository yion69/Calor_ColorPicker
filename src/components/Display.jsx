import React,{useState} from 'react';
import Card from './Card';
import RecentCard from './RecentCard';
import SearchBar from './SearchBar';
import { Star, Search, RotateCcw } from 'lucide-react';
import './index.css';

function ColorDisplay () {
    
    let [color, setColor] = useState('#FFFFFF');
    let [colorRgb, setColorRgb] = useState('255,255,255')
    let [colorHsl, setColorHsl] = useState( 0 + '°,' + 0 + '%,' + 0 + '%')
    let [addedColor, setAddedColor] = useState(['#000000',]);
    let inputValue = document.getElementById('colorValue');
    let inputText = document.querySelector('#input-text-hex');
    let inputTextRgb = document.querySelector('#input-text-rgb');

    function handleColorChange (event) { 
        
        let value  = event.target.value;
        setColor( c => c = value);
        
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
        let r = parseInt(result[1], 16);
        let g = parseInt(result[2], 16);
        let b = parseInt(result[3], 16);
        setColorRgb(rc => rc= `${r},${g},${b}`)
        
        let tempR = r/255;
        let tempG = g/255;
        let tempB = b/255;
        var max = Math.max(tempR,tempG,tempB), min = Math.min(tempR,tempG,tempB);
        var h,s,l = (max + min) / 2;
        if(max === min){
            h = s = 0; 
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case tempR: h = (tempG - tempB) / d + (g < b ? 6 : 0); break;
                case tempG: h = (tempB - tempR) / d + 2; break;
                case tempB: h = (tempR - tempG) / d + 4; break;
                default: console.log('error');
            }
            h /= 6;
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        setColorHsl( hsl => hsl=( h + '°,' + s + '%,' + l + '%'))
    }

    function searchBarAdd(val){

        const regex = new RegExp(/([#]{1}[A-F0-9]{3}|[A-F0-9]{6})\w+/g);

        if(regex.test(val) === true){

            setColor( c => c = val);
    
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
            let r = parseInt(result[1], 16);
            let g = parseInt(result[2], 16);
            let b = parseInt(result[3], 16);
    
            setColorRgb(rc => rc= `${r},${g},${b}`)
    
            let tempR = r/255;
            let tempG = g/255;
            let tempB = b/255;
            var max = Math.max(tempR,tempG,tempB), min = Math.min(tempR,tempG,tempB);
            var h,s,l = (max + min) / 2;
            if(max === min){
                h = s = 0; 
            }else{
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case tempR: h = (tempG - tempB) / d + (g < b ? 6 : 0); break;
                    case tempG: h = (tempB - tempR) / d + 2; break;
                    case tempB: h = (tempR - tempG) / d + 4; break;
                    default: console.log('error');
                }
                h /= 6;
            }
            h = Math.round(h * 360);
            s = Math.round(s * 100);
            l = Math.round(l * 100);
            setColorHsl( hsl => hsl=( h + '°,' + s + '%,' + l + '%'))
        }
        else { 
            console.log('error value does not match')
        }
    }

    // function handleHexcodeChange (event) {event.target.value = color}
    // function handleRgbChange (event) {console.log('hehe')};
    // function handleHslChange (event) {event.target.value = color}

    function handleColorReset (event) {
        setColor( c => c = '#FFFFFF');
        setColorRgb (rc => rc='255,255,255');
        setColorHsl (hsl => hsl=( 0 + '°,' + 0 + '%,' + 0 + '%'))
        inputValue.value = '#FFFFFF';
        console.log(color, colorRgb, inputValue.value); 
    }

    function handleColorAdd () {setAddedColor( a => [...a, color])}
    function removeColorAdd (index) {setAddedColor(addedColor.filter((_,i)=> i !== index));}
    function handleSearchBar() {
        if(window.screen.width < 500){
            let searchbar = document.querySelector('.searchbar');
            // searchbar.style.display = 'block';
            {searchbar.style.visibility === "visible" ? searchbar.style.visibility = 'hidden' : searchbar.style.visibility = 'visible'}
        }
    }

    function handleMoveUp (index) {
        let tempColor = [...addedColor];
        if(index !== 0){
            [tempColor[index-1], tempColor[index]] = [tempColor[index], tempColor[index-1]];
            setAddedColor( s => tempColor);
            console.log(tempColor);
        }
    }       

    function handleMoveDown (index) {
        if(index < addedColor.length - 1){
            let tempColor = [...addedColor];
            [tempColor[index],tempColor[index+1]] = [tempColor[index+1], tempColor[index]];
            setAddedColor( s => tempColor);
            console.log(tempColor);
        }
    }

    function cycleColorValue (event) {

        let hex = document.getElementById('input-text-hex');
        let rgb = document.getElementById('input-text-rgb');
        let hsl = document.getElementById('input-text-hsl');

        if(window.screen.width < 500){
            if(event.target.id === "input-text-hex"){
                hex.style.display = "none";
                rgb.style.display = "block";
                hsl.style.display = "none";
            }
            else if(event.target.id === "input-text-rgb"){
                hex.style.display = "none";
                rgb.style.display = "none";
                hsl.style.display = "block";
            }
            else if(event.target.id === "input-text-hsl"){
                hex.style.display = "block";
                rgb.style.display = "none";
                hsl.style.display = "none";
            }
        }
    }

    return(
        <div className='flex flex-col md:flex-col lg:flex-row'>
            <div className='w-10/12 md:w-6/12 lg:w-2/6 lg:mx-[250px] lg:mr-5 mx-auto mt-10 p-10 h-[27rem] bg-matcha-400 rounded-lg shadow-2xl'>
                <div className='w-full h-4/6 mx-auto rounded-md border-matcha-600 border-2' style={{backgroundColor: color}}></div>
                <div className='flex place-content-center mt-3 mb-3 p-3 bg-matcha-600 rounded-md'>
                    <p
                        type="text"
                        id='input-text-hex'
                        onClick={cycleColorValue} 
                        className='h-8 text-center font-semibold text-lg rounded-md bg-matcha-350 shadow-xl' 
                    >{color}</p>
                    <p  
                        type="text"
                        id='input-text-rgb'
                        onClick={cycleColorValue} 
                        className='h-8 text-center font-semibold text-lg rounded-md bg-matcha-350 shadow-xl' 
                    >{colorRgb}</p>
                   <p  
                        type="text"
                        id='input-text-hsl' 
                        onClick={cycleColorValue}
                        className='h-8 text-center font-semibold text-lg rounded-md bg-matcha-350 shadow-xl' 
                    >{colorHsl}</p>
                </div>
                <div className='flex place-content-center p-2 bg-matcha-600 rounded-md'>
                    <input
                        type="color" 
                        id='colorValue'
                        onChange={handleColorChange} 
                        className='w-20 h-[29px] mt-[2px] ml-auto mr-2 md:mr-0 lg:mr-0 px-1 rounded-md bg-matcha-350 shadow-xl' //ml-[53px]
                    />
                    <input
                        type="text"
                        id='color-searchbar'
                        className='w-[52%] h-[29px] mx-3 mt-[2px] px-3 rounded-md bg-matcha-350 shadow-xl'
                        placeholder='eg.#FFFFFF'
                    />
                    <button 
                        onClick={()=>handleSearchBar()} 
                        className='btn h-8 w-10 ml-1 border-2 border-matcha-600 bg-matcha-350 rounded-md shadow-xl'>
                            <Search className='svg-refresh mx-auto' />
                    </button>
                    <SearchBar add={searchBarAdd} />
                    <button 
                        onClick={()=>handleColorAdd()} 
                        //ml-auto
                        className='btn h-8 w-10 ml-1 border-2 border-matcha-600 bg-matcha-350 rounded-md shadow-xl' >
                            <Star className='mx-auto'/>
                    </button>

                    <button 
                        onClick={()=>handleColorReset()} 
                        className='btn h-8 w-10 ml-1 mr-[10px] border-2 border-matcha-600 bg-matcha-350 rounded-md shadow-xl'>
                            <RotateCcw className='svg-refresh mx-auto' />
                    </button>
                </div>
            </div>
            <div className='w-10/12 md:w-6/12 lg:w-2/6 lg:mx-0 mx-auto my-2 md:my-2 lg:my-10 p-10 h-[27rem] bg-matcha-400 rounded-lg shadow-2xl'>
                <h3 className='h-6 w-28 mx-auto -mt-6 -mb-1 text-center  font-semibold bg-matcha-600 rounded-t-lg'>Favourite</h3>
                <div id='added-color' className='w-full h-[62%] border-2 border-matcha-600 rounded-xl mb-5 py-1 overflow-y-scroll scroll-smooth bg-matcha-600'>
                    {addedColor.map((e, index) => 
                        <Card
                            key={index}
                            value={e} 
                            moveUp={()=>handleMoveUp(index)} 
                            moveDown={()=>handleMoveDown(index)} 
                            remove={()=>removeColorAdd(index)} />
                    )}
                </div>
                <div className='w-full h-[35%] mt-8 my-auto border-2 bg-matcha-600 border-matcha-600 rounded-xl'>
                    <h3 className='h-6 w-28 mx-auto -mt-6 -mb-1 text-center  font-semibold bg-matcha-600 rounded-t-lg'>Recent</h3>
                    <RecentCard />
                </div>
            </div>          
        </div>
    )
}
export default ColorDisplay;