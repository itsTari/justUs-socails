// import { useUserContext } from '@/context/AuthContext'
import  {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'

type FileUploaderProps = {
    fieldChange:(FILES: File[]) => void
    mediaUrl:string 
  }
const ProfilePicUpload = ({fieldChange, mediaUrl}: FileUploaderProps) => {
    // const {user} = useUserContext()
    const [fileUrl, setFileUrl] = useState(mediaUrl)
    const [file, setFile] = useState<File[] | null >(null)
    const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept:{'image/*':['.png', '.jpeg', '.jpg']}})
  return (
    <div {...getRootProps()} className=''>
      <input {...getInputProps()}  className='cursor-pointer'/>
      {
        fileUrl ?
        (<div className='flex items-center gap-4'>
            <img src={fileUrl} alt='image' className='rounded-full object-cover w-16 h-16 cursor-pointer'/>
            <h3 className='text-indigo-700 cursor-pointer'>Change Profile Photo</h3>  
        </div>):(
          <div className='cursor-pointer'>
            <h3 className='text-indigo-700'>Change Profile Photo</h3>
          </div>
        )
      }
    </div>
  )
}

export default ProfilePicUpload