import React, { useEffect, useState } from 'react'

export const FormUploadImage = ({ image, setPreview, preview, setImage, imageChange, setImageChange }) => {
    
    useEffect(() => {
        if (!image) {
          setPreview(undefined)
          return
        }

        console.log(typeof image)
        if(typeof image === 'string') {
            setPreview(image)
        } else {
            const objectUrl = URL.createObjectURL(new Blob([image]), {type: "application/zip"})
            setPreview(objectUrl)
        }

      }, [image, setPreview])

    return (
        <form action="" onClick={() => document.querySelector(".input-field").click()} style={{ margin: 5 }} className={`flex flex-col border-2 ${preview ? 'border-none' : 'border-gray-300'} border-dashed rounded-md justify-center items-center max-w-[550px] min-h-[400px] h-full px-2 cursor-pointer`}>
            <input type='file' accept='image/*' className='input-field hidden ' onChange={(evt) => { setImage(evt.target.files[0]) }} />
            { preview
                ? <img src={preview} alt="recipe pic" />
                : (<div className='flex-col w-full flex justify-center items-center'>
                    <div className='text-lg mb-6 text-gray-800 font-medium w-[150px] flex-wrap gap-x-2 flex items-center justify-center'>Select <span className='text-cyan-600'> file</span> to upload</div>
                    <div className='text-sm text-gray-400'>Supports: JPEG,G</div>
                </div>
                )
            }
        </form>
    )
}
