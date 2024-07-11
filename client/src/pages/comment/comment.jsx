import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { HouseContext } from "../../context/houseContext";


function Comments (house) {
    const {updateInfo} = useContext(HouseContext)
    const houseId = house.house.id; 
    const comments = house.house.comments;
    const [newComment, setNewcomment] = useState()
    const past_house_comments = getExistingComments(comments)
    const [houseComments, setComments] = useState(past_house_comments)
    function getExistingComments (comments){
        const filteredComments = [];

        for (let coll = 0; coll < comments.length; coll++) {
        filteredComments.push((comments[coll]).text && (comments[coll]).text);
        }
        return (filteredComments)
    }

    const handleCommentSubmit = async (comment) =>{
        updateInfo()
        setComments([...houseComments, comment])
        try{
            const res = await axios.put ("http://localhost:3001/api/party/update-comments",{
                houseId:houseId,
                comment:{text:comment}
                
            })
            console.log("comments successfully added in comments")
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            {houseComments &&
                houseComments.map(comment => (
                    <p id = "comment">{comment}</p>
                )
            )}
            <div>
                <input 
                id = "newComment" 
                type="text" 
                placeholder="Enter your goofy ass comment"
                value={newComment}
                        onChange={(e) => setNewcomment(e.target.value)}
                ></input>
                <button type="submit" onClick={ async () => await handleCommentSubmit(newComment)}>vamos</button>
            </div>
        </div>
    )
    
}

export default Comments