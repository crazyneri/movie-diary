import {JSX} from 'react';
import {containerFlexCol} from "../classes/classes";
import {default as moreOptionsIcon} from '../assets/svg/more_options.svg';
export default function MoreOptions(props: {children: JSX.Element; isOpen: boolean; handleOpen: () => void})
{
    const {children, isOpen, handleOpen} = props;

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleOpen();
    }

    return <div className={containerFlexCol + ' gap-[0.5rem] justify-end'}>
    <button type="button" aria-label="More options" aria-haspopup="true" aria-expanded={isOpen} className="more-options" title="more options" onClick={handleClick}><img src={moreOptionsIcon} alt="more options icon"/></button>

        <div className="more-options__container">
            {isOpen && <div className="more-options__options">{children}</div>}
        </div>
    </div>
}