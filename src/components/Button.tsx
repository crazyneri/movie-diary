import {ButtonProps} from "../api/types/buttonProps";

function Button(props: ButtonProps)
{
    const {children, type, ...rest} = props;
    let btnClass = 'rounded-full px-10 py-1.5 ';
    if(type === 'primary')
    {
       btnClass += 'bg-sky-500 hover:bg-sky-700';
    }


    return (<button {...rest} className={btnClass}>{children}</button>)
}

export default Button;