import  {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

const FileUploader = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps()} className='flex flex-col bg-n-7 p-4 rounded-2xl cursor-pointer '>
      <input {...getInputProps()}  className='cursor-pointer'/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p className='text-n-3'>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader