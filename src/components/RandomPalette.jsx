import React,{ useState, useEffect } from "react";
import { RefreshCcw, Plus } from "lucide-react";
import RandomCard from "./modules/RandomCard.tsx";
import './index.css';
import RecentCard from "./modules/RecentCard.jsx";
import Spinner from "./modules/Spinner.tsx";

export default class RandomPalette extends React.Component {
    
    constructor(){
        super();
     
        this.state ={
            color: {
                name: 'black',
                hex: '#000000',
                rgb: 'rgb(0, 0, 0)',
                hsl: 'hsl(0, 0%, 0%)',
                cmyk: 'cmyk(0, 0, 0, 0)',
                contrast: '#FFFFFFF',        
                r: 0,
                g: 0,
                b: 0,
            },
            recentColor : [],
            contrast: false,
            screenMobile: (window.screen.width < 500), 
        }

        this.btnCLick = this.btnCLick.bind(this);
        this.btnReset = this.btnReset.bind(this);
        this.loadComponent = this.loadComponent.bind(this);
        this.setRecentColor = this.setRecentColor.bind(this);
        this.cycleComponent = this.cycleComponent.bind(this);
        this.checkTextContrast = this.checkTextContrast.bind(this);
    }

    btnCLick () {
        this.loadComponent(true);
        fetch('https://www.thecolorapi.com/random')
        .then((response) => response.json())
            .then((data)=> {
                this.setState({
                    color : {
                        name: data.name.value,
                        hex: data.hex.value,
                        rgb: data.rgb.value,
                        hsl: data.hsl.value,
                        cmyk: data.cmyk.value,
                        contrast: data.contrast.value,
                        r: data.rgb.r,
                        g: data.rgb.g,
                        b: data.rgb.b,
                    }
                })
                this.checkTextContrast();
                this.setRecentColor();
            })
                .finally(() => {
                    this.loadComponent(false);
                })
    }
 
    loadComponent (res) {
        let component = document.getElementById('spinner');
        res ? 
            component.style.display = 'block' :
            component.style.display = 'none';
    }

    async checkTextContrast () {
        
        let tempR = this.state.color.r;
        let tempG = this.state.color.g;
        let tempB = this.state.color.b;
        let luminance = 0.2126 * tempR + 0.7152 * tempG + 0.0722 * tempB;
        let threshold = luminance > 0.5 ? 186 : 100;

        if(luminance > threshold){
            this.setState({contrast: true})
        }
        else {
            this.setState({contrast: false})
        }
    }

    setRecentColor () {
        this.setState(prev => ({
            recentColor: [...prev.recentColor,{name: this.state.color.name, hex: this.state.color.hex}]
        }))
    }

    btnReset () {
        this.setState({
            color: {
                name: 'black',
                hex: '#000000',
                rgb: 'rgb(0, 0, 0)',
                hsl: 'hsl(0, 0%, 0%)',
                cmyk: 'cmyk(0, 0, 0, 0)',        
                r: 0,
                g: 0,
                b: 0,
            },
        })
    }

    cycleComponent () {
        let main = document.getElementById('main');
        let recent = document.getElementById('recent');

        if(main.style.display === 'block'){
            main.style.display = 'none'; recent.style.display = 'block'
        } 
        else {
            main.style.display = 'block'; recent.style.display = 'none'
        }
    }

    render(){
        return(
            <div className=" h-dvh lg:h-[73.6%] flex flex-col lg:flex-row place-items-center place-content-center space-x-0 lg:space-x-5">
                <div id="main" className="h-[90%] lg:h-[80%] w-[90%] lg:w-1/3 bg-colors-primary border-[3px] border-colors-accent rounded-md" style={{display: 'block'}}>
                    <div 
                        className="flex flex-col place-items-center place-content-center min-h-[25rem] lg:min-h-[21.75rem] w-[95%] mx-auto my-3 rounded-md border-[3px] border-colors-accent overflow-hidden" style={{backgroundColor: this.state.color.hex}}
                        onClick={this.btnCLick}
                    >
                    { this.state.color.contrast === '#000000' ? 
                        <>
                            <h3 className="mt-5 text-5xl text-colors-text font-light">{this.state.color.hex}</h3>
                            <p className="text-2xl text-colors-text font-light">{this.state.color.name}</p>
                        </>
                        :
                        <>
                            <h3 className="mt-5 text-5xl text-colors-text2 font-light">{this.state.color.hex}</h3>
                            <p className="text-2xl text-colors-text2 font-light">{this.state.color.name}</p>
                        </>
                    }
                        <div id="spinner" className="absolute flex place-content-center h-[400px] w-[350px] overflow-hidden ">
                            <div className="relative flex place-content-center h-full mx-auto bg-opacity-80 bg-black rounded-md">
                                <Spinner />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row place-content-center place-items-center space-x-0 lg:space-x-2 space-y-3 lg:space-y-0 w-full h-[30%] lg:h-14 text-center">
                        {
                            window.screen.width < 500 ?
                                <div className="flex h-10 min-h-10 w-32  ml-auto mr-5 space-x-2">
                                    <button className="h-10 w-20 place-items-center place-content-center flex border-2 border-colors-accent bg-colors-secondary rounded-md" onClick={this.btnCLick}>
                                        <Plus />
                                    </button>
                                    <button className="h-10 w-20 place-items-center place-content-center flex border-2 border-colors-accent bg-colors-secondary rounded-md" onClick={this.btnReset}>
                                        <RefreshCcw />
                                    </button>
                                </div>
                            : null   
                        }
                        <p className="h-10 w-[90%] lg:w-[30%] p-1 text-colors-text2 font-semibold lg:font-thin bg-colors-secondary border-2 border-colors-accent rounded-md">{this.state.color.rgb}</p>
                        <p className="h-10 w-[90%] lg:w-[30%] p-1 text-colors-text2 font-semibold lg:font-thin bg-colors-secondary border-2 border-colors-accent rounded-md">{this.state.color.hsl}</p>
                        <p className="h-10 w-[90%] lg:w-[30%] p-1 text-colors-text2 font-semibold lg:font-thin bg-colors-secondary border-2 border-colors-accent rounded-md">{this.state.color.cmyk}</p>
                    </div>
                </div>
                
                <div id="recent" className="w-[90%] lg:w-[50%] h-[90%] lg:h-[80%] flex flex-col bg-colors-primary border-[3px] border-colors-accent rounded-md">
                    <div className="w-full h-[13%] bg-colors-secondary border-b-2 border-colors-accent">
                        <h3 className="h-full w-44 my-auto p-3 font-light text-2xl text-center text-colors-text2">Recent Colors</h3>
                    </div>
                    <div id="random-recent-cards" className="h-[87%] lg:h-[85%] w-full flex flex-wrap place-items-start place-content-start overflow-y-scroll">
                        {
                            this.state.recentColor.map((e,index) =>
                                <RandomCard
                                    key = {index}
                                    name = {e.name}
                                    hex = {e.hex}
                                />
                            )
                        }
                    </div>
                </div>
                {
                    window.screen.width < 500 ?
                    <button className=" w-32 h-7 -mb-5 mt-3 pr-3 rounded-md text-colors-text font-semibold underline underline-offset-4" onClick={this.cycleComponent}>Recent Colors</button>
                    :
                     null
                }
            </div>
        )
    }
}
