import {ButtonProps} from "../api/types/buttonProps";

function Button(props: ButtonProps)
{
    const {children, type, ...rest} = props;
    let btnClass = 'rounded-full px-10 py-1.5 cursor-pointer w-[90%] mt-[1rem] mb-[1rem] ';
    if(type === 'primary')
    {
       btnClass += 'bg-sky-500 hover:bg-sky-700 hover:text-white ';
    }


    return (<button {...rest} className={btnClass}>{children}</button>)
}

export default Button;