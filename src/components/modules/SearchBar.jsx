import React,{ useState } from 'react';
import { Search,XCircle } from "lucide-react";
import '../index.css';

function SearchBar (prop) {
    let [searchBarColor, setSearchBarColor] = useState('#000000');
    let add = ()=> prop.add(searchBarColor);

    function handleSearchBarInput (event) {
 
        let tempValue = event.target.value;
        let select = document.getElementById('selection');

        if(select.value === 'hex'){setSearchBarColor( sbc => sbc = tempValue.toUpperCase())};
        if(select.value === 'rgb'){
            if(tempValue.includes(',') && tempValue.length > 1){
                var rgb = tempValue.split(',');
                var r = rgb[0];
                var g = rgb[1];
                var b = rgb[2];
                tempValue = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
                setSearchBarColor( sbc => sbc = tempValue.toUpperCase());
            }
            else{
                event.target.placeholder = "Please input comma between each value";
                //make a breadcrumb to let the user know abt the comma
            }
        }
        if(select.value === 'hsl'){
            if(tempValue.length > 1 && tempValue.includes(',' || '%' || ' ')){
                var hsl = tempValue.split(/(?:,|%| )+/);
                var h = hsl[0];
                var s = hsl[1];
                var l = hsl[2];
          
                l /= 100;
                const a = s * Math.min(l, 1 - l) / 100;
                const f = n => {
                    const k = (n + h / 30) % 12;
                    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                    return Math.round(255 * color).toString(16).padStart(2, '0');   
                };
                var hslTemporary ="#"+`${f(0)}`+`${f(8)}`+`${f(4)}`;
                // const regex = new RegExp(/([#]{1}[A-F0-9]{3}|[A-F0-9]{6})\w+/g);
                // console.log(regex.test(hslTemporary));
                // var hslTemporary = hsl.concat('#',f(0),f(8),f(4)).join().match(',');
                setSearchBarColor( sbc => sbc = hslTemporary.toUpperCase());
                //error here the value is not string somehow
                // console.log(hslTemporary);
            }
            else {
                console.log('this time i want u u u u like a magnetic u u u u u u u u super iku u   ');
            }
        }
    }

    function removeSearchBar(){
        let searchbar = document.querySelector('.searchbar');
        searchbar.style.display = 'none';  
    }
    
    function resetInputBox(){
        let hex = document.getElementById('value-input-hex');
        let rgb = document.getElementById('value-input-rgb');
        let hsl = document.getElementById('value-input-hsl');
        hex.value = '';
        rgb.value = '';
        hsl.value = '';
    }
    function searchBtnFunctions(){
        resetInputBox();
        add();
    }
    function cycleSelectionValue() {
        let hex = document.getElementById('value-input-hex');
        let rgb = document.getElementById('value-input-rgb');
        let hsl = document.getElementById('value-input-hsl');
        let select = document.getElementById('selection');
        
        if(select.value === 'hex'){
            hex.style.display = 'block';
            rgb.style.display = 'none';
            hsl.style.display = 'none';
        }
        else if(select.value === 'rgb'){
            hex.style.display = 'none';
            rgb.style.display = 'block';
            hsl.style.display = 'none';
        }
        else if(select.value === 'hsl'){
            hex.style.display = 'none';
            rgb.style.display = 'none';
            hsl.style.display = 'block';

        }
        console.log(select.value);
    }

    return(
        <div className="searchbar z-20 fixed flex place-items-center -top-32 " style={{backgroundColor: "rgba(0,0,0,0.7)"}}>
            <div className="flex flex-col h-[15%] w-[90%] mt-10 mx-auto bg-colors-primary border-2 border-colors-accent rounded-lg">
                <button onClick={removeSearchBar}>
                    <XCircle 
                        size={25}
                        className="ml-auto mr-3 mt-2" 
                    />
                </button>
                <h3 className="-mt-2 text-center font-semibold text-colors-text font-mono">Search color</h3>
                <div className="flex w-11/12 h-12 mt-3 p-1">
                    <input
                        type="text"
                        id="value-input-hex"
                        onChange={handleSearchBarInput}
                        placeholder="eg.#FFFFFF" 
                        className="ml-6 p-5 h-10 w-9/12 font-semibold text-xl bg-colors-secondary border-2 border-colors-accent rounded-md rounded-r-none placeholder:text-colors-text2 placeholder:font-light shadow-xl"
                    />
                    <input
                        type="text"
                        id="value-input-rgb"
                        onChange={handleSearchBarInput}
                        placeholder="eg.255, 255, 255" 
                        className="ml-6 p-5 h-10 w-9/12 font-semibold text-xl bg-colors-secondary border-2 border-colors-accent rounded-md rounded-r-none placeholder:text-colors-text2 placeholder:font-light shadow-xl"
                    />
                    <input
                        type="text"
                        id="value-input-hsl"
                        onChange={handleSearchBarInput}
                        placeholder="eg. 0° 0% 0%" 
                        className="ml-6 p-5 h-10 w-9/12 font-semibold text-xl bg-colors-secondary border-2 border-colors-accent rounded-md rounded-r-none placeholder:text-colors-text2 placeholder:font-light shadow-xl"
                    />
                    <select 
                        id='selection' 
                        className='h-[43px] w-14 my-auto text-xs bg-colors-secondary text-colors-text2 font-normal border-2 border-l-0 border-colors-accent'
                        onChange={cycleSelectionValue}
                    >
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                        <option value="hsl">HSL</option>
                    </select>
                    <button className="btn h-[43px] w-14 mx-0 text-colors-text2 bg-colors-secondary rounded-r-lg shadow-xl border-2 border-l-0 border-colors-accent" onClick={searchBtnFunctions} id='searchBtn'>
                        <Search className="mx-auto"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;