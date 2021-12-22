import dynamic from "next/dynamic";
import {ErrorBoundary} from 'react-error-boundary'
import ErrorFallback from "./ErrorFallback";
// import {Suspense, lazy} from 'react'
// import { Title } from 'https://main--stupefied-kare-218880.netlify.app/remoteEntry.js'

const DynamicComponent = dynamic( async() => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return await import('next2/sampleComponent')
}, {
    ssr:false,
    suspense:false,
    loading:({error})=> {
      if(error) {
        console.log('Error: ',error)
        return <div>Terjadi Kesalahan</div>
      }
      return <div>Sedang Loading</div>
    }
  })



  const ErrorHandler = ({error, info}) =>{
    console.log('ERROR COMPONENT: ',error)
  }

  const Judul = () =>{
      return(
          <ErrorBoundary fallback={ErrorFallback} onError={ErrorHandler}>
              {/* <div>Hallo</div> */}
            <DynamicComponent/>
              
            {/* <Title /> */}
            
        </ErrorBoundary>
      )
  }

  export default Judul