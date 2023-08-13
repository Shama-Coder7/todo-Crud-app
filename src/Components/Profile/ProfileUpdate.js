import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { loginSuccess } from '../utils/authSlice';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { storage } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../Navbar/Navbar';
import './Profile.css';
import { v4 } from 'uuid';

const ProfileUpdate = ({ inputs, title, updateUserProfileImage }) => {
  const [userProfileImage, setUserProfileImage] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [newDisplayName, setNewDisplayName] = useState('');
  const [file, setFile] = useState('');
  const [data, setData] = useState({});

  const handleDisplayNameUpdate = () => {
    if (newDisplayName) {
      updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      }).then(() => {
        dispatch(loginSuccess(auth.currentUser));
        setNewDisplayName('');
      });
    }
  };

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const imagesListRef = ref(storage, 'images/');
  const handleImageUpdate = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
        updateProfile(auth.currentUser, {
          photoURL: url,
        }).then(() => {
          dispatch(loginSuccess(auth.currentUser)); 
        }); 
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, 'users', res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      await updateProfile(res.user, {
        displayName: data.displayName,
      });



      if (data.password) {
        await updatePassword(currentUser, data.password);
      }

      setData({});
    } catch (err) {
      console.log(err);
    }
  };



  const handlePasswordUpdate = () => {
    if (newPassword) {
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          setNewPassword('');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="profile">
      <Navbar currentUser={currentUser} userProfileImage={userProfileImage} />
      <div className="newContainer">
        <div className="top">
          <h1>Profile Update</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : currentUser?.photoURL ||
                    'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
            <input
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
            <button onClick={handleImageUpdate}>Upload Image</button>
          </div>
          <div className="right">
            
            <div className="formInput">
              <label>Change Password</label>
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" onClick={handlePasswordUpdate}>
                Update Password
              </button>
            </div>

            <form onSubmit={handleAdd}>
              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
