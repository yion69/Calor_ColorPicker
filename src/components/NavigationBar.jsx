import './index.css'

function NavigationBar () {
    
    return (
        <div className='w-100 h-24 flex flex-col place-content-center place-items-center bg-matcha-400 text-matcha-100'>
            <h3 className='text-3xl font-bold drop-shadow-xl'>Color Picker <span className='text-sm'>V2</span></h3>
            <ul className='flex pt-2 space-x-10 drop-shadow-xl text-md'>
                <li className='transition 200ms hover:scale-110 hover:text-white hover:font-bold'><a href="#">Home</a></li>
                <li className='transition 200ms hover:scale-110 hover:text-white hover:font-bold'><a href="#">Random Palatte</a></li>
                <li className='transition 200ms hover:scale-110 hover:text-white hover:font-bold'><a href="#">Contact</a></li>
            </ul>
        </div>
    )
}
export default NavigationBar;