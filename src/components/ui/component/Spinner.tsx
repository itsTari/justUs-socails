import  ClipLoader  from "react-spinners/ClipLoader"

type spinnerProp ={
    size:number,
    color:string
}

function Spinner({ color="#4338ca", size} : spinnerProp) {
    const override = {
        display:'block',
        margin: 'auto'
    }
  return (

       <ClipLoader
        color={color}
        cssOverride={override}
        size={size}
      />
    
  )
}

export default Spinner
