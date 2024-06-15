import React from 'react'
import ReactProfile, { ALL_FILTERS } from "react-profile";
import "react-profile/themes/default.min.css";
export const ProfilePicture = ({circularCrop,src,hide}) => {
    // https://github.com/mdjfs/react-profile?tab=readme-ov-file#example
    const ccrop = circularCrop
    const handleDone = (obj) => {
        console.log(obj.getDataURL())
        hide(true)
    }

// onDone?: (exportObject?: EXPORT_OBJECT) => void

// Handler when the user finishes editing. The EXPORT_OBJECT has the following methods:

// getCanvas() -> get canvas object
// getBlob() (async) -> get blob
// getDataURL() -> get data url
// getImageFromBlob() (async) -> get HTMLImageElement from blob
// getImageFromDataURL() (async) -> get HTMLImageElement from blob
  return (
     <ReactProfile cropOptions={{circularCrop: ccrop ,aspect:1}} src={src} filters={ALL_FILTERS} onCancel={()=>hide(true)} onDone={(obj)=>handleDone(obj)}/>
  )
}
