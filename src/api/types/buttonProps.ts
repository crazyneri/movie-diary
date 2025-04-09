
// export interface ButtonProps extends React.PropsWithChildren{
//     type: string;
//     // onClick: (event:React.MouseEvent<HTMLButtonElement>) => void;
//
// }

// TODO find out how to correct this
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button">{
    type: string;
    children: React.ReactNode;
}