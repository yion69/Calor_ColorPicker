import * as React from 'react';
import './modules.css';

interface Props {
    name:string,
    hex:string,
}
 
interface State {
    cName:string,
    color:string,
}
 
export default class RandomCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            cName: props.name,
            color: props.hex,
        };

    }
    render() { 
        return ( 
            <div className='size-40 mx-1 lg:mx-3 my-1 border-2 border-colors-accent rounded-lg bg-colors-secondary'>
                <div className='w-full h-3/4 rounded-md rounded-b-none border-b-2 border-colors-accent' style={{backgroundColor: this.state.color}}></div>
                <div className='w-full h-[24.7%] text-center text-sm font-normal rounded-md bg-colors-secondary bg-opacity-80 text-colors-text2'>
                    <p className='-mb-1'>{this.state.cName}</p>
                    <p className=''>{this.state.color}</p>
                </div>
                
            </div>
         );
    }
}
 