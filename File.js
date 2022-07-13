import { storage,uploadBytes,getDownloadURL,ref,listAll} from './Firestorage'
import {v4} from 'uuid';
import React ,{useState,useEffect} from 'react';
import Check from './Check';

function File(){

var t=localStorage.getItem('User');
    var m=null;
    const [imgLink,setimgLink]=useState("");
    const [image,setimage]=useState(null);
    const [imageList,setimages]=([]);
  
    const handleChange= e =>{
        if(e.target.files[0]){
        setimage(e.target.files[0]);
           }

          }

             const imageListRef=ref(storage,`image/${t}`);

                const upload=()=>{   /*Start upload*/

              
               const imageRef=ref(storage,`image/${t}/${image.name+v4()}`);
               uploadBytes(imageRef,image).then(()=>{
                alert("imageuploaded");
                // console.log(imageRef);
               });
                        
           
          
           

                           }   /*End  upload*/


             useEffect(()=>{
        
                listAll(imageListRef).then((response)=>{
                    // console.log(response.items[0]);
                    response.items.forEach((item)=>{
                   getDownloadURL(item).then((url)=>{
                    setimgLink(url);
                    // console.log(imgLink);
                 
                   });
                    });
                });
                // <Check/>

             
             },[upload]) ;   
             


           





return (
    <>
    
    <div style={{marginTop:"10%",padding:"0 10px"}}>
    <label for="image">
    <input type="file" name="image" id="image"  onChange={handleChange}   style={{display:"none",border:"1px solid red"}}/>
    <img src={imgLink} style={{borderRadius:"100%",height:"60px",width:"60px"}}/>
    </label>
</div>
<button  style={{borderRadius:"100px",fontWeight:"bold",border:"rgb(239, 243, 244)",padding:"3px 10px",marginLeft:"6px"}} type="button" onClick={upload}>Edit Profile</button>
  {/* <div>
<Check storageimgTransfer={imgLink}/>
</div>   */}
</>
);
    
}
export default File;

