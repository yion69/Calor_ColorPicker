    import React,{useEffect, useState} from 'react';
    import Card from './modules/Card';
    import RecentCard from './modules/RecentCard';
    import SearchBar from './modules/SearchBar';
    import { Star, Search, RotateCcw } from 'lucide-react';
    import './index.css';

    function ColorDisplay () {
        
        let [color, setColor] = useState('#FFFFFF');
        let [colorRgb, setColorRgb] = useState('255,255,255')
        let [colorHsl, setColorHsl] = useState( 0 + '°,' + 0 + '%,' + 0 + '%')
        let [addedColor, setAddedColor] = useState(['#000000',]);
        let [recentColor, setRecentColor] = useState([{
            hex: '#000000',
            rgb: '0,0,0',
            hsl: 0 + '°,' + 0 + '%,' + 0 + '%',
        }]);
        let inputValue = document.getElementById('colorValue');

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

                setRecentColor (rc => [...rc,
                    {
                        hex: val,   
                        rgb: `${r},${g},${b}`,
                        hsl:  h + '°,' + s + '%,' + l + '%',
                    }
                ])
                console.log(recentColor);
            }
            else { 
                console.log('error value does not match')
            }
        }

        function handleColorReset (event) {
            setColor( c => c = '#FFFFFF');
            setColorRgb (rc => rc='255,255,255');
            setColorHsl (hsl => hsl=( 0 + '°,' + 0 + '%,' + 0 + '%'))
            inputValue.value = '#FFFFFF';
            console.log(color, colorRgb, inputValue.value); 
        }

        function handleColorAdd () {setAddedColor( a => [...a, color])}
        function removeColorAdd (index) {setAddedColor(addedColor.filter((_,i)=> i !== index));}
        function removeRecentColor (index) {setRecentColor(recentColor.filter((_,i) => i !== index))}
        
        let [searchBarValue, setSearchBarValue] = useState('');
        function handleSearchBar(event) {
            let tempval = event.target.value;
            setSearchBarValue( ssv => ssv=tempval);
        }

        function searchBarDisplay(event){
            if(window.screen.width < 500){
                let searchbar = document.querySelector('.searchbar');
                let btn =  document.querySelector('#recentBtn');
                let btn2 =  document.querySelector('#favouriteBtn');
                {searchbar.style.display === "block" ? searchbar.style.display = 'none' : searchbar.style.display = 'block'}
                if(searchbar.style.display === "block"){
                    btn.style.display = 'none'; 
                    btn2.style.diaply = 'none';
                }
                btn.style.display = 'block'
                btn2.style.display = 'block'
            }
            else{
                console.log(searchBarValue);
                searchBarAdd(searchBarValue);
                let colorSearchbar = document.querySelector('#color-searchbar')
                colorSearchbar.value = '';
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

        function cycleRecentAndFavourite(){
            let favourite = document.querySelector('.favourite-card');
            let recent = document.querySelector('.recent-card');
            if(recent.style.display === "block"){
                favourite.style.display = 'block';
                recent.style.display = 'none';
            }
            else {
                favourite.style.display = 'none';
                recent.style.display = 'block';
            }
        }

        return(
            <div className='z-10 min-h-dvh lg:min-h-[73.6%] lg:h-[73.6%] flex flex-col md:flex-col lg:flex-row bg-colors-background'>
                <div className='w-11/12 md:w-6/12 lg:w-2/6 lg:mx-[250px] lg:mr-5 mx-auto my-5 md:my-auto lg:my-auto p-5 lg:p-10 min-h-[27rem] h-[35rem] lg:h-[27rem] bg-colors-primary rounded-lg drop-shadow-lg border-2 border-colors-accent'>
                    <div className='w-full h-[75%] lg:h-4/6 mx-auto rounded-md border-colors-accent border-2' style={{backgroundColor: color}}></div>
                    <div className='flex place-content-center mt-3 mb-3 p-3 bg-colors-secondary bg-opacity-60 rounded-md'>
                        <p
                            type="text"
                            id='input-text-hex'
                            onClick={cycleColorValue} 
                            className='h-9 p-1 text-center font-light text-lg rounded-md text-colors-text2 bg-colors-secondary border-2 border-colors-accent shadow-md' 
                        >{color}</p>
                        <p  
                            type="text"
                            id='input-text-rgb'
                            onClick={cycleColorValue} 
                            className='h-9 p-1 text-center font-light text-lg rounded-md text-colors-text2 bg-colors-secondary border-2 border-colors-accent' 
                        >{colorRgb}</p>
                    <p  
                            type="text"
                            id='input-text-hsl' 
                            onClick={cycleColorValue}
                            className='h-9 p-1 text-center font-light text-lg rounded-md text-colors-text2 bg-colors-secondary border-2 border-colors-accent' 
                        >{colorHsl}</p>
                    </div>
                    <div className='flex place-content-center p-2 bg-colors-secondary bg-opacity-60 rounded-md'>
                        <input
                            type="color" 
                            id='colorValue'
                            onChange={handleColorChange} 
                            className='w-24 lg:w-20 h-[32px] mr-1 md:mr-0 lg:-mr-1 px-1 border-2 border-colors-accent rounded-md bg-colors-secondary' //ml-[53px]
                        />
                        { window.screen.width > 500 ?
                            <div className='w-[44%] ml-auto mr-1'>
                                <input
                                    type="text"
                                    id='color-searchbar'
                                    onChange={handleSearchBar}
                                    className='w-full h-[30px] mt-[1px] px-3 rounded-md bg-colors-secondary border-2 border-colors-accent placeholder:text-colors-text placeholder:font-light font-light text-colors-text2'
                                    placeholder='eg.#FFFFFF'
                                />
                            </div> :
                            null
                        }
                        <button 
                            onClick={()=>searchBarDisplay()} 
                            className='btn h-8 w-24 lg:w-10 bg-colors-secondary border-2 border-colors-accent rounded-md text-colors-text2'>
                                <Search className='svg-refresh mx-auto' />
                        </button>
                        <SearchBar
                            add={searchBarAdd } 
                        />
                        <button 
                            onClick={()=>handleColorAdd()} 
                            className='btn h-8 w-24 lg:w-10 ml-1 bg-colors-secondary border-2 border-colors-accent rounded-md text-colors-text2' >
                                <Star className='mx-auto'/>
                        </button>

                        <button 
                            onClick={()=>handleColorReset()} 
                            className='btn h-8 w-24 lg:w-10 ml-1 mr-[10px] bg-colors-secondary border-2 border-colors-accent rounded-md text-colors-text2'>
                                <RotateCcw className='svg-refresh mx-auto' />
                        </button>
                    </div>
                </div>

                <div className='favourite-card w-11/12 md:w-6/12 lg:w-2/6 lg:mx-0 mx-auto my-5 md:my-auto lg:my-auto p-5 lg:p-10 min-h-[15rem] h-[30rem] lg:h-[27rem] bg-colors-primary rounded-lg shadow-2xl border-2 border-colors-accent'>

                    <h3 className='h-10 w-full mt-auto -mb-1 py-1 px-5 tracking-widest text-lg  text-colors-text2 font-light bg-colors-accent rounded-t-md'>Favourite
                    </h3>
                    <div id='added-color' className='z-0 w-full h-[85%] lg:h-[87%] border-2 border-colors-accent rounded-md rounded-t-none overflow-y-scroll scroll-smooth bg-colors-secondary bg-opacity-80'>
                        {addedColor.map((e, index) => 
                            <Card
                                key={index}
                                value={e} 
                                moveUp={()=>handleMoveUp(index)} 
                                moveDown={()=>handleMoveDown(index)} 
                                remove={()=>removeColorAdd(index)} />
                        )}
                    </div>

                    <button id='recentBtn' className='btn btnCard z-0 min-h-10 lg:h-8 w-24 lg:w-32 my-1 ml-[35%] tracking-widest border-2 border-colors-accent rounded-md bg-colors-secondary text-colors-text2' onClick={cycleRecentAndFavourite}>
                        Recent
                    </button>
                </div>  

                <div className='recent-card w-11/12 md:w-6/12 lg:w-2/6 lg:mx-0 mx-auto my-5 md:my-auto lg:my-auto p-5 lg:p-10  min-h-[20rem] h-[30rem] lg:h-[27rem] bg-colors-primary rounded-lg shadow-2xl border-2 border-colors-accent'>
                    <h3 className='h-10 w-full mt-auto -mb-1 py-1 px-5 tracking-widest text-lg  text-colors-text2 font-light bg-colors-accent rounded-t-md'>Recent
                    </h3>
                    <div id='added-color' className='w-full h-[85%] lg:h-[87%] border-2 border-colors-accent rounded-md rounded-t-none overflow-y-scroll scroll-smooth bg-colors-secondary bg-opacity-80'>
                        {recentColor.map((e,index)=>
                            <RecentCard
                                key={index}
                                value = {e}
                                remove={()=>removeRecentColor(index)}
                            />
                        )}
                    </div>
                    <button id='favouriteBtn' className='btnCard z-10 btn min-h-10 lg:h-8 w-24 lg:w-32 my-1 ml-[35%] tracking-widest border-2 border-colors-accent rounded-md bg-colors-secondary text-colors-text2' onClick={cycleRecentAndFavourite}>
                        Favourite
                    </button>
                </div>

            </div>
        )
        
    }
    export default ColorDisplay;