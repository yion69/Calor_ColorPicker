import * as React from 'react';
import './modules.css';

interface Props {
    name:string,
    hex:string,
    rgb:string,
    hsl:string,
}
 
interface State {
    cName:string,
    colorHex:string,
    colorRgb:string,
    colorHsl:string,
}
 
export default class RandomCardMobile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            cName: props.name,
            colorHex: props.hex,
            colorRgb: props.rgb,
            colorHsl: props.hsl,
        };

    }
    render() { 
        return ( 
            <div className='h-32 w-80 mx-3 my-2 border-2 border-colors-accent rounded-lg bg-colors-secondary'>
                <div className='w-full h-3/4 rounded-md rounded-b-none border-b-2 border-colors-accent' style={{backgroundColor: this.state.colorHex}}></div>
                <div className='flex place-content-center w-full h-[24.7%] text-center text-sm font-normal rounded-md bg-colors-secondary bg-opacity-80 text-colors-text2'>
                    <p className='h-full w-[35%] p-1 border-r-2 border-colors-accent'>{this.state.cName}</p>
                    <p className='h-full w-[30%] p-1'>{this.state.colorHex}</p>
                    <p className='h-full w-[40%] p-1'>{this.state.colorRgb}</p>
                </div>
            </div>
         );
    }
}