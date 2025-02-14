// import PropTypes from "prop-types";
// import className from 'classnames';
// import { twMerge } from 'tailwind-merge';
//
//
//
// function Button({
//                     children,
//                     primary,
//                     secondary,
//                     success,
//                     warning,
//                     danger,
//                     outline,
//                     rounded,
//                     ...rest
//                 })
// {
//
//     const classes = twMerge(className(
//         rest.className,
//         'flex items-center px-3 py-1.5 border',
//         {
//             'bg-blue-500 border-blue-500 text-white': primary,
//             'bg-gray-900 border-gray-900 text-white': secondary,
//             'bg-green-500 border-green-500 text-white': success,
//             'bg-yellow-400 border-yellow-400 text-white': warning,
//             'bg-red-400 border-red-400 text-white': danger,
//             'bg-white': outline,
//             'rounded-full': rounded,
//             'text-blue-500': outline && primary,
//             'text-gray-900': outline && secondary,
//             'text-green-500': outline && success,
//             'text-yellow-400': outline && warning,
//             'text-red-400': outline && danger,
//
//         })
//     );
//
//
//     // <button> === underlying element
//     // ...rest includes className --> overwrite it with our component's className after
//     return (<button {...rest} className={classes} >{children}</button>)
// }
// Button.propTypes = {
//     checkVariationValue: ({primary, secondary, success, warning, danger}) => {
//         const count = Number(!!primary)
//             + Number(!!secondary)
//             + Number(!!success)
//             + Number(!!warning)
//             + Number(!!danger)
//
//         if(count > 1)
//         {
//             return new Error('Only one of primary, secondary, success, warning, danger can be true');
//         }
//     },
// };
// export default Button;