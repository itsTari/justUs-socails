import  {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'

  type FileUploaderProps = {
    fieldChange:(FILES: File[]) => void
    mediaUrl:string
  }

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState('')
  const [file, setFile] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    // Do something with the files
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept:{'image/*':['.png', '.jpeg', '.jpg']}})
  return (
    <div {...getRootProps()} className='flex flex-col bg-n-7 p-4 rounded-2xl cursor-pointer '>
      <input {...getInputProps()}  className='cursor-pointer'/>
      {
        fileUrl ?
        (<div className='flex flex-1 justify-center w-full p-4 lg:p-8'>
            <img src={fileUrl} alt='image' className=''/>
            
        </div>):(
          <div className='flex items-center justify-center'>
            <h3>Drag n drop photo here</h3>

          </div>
        )
      }
    </div>
  )
}

export default FileUploader