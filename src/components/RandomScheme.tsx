import * as React from 'react';
import { Search } from 'lucide-react';
import './index.css';

interface colors {
    color1:color,
    color2:color,
    color3:color,
    color4:color,
    color5:color,
}
interface color {
    hex: string,
    contrast: string,
}

function RandomScheme () {
    
    let [colors, setColors] = React.useState<colors>({
        color1: {hex: '#212529', contrast: "#FFFFFF"},
        color2: {hex: '#343a40', contrast: "#FFFFFF"},
        color3: {hex: '#495057', contrast: "#FFFFFF"},
        color4: {hex: '#6c757d', contrast: "#000000"},
        color5: {hex: '#adb5bd', contrast: "#000000"},
    });

    React.useEffect(() => {
        let one = document.getElementById('color1') as HTMLDivElement;
        let two = document.getElementById('color2') as HTMLDivElement;
        let three = document.getElementById('color3') as HTMLDivElement;
        let four = document.getElementById('color4') as HTMLDivElement;
        let five = document.getElementById('color5') as HTMLDivElement;

        one.style.backgroundColor = colors.color1.hex;      one.style.color = colors.color1.contrast;
        two.style.backgroundColor = colors.color2.hex;      two.style.color = colors.color2.contrast;
        three.style.backgroundColor = colors.color3.hex;    three.style.color = colors.color3.contrast;
        four.style.backgroundColor = colors.color4.hex;     four.style.color = colors.color4.contrast;
        five.style.backgroundColor = colors.color5.hex;     five.style.color = colors.color5.contrast;

    }, [colors])

    let handleApi = (val:string) => fetch(`https://www.thecolorapi.com/scheme?hex=${val}&count=5&mode=monochrome`) //fix this 
        .then(res => res.json())
            .then(data => {
                console.log(data);
                setColors({
                    color1: {hex:data.colors[0].hex.value, contrast: data.colors[0].hex.contrast},
                    color2: {hex:data.colors[1].hex.value, contrast: data.colors[1].hex.contrast},
                    color3: {hex:data.colors[2].hex.value, contrast: data.colors[2].hex.contrast},
                    color4: {hex:data.colors[3].hex.value, contrast: data.colors[3].hex.contrast},
                    color5: {hex:data.colors[4].hex.value, contrast: data.colors[4].hex.contrast},
                })
            });
            
    let handleOnClick = () => {
        let inputElement = document.querySelector('[aria-label="color-input-text"]') as HTMLInputElement;
        if((inputElement.value.length > 7)){
            alert("Uhh hex code please?")
            return
        }
        let value = /^#?([a-f\d]{6})$/i.exec(inputElement.value)!;
        handleApi(value[1]);
        
    }
    
    let handleColorChange = () => {
        let inputPickerElement = document.querySelector('[aria-label="color-input-picker"]') as HTMLInputElement;
        let inputTextElement = document.querySelector('[aria-label="color-input-text"]') as HTMLInputElement;
        
        inputTextElement.value = inputPickerElement.value;
    }

    return (
        <div className='h-dvh lg:h-[73.5%] pt-5 bg-colors-background
                        grid grid-cols-1 grid-rows-[90%,10%]'
        > 
            <div className='
                w-full lg:w-5/6 mx-0 lg:mx-auto
                grid grid-rows-5 grid-cols-1 lg:grid-rows-1 lg:grid-cols-5
                text-2xl border-y-2 border-zinc-900'
            >
                <div id='color1' className='flex place-items-center h-full p-5'><p>{colors.color1.hex}</p></div>
                <div id='color2' className='flex place-items-center h-full p-5'><p>{colors.color2.hex}</p></div>
                <div id='color3' className='flex place-items-center h-full p-5'><p>{colors.color3.hex}</p></div>
                <div id='color4' className='flex place-items-center h-full p-5'><p>{colors.color4.hex}</p></div>
                <div id='color5' className='flex place-items-center h-full p-5'><p>{colors.color5.hex}</p></div>
            </div>
            <div className='
                w-full lg:w-3/6 mx-0 lg:mx-auto px-3 
                grid grid-rows-1 grid-cols-[60%,40%]
                place-items-center'
            >
                <input type="text" aria-label='color-input-text'
                    placeholder='#FFFFFF' 
                    className='h-2/4 lg:h-5/6 w-5/6 border-b-2 border-zinc-500 placeholder:italic focus-visible:outline-none focus:font-semibold' />
                <div className='flex place-items-center h-1/2 lg:h-5/6 w-full lg:w-1/2 mr-5 lg:mr-auto border-2 border-zinc-500 rounded-sm'>
                    <input 
                        type="color" 
                        aria-label='color-input-picker' 
                        className='w-2/4 h-full bg-zinc-400'
                        onChange={handleColorChange}
                    />
                    <button title='color-input-button' 
                        className='w-2/4 h-full bg-zinc-400'
                        onClick={handleOnClick}>
                        <Search className='mx-auto' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RandomScheme;