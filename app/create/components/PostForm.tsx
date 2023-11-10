"use client"
import { motion } from "framer-motion"
import { use, useEffect, useRef, useState } from "react";
import Carausel from "./Carausel";
import store from "@/lib/zustand";
import L from "leaflet"
import axios from "axios"
import Loading from "@/app/components/Loading";

export default function PostForm() {
  const emptyArray = [] as string[]
  const [loading, setloading] = useState(false)
  const { setErr, setErrText } = store()
  const tempLoc = {} as LocationType
  const [data, setData] = useState({ caption: "", tags: emptyArray, location: tempLoc, imgs: emptyArray, visibility: "public" })
  const handleChange = async (
    e:
      | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setData({ ...data, [e.target.id]: e.target.value });
    // setErr(false);
  };
  const texts = ["Bring Your Vision to Life", "Upload Your Masterpiece", "Craft Your Story", "Tag Your Skills", "Connect with Collaborators", "Choose Your Visibility", "Celebrate Your Success"]

  const [tagNames, setTagNames] = useState<String[]>([])
  const addTag = (user:User) => {
    const tag = (document.getElementById("tags") as HTMLInputElement)
    // const newTags = data.tags.push(tag)
    if (!data.tags.includes(user.id)){
      setData({ ...data, tags: [...data.tags, user.id] })
      setTagNames([...tagNames,user.name])
    }
    setUserList([])
    tag.value = ""
  }

  const removeTag = (RemoveIndex: Number) => {
    const filteredTags = data.tags.filter((element, index) => index != RemoveIndex)
    setData({ ...data, tags: filteredTags })
    const filteredTagNames = tagNames.filter((element, index) => index != RemoveIndex)
    setTagNames(filteredTagNames)
  }

  const removeImage = (imageIndex: Number) => {
    const filteredImgs = imgs.filter((element, index) => index !== imageIndex)
    setImgs(filteredImgs)
    const filteredImgFiles = imgFiles.filter((element, index) => index !== imageIndex)
    setImgFiles(filteredImgFiles)

  }

  const [locations, setlocations] = useState<LocationType[]>([])
  const searchLocation = async (address: string) => {
    const locationsResponse = await fetch(`https://geocode.maps.co/search?q={${address}}`)
    const locationData = await locationsResponse.json()
    setlocations(locationData)
  }
  useEffect(() => {
    if (locations.length > 0) {
      document.getElementById("selectLoc")?.click()
    }
  }, [locations])

  const fileSelect = useRef<HTMLInputElement>(null)
  const selectFile = () => {
    fileSelect?.current?.click()
  }

  const [imgs, setImgs] = useState<string[]>([])
  const [imgFiles, setImgFiles] = useState<Blob[]>([])
  const validateFileType = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e) {
      var selectedFile = e.target.files[0];
      var allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Invalid file type. Please upload a JPEG, PNG, or PDF file.');
        e.target.value = '';
      } else {
        const num = (e.target.files.length + imgs.length > 5) ? 6 - imgs.length : e.target.files.length
        for (let i = 0; i < num; i++) {
          console.log(imgs.length)
          if (imgs.length + i + 1 > 5) {
            setErrText("Maximum 5 images allowed in one post")
            setErr(true);
          } else {
            const img = ((URL.createObjectURL(e.target.files[i])))
            const imgFile = (e.target.files[i])
            if (!imgs.includes(img))
              setImgs((prev) => [...prev, img])
            if (!imgFiles.includes(imgFile))
              setImgFiles((prev) => [...prev, imgFile])
          }
        }
      }
    }
  }

  const [userList, setUserList] = useState<User[]>([])
  const findUsers = async(e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length>2){
    const userResp = await fetch("/api/user",{
      method:"POST",
      body : JSON.stringify({name:e.target.value})
    })
    const userData = await userResp.json()
    console.log(userData)
    setUserList(userData.users)
  }else{
    setUserList([])
  }
  }

  useEffect(() => {
    if (data.location.lat) {
      var container = L.DomUtil.get('map');

      if (container != null) {

        container._leaflet_id = null;

      }
      var map = L.map('map').setView([parseFloat(data.location.lat), parseFloat(data.location.lon)], 50);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      L.marker([parseFloat(data.location.lat), parseFloat(data.location.lon)]).addTo(map);
    }
  }, [data.location])

  // useEffect(() => {
  //   const submit = async()=>{
  //   if(data.imgs.length!==0){
  //     if(data.imgs.length===imgFiles.length){
  //       console.log(data)
  //       const resp = await fetch("/api/post",{
  //         method:"POST",
  //         body:JSON.stringify({...data})
  //       })
  //       const respData = await  resp.json()
  //       console.log(respData)
  //     }
  //   }
  // }
  // submit()
  // }, [data,imgFiles])
  

  const handleSubmit = async() => {
    setloading(true)
    const imgs=[] as string[]
    for(const file of imgFiles){
      const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.CLOUDINARY_PRESET as string);

        try {
            const response = await axios.post(
                process.env.CLOUDINARY_URL as string,
                formData
            );
            const responseData = await response.data
            console.log(responseData)
            imgs.push(responseData.url)
            // setData({...data, imgs:[...data.imgs,responseData.url]})
    }catch(err){
      console.log(err)
    }
  }
  setData({...data,imgs:imgs})
console.log(imgs)
console.log(imgFiles)
const resp = await fetch("/api/post",{
  method:"POST",
  body:JSON.stringify({caption:data.caption, imgs:imgs, location:data.location, tags:data.tags})
})
const respData = await  resp.json()
console.log(respData)
  }
  return loading?(
    <Loading/>
  ):
  (
    <div className=" flex w-full bg-slate-950 p-8 rounded-2xl justify-between items-start flex-row gap-5 ">
      <div className=" w-1/3 flex flex-col p-5  h-[60vh]">
        {imgs.length > 0 ?
          <div className=" flex flex-col gap-4">
            <Carausel imgs={imgs} removeImage={removeImage} />
            <button onClick={() => selectFile()} className=" w-full  bg-purple-600 text-slate-50 hover:bg-purple-50 hover:text-purple-500 border-2 border-purple-500 transition-all text-6xl rounded-2xl ">+</button>

          </div> :

          <button onClick={() => selectFile()} className=" w-full h-full bg-purple-600 text-slate-50 hover:bg-purple-50 hover:text-purple-500 border-2 border-purple-500 transition-all text-6xl rounded-2xl ">+</button>
        }
        <input ref={fileSelect} type="file" multiple={true} className=" hidden " onChange={(e) => validateFileType(e)}></input>

      </div>
      <div className=" flex flex-col w-full gap-4">
        <motion.div initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} className={` flex flex-col gap-2 w-full`}>
          <label className="{` px-4`}">Caption</label>
          <textarea
            required
            onChange={(e) => {
              handleChange(e);
            }}
            value={data.caption}
            id="caption"
            rows={10}
            className="{` w-full rounded-3xl text-black px-5 py-3"
            placeholder="Craft Your Story"
          ></textarea>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} className={` flex flex-col gap-2 w-full`}>
          <label className="{` px-4`}">Tag other Creators</label>

          <div className=" flex flex-row w-full h-fit gap-4">
            <input
                // required
                onChange={(e) => {
                  findUsers(e)
                }}
              id="tags"
              type="text"
              className="{` w-full rounded-full text-black px-5 py-3"
              placeholder="Connect with Collaborators"
            ></input>
            {/* <button onClick={() => addTag()} className=" px-4  rounded-full bg-purple-600 text-slate-50 hover:bg-purple-50 hover:text-purple-500 border-2 border-purple-500 transition-all">ADD</button> */}
          </div>
          {userList.length > 0 && <ul className="bg-white border rounded-lg text-slate-800 border-gray-100 w-full mt-2">
            {userList.map((user, index) => {
              return (
                <li onClick={() => { 
                  addTag(user)
                 }} key={user.id} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900 rounded-md">
                  <img className="absolute w-4 h-4 left-2 top-2" src="https://img.icons8.com/material-rounded/24/user.png" alt="marker" />
                  {user.name}
                </li>
              )
            })}

          </ul>}
          <div className=" flex flex-row gap-2 ">
            {tagNames.map((tag, index) => {
              return (
                <div key={index} className=" py-1 px-3 h-full rounded-full bg-purple-50 text-purple-500 border-2 text-sm border-purple-500 transition-all flex flex-row justify-center items-center gap-3"><h1>{tag}</h1>
                  <button onClick={() => removeTag(index)} className=" border-2 rounded-full border-purple-500"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className=" h-5 w-5 text-purple-500" x="0px" y="0px" viewBox="0 0 50 50">
                    <path d="M 14.40625 13 L 13 14.40625 L 23.625 25 L 13 35.59375 L 14.40625 37 L 25.0625 26.40625 L 35.6875 37 L 37.09375 35.59375 L 26.46875 25 L 37.09375 14.40625 L 35.6875 13 L 25.0625 23.59375 Z"></path>
                  </svg></button></div>
              )
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} className={` flex flex-col gap-2 w-full`}>
          <label className="{` px-4`}">Location</label>
          <input
            required
            onChange={(e) => {
              setData({...data,location:{} as LocationType})
              if (e.target.value.replaceAll(" ", "").length > 3) {
                searchLocation(e.target.value)
              } else {
                setlocations([])
              }
            }}
            
            id="location"
            type="text"
            className="{` relative w-full rounded-full text-black px-5 py-3"
            placeholder="Share the spot"
          ></input>
          {locations.length > 0 && <ul className="bg-white border rounded-lg text-slate-800 border-gray-100 w-full mt-2">
            {locations.map((loc, index) => {
              return (
                <li onClick={() => { setData({ ...data, location: loc });
                (document.getElementById("location") as HTMLInputElement).value=loc.display_name;
                setlocations([])
                 }} key={loc.place_id} className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900 rounded-md">
                  <img className="absolute w-4 h-4 left-2 top-2" src="https://img.icons8.com/material-rounded/24/marker.png" alt="marker" />
                  {loc.display_name}
                </li>
              )
            })}

          </ul>}
        </motion.div>
        {data.location.lat&&<div id="map" style={{ height: "180px" }}></div>}

            <button onClick={()=>{handleSubmit()}} className=" w-full py-2 flex justify-center items-center rounded-full bg-purple-600 text-slate-50 hover:bg-purple-50 hover:text-purple-500 border-2 border-purple-500 transition-all my-6">Post</button>
      </div>

    </div>
  )
}
