import {ButtonProps} from "../api/types/buttonProps";

function Button(props: ButtonProps)
{
    const {children, type, ...rest} = props;
    let btnClass = 'rounded-full px-10 py-1.5 w-[90%] ';
    if(type === 'primary')
    {
       btnClass += ' btn--main btn--main-accent ';
    }

    if(type === 'cancel')
    {
        btnClass += 'bg-gray-400 hover:bg-gray-500 hover:text-white ';
    }

    if(type === 'danger')
    {
        btnClass += 'bg-red-300 hover:bg-red-500 hover:text-white ';
    }


    return (<button {...rest} className={btnClass}>{children}</button>)
}

export default Button;