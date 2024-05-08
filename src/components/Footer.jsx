import './index.css'
import { AtSign, Linkedin, Github, Facebook } from 'lucide-react';

function Footer() {
    return(
        <div className="w-full h-24 bg-colors-background text-center overflow-hidden">
            <div className='flex flex-col lg:flex-row w-[90%] h-14 border-t-2 border-colors-secondary mx-auto'>
                <p className='mt-auto p-2 text-sm text-slate-600'>
                    &copy; Calor by 
                    <b className='text-[17px] text-black'> Yion </b>
                    (smol brain developer)
                </p>
                <div className='flex h-10 w-[13%] ml-20 lg:ml-auto mt-auto mr-1 p-3 space-x-5'>
                    <a href="mailto:thutanaing.personal@gmail.com" className='contact-btn'><AtSign /></a>
                    <a href="www.linkedin.com/in/thuta-naing-83b5222b0" className='contact-btn'><Linkedin /></a>
                    <a href="https://github.com/yion69" className='contact-btn'><Github /></a>
                    <a href="https://www.facebook.com/thuta.naing.353?mibextid=LQQJ4d" className='contact-btn'><Facebook /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;