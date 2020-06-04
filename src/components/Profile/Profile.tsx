import React from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div>
            <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                    alt="logo"/>
            </div>
            <div>
                Ava + description
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile;