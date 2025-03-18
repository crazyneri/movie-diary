
// export interface ButtonProps extends React.PropsWithChildren{
//     type: string;
//     // onClick: (event:React.MouseEvent<HTMLButtonElement>) => void;
//
// }

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">{
    type: string;
    children: React.ReactNode;
}