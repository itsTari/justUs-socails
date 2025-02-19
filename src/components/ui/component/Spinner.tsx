import  ClipLoader  from "react-spinners/ClipLoader"

function Spinner({ color="#4338ca"}) {
    const override = {
        display:'block',
        margin: '100px auto'
    }
  return (

       <ClipLoader
        color={color}
        cssOverride={override}
        size={150}
      />
    
  )
}

export default Spinner
