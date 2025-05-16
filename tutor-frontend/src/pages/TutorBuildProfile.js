// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/TutorBuildProfile.css';
// import Header from '../components/header.js';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function TutorBuildProfile() {
//     const [formData, setFormData] = useState({
//         bio: '',
//         subjects: [],
//         location: [],
//         language: [],
//         gender: '',
//         hourly_rate: ''
//     });

//     const [profilePic, setProfilePic] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [showErrorPopup, setShowErrorPopup] = useState(false);

//     const navigate = useNavigate();

//     // Handle checkbox changes for subjects, location, and language
//     const handleCheckboxChange = (e) => {
//         const { name, value, checked } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: checked
//                 ? [...prev[name], value] // Add the value if checked
//                 : prev[name].filter((item) => item !== value), // Remove the value if unchecked
//         }));
//     };

//     // Validate and handle profile picture upload
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];

//         if (file) {
//             const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//             const maxSize = 5 * 1024 * 1024; // 5MB file size limit

//             // Check file type
//             if (!allowedTypes.includes(file.type)) {
//                 setErrorMessage('Only JPG, JPEG, and PNG file types are allowed.');
//                 setShowErrorPopup(true);
//                 return;
//             }

//             // Check file size
//             if (file.size > maxSize) {
//                 setErrorMessage('File size must not exceed 5MB.');
//                 setShowErrorPopup(true);
//                 return;
//             }

//             setProfilePic(file);
//             setPreview(URL.createObjectURL(file));
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formDataToSend = new FormData();
//             const userId = localStorage.getItem('userId');

//             if (!userId) {
//                 setErrorMessage('User ID is missing. Please log in again.');
//                 setShowErrorPopup(true);
//                 return;
//             }

//             formDataToSend.append('user_id', userId);
//             formDataToSend.append('bio', formData.bio);
//             formDataToSend.append('subjects', formData.subjects.join(','));
//             formDataToSend.append('location', formData.location.join(','));
//             formDataToSend.append('language', formData.language.join(','));
//             formDataToSend.append('gender', formData.gender);
//             formDataToSend.append('hourly_rate', formData.hourly_rate);

//             if (profilePic) {
//                 formDataToSend.append('profilePic', profilePic);
//             }

//             const response = await fetch(`${API_BASE_URL}/api/tutor-profile/`, {
//                 method: 'POST',
//                 body: formDataToSend,
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 navigate('/tutor-landing');
//             } else {
//                 setErrorMessage(data.message || 'Something went wrong!');
//                 setShowErrorPopup(true);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setErrorMessage('An error occurred. Please try again.');
//             setShowErrorPopup(true);
//         }
//     };

//     // Close error popup
//     const closePopup = () => {
//         setShowErrorPopup(false);
//     };

//     return (
//         <div className="tutor-profile-page">
//             <Header />
//             <div className="form-container">
//                 <h2>Tutor Profile</h2>
//                 <p>Set up your tutor profile to connect with students!</p>

//                 <form id="tutor-profile-form" onSubmit={handleSubmit}>
//                     {/* Profile Picture Input */}
//                     <label htmlFor="profilePic">Profile Picture:</label>
//                     <input
//                         type="file"
//                         id="profilePic"
//                         name="profilePic"
//                         accept=".jpg,.jpeg,.png"
//                         onChange={handleFileChange}
//                     />
//                     {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}

//                     <label>Gender:</label>
//                     <div className="radio-group">
//                         {['Male', 'Female'].map((g) => (
//                             <div key={g}>
//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value={g}
//                                     checked={formData.gender === g}
//                                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                                     required
//                                 />
//                                 <label>{g}</label>
//                             </div>
//                         ))}
//                     </div>


//                     {/* Bio Input */}
//                     <label htmlFor="bio">Bio:</label>
//                     <textarea
//                         id="bio"
//                         name="bio"
//                         placeholder="Write a brief bio about yourself"
//                         value={formData.bio}
//                         onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//                         required
//                     ></textarea>

//                     {/* Subjects Checkboxes */}
//                     <label>Subjects:</label>
//                     <div className="checkbox-group">
//                         {['Math', 'English', 'Physics', 'Science', 'Chemistry', 'History', 'Art'].map((subject) => (
//                             <div key={subject}>
//                                 <input
//                                     type="checkbox"
//                                     name="subjects"
//                                     value={subject}
//                                     checked={formData.subjects.includes(subject)}
//                                     onChange={handleCheckboxChange}
//                                 />
//                                 <label>{subject}</label>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Location Checkboxes */}
//                     <label>Location:</label>
//                     <div className="checkbox-group">
//                         {['Seattle', 'Kirkland', 'Bellevue', 'Redmond', 'Kent', 'Renton', 'Lynnwood', 'Tukwila'].map((location) => (
//                             <div key={location}>
//                                 <input
//                                     type="checkbox"
//                                     name="location"
//                                     value={location}
//                                     checked={formData.location.includes(location)}
//                                     onChange={handleCheckboxChange}
//                                 />
//                                 <label>{location}</label>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Language Checkboxes */}
//                     <label>Language:</label>
//                     <div className="checkbox-group">
//                         {['English', 'Spanish', 'Japanese', 'Korean', 'Chinese', 'Russian'].map((language) => (
//                             <div key={language}>
//                                 <input
//                                     type="checkbox"
//                                     name="language"
//                                     value={language}
//                                     checked={formData.language.includes(language)}
//                                     onChange={handleCheckboxChange}
//                                 />
//                                 <label>{language}</label>
//                             </div>
//                         ))}
//                     </div>

//                     <label htmlFor="hourlyRate">Hourly Rate ($):</label>
//                     <input
//                         type="number"
//                         id="hourlyRate"
//                         name="hourly_rate"
//                         min="0"
//                         step="1"
//                         placeholder="Enter your rate"
//                         value={formData.hourly_rate}
//                         onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
//                     />


//                     {/* Submit Button */}
//                     <button type="submit">Save Profile</button>
//                 </form>
//             </div>

//             {/* Error Popup */}
//             {showErrorPopup && (
//                 <div className="error-popup">
//                     <div className="error-popup-content">
//                         <p>{errorMessage}</p>
//                         <button onClick={closePopup}>Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default TutorBuildProfile;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/header';
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   FormGroup,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   TextField,
//   Typography,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// function TutorBuildProfile() {
//   const [formData, setFormData] = useState({
//     bio: '',
//     subjects: [],
//     location: [],
//     language: [],
//     gender: '',
//     hourly_rate: '',
//   });

//   const [profilePic, setProfilePic] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showErrorPopup, setShowErrorPopup] = useState(false);

//   const navigate = useNavigate();

//   // Checkbox handler for subjects, location, language
//   const handleCheckboxChange = (e) => {
//     const { name, value, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: checked
//         ? [...prev[name], value]
//         : prev[name].filter((item) => item !== value),
//     }));
//   };

//   // File upload validation and preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//       const maxSize = 5 * 1024 * 1024;

//       if (!allowedTypes.includes(file.type)) {
//         setErrorMessage('Only JPG, JPEG, and PNG file types are allowed.');
//         setShowErrorPopup(true);
//         return;
//       }

//       if (file.size > maxSize) {
//         setErrorMessage('File size must not exceed 5MB.');
//         setShowErrorPopup(true);
//         return;
//       }

//       setProfilePic(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       const userId = localStorage.getItem('userId');

//       if (!userId) {
//         setErrorMessage('User ID is missing. Please log in again.');
//         setShowErrorPopup(true);
//         return;
//       }

//       formDataToSend.append('user_id', userId);
//       formDataToSend.append('bio', formData.bio);
//       formDataToSend.append('subjects', formData.subjects.join(','));
//       formDataToSend.append('location', formData.location.join(','));
//       formDataToSend.append('language', formData.language.join(','));
//       formDataToSend.append('gender', formData.gender);
//       formDataToSend.append('hourly_rate', formData.hourly_rate);

//       if (profilePic) {
//         formDataToSend.append('profilePic', profilePic);
//       }

//       const response = await fetch(`${API_BASE_URL}/api/tutor-profile/`, {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         navigate('/tutor-landing');
//       } else {
//         setErrorMessage(data.message || 'Something went wrong!');
//         setShowErrorPopup(true);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setErrorMessage('An error occurred. Please try again.');
//       setShowErrorPopup(true);
//     }
//   };

//   // Close popup
//   const closePopup = () => {
//     setShowErrorPopup(false);
//   };

//   // Checkbox options
//   const subjects = ['Math', 'English', 'Physics', 'Science', 'Chemistry', 'History', 'Art'];
//   const locations = ['Seattle', 'Kirkland', 'Bellevue', 'Redmond', 'Kent', 'Renton', 'Lynnwood', 'Tukwila'];
//   const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'Chinese', 'Russian'];

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         background: 'linear-gradient(to top, #b5f7f3, #d5f7f5, #fcfcfc)',
//       }}
//     >
//       <Header />

//       <Container
//         maxWidth="sm"
//         sx={{
//           flexGrow: 1,
//           py: 6,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" fontWeight={700} color="text.primary" mb={1}>
//           Tutor Profile
//         </Typography>
//         <Typography variant="body1" color="text.secondary" mb={4}>
//           Set up your tutor profile to connect with students!
//         </Typography>

//         <Box
//           component="form"
//           id="tutor-profile-form"
//           onSubmit={handleSubmit}
//           sx={{
//             width: '100%',
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 3,
//           }}
//         >
//           {/* Profile Picture */}
//           <FormControl>
//             <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Profile Picture:</FormLabel>
//             <Button variant="outlined" component="label" sx={{ width: 'fit-content' }}>
//               Upload Image
//               <input
//                 type="file"
//                 accept=".jpg,.jpeg,.png"
//                 hidden
//                 onChange={handleFileChange}
//               />
//             </Button>
//             {preview && (
//               <Avatar
//                 src={preview}
//                 alt="Profile Preview"
//                 sx={{ width: 120, height: 120, mt: 2, mx: 'auto', boxShadow: 1 }}
//                 variant="circular"
//               />
//             )}
//           </FormControl>

//           {/* Gender Radio Buttons */}
//           <FormControl required>
//             <FormLabel sx={{ fontWeight: 'bold' }}>Gender:</FormLabel>
//             <RadioGroup
//               row
//               name="gender"
//               value={formData.gender}
//               onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//             >
//               {['Male', 'Female'].map((g) => (
//                 <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
//               ))}
//             </RadioGroup>
//           </FormControl>

//           {/* Bio */}
//           <TextField
//             id="bio"
//             name="bio"
//             label="Bio"
//             placeholder="Write a brief bio about yourself"
//             multiline
//             minRows={4}
//             required
//             value={formData.bio}
//             onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//           />

//           {/* Subjects Checkboxes */}
//           <FormControl component="fieldset" sx={{ mb: 2 }}>
//             <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Subjects:</FormLabel>
//             <FormGroup row>
//               {subjects.map((subject) => (
//                 <FormControlLabel
//                   key={subject}
//                   control={
//                     <Checkbox
//                       name="subjects"
//                       value={subject}
//                       checked={formData.subjects.includes(subject)}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label={subject}
//                 />
//               ))}
//             </FormGroup>
//           </FormControl>

//           {/* Location Checkboxes */}
//           <FormControl component="fieldset" sx={{ mb: 2 }}>
//             <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Location:</FormLabel>
//             <FormGroup row>
//               {locations.map((loc) => (
//                 <FormControlLabel
//                   key={loc}
//                   control={
//                     <Checkbox
//                       name="location"
//                       value={loc}
//                       checked={formData.location.includes(loc)}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label={loc}
//                 />
//               ))}
//             </FormGroup>
//           </FormControl>

//           {/* Language Checkboxes */}
//           <FormControl component="fieldset" sx={{ mb: 2 }}>
//             <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Language:</FormLabel>
//             <FormGroup row>
//               {languages.map((lang) => (
//                 <FormControlLabel
//                   key={lang}
//                   control={
//                     <Checkbox
//                       name="language"
//                       value={lang}
//                       checked={formData.language.includes(lang)}
//                       onChange={handleCheckboxChange}
//                     />
//                   }
//                   label={lang}
//                 />
//               ))}
//             </FormGroup>
//           </FormControl>

//           {/* Hourly Rate */}
//           <TextField
//             id="hourlyRate"
//             name="hourly_rate"
//             label="Hourly Rate ($)"
//             type="number"
//             inputProps={{ min: 0, step: 1 }}
//             placeholder="Enter your rate"
//             value={formData.hourly_rate}
//             onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
//           />

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             size="large"
//             sx={{ mt: 4, alignSelf: 'center', px: 10 }}
//           >
//             Save Profile
//           </Button>
//         </Box>
//       </Container>

//       {/* Error Popup */}
//       <Dialog open={showErrorPopup} onClose={closePopup}>
//         <DialogTitle color="error">Error</DialogTitle>
//         <DialogContent>
//           <Typography color="error" fontWeight="bold">
//             {errorMessage}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closePopup} variant="contained" color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default TutorBuildProfile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Checkbox,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function TutorBuildProfile() {
  const [formData, setFormData] = useState({
    bio: '',
    subjects: [],
    location: [],
    language: [],
    gender: '',
    hourly_rate: '',
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Only JPG, JPEG, and PNG file types are allowed.');
        setShowErrorPopup(true);
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage('File size must not exceed 5MB.');
        setShowErrorPopup(true);
        return;
      }

      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setErrorMessage('User ID is missing. Please log in again.');
        setShowErrorPopup(true);
        return;
      }

      formDataToSend.append('user_id', userId);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('subjects', formData.subjects.join(','));
      formDataToSend.append('location', formData.location.join(','));
      formDataToSend.append('language', formData.language.join(','));
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('hourly_rate', formData.hourly_rate);

      if (profilePic) {
        formDataToSend.append('profilePic', profilePic);
      }

      const response = await fetch(`${API_BASE_URL}/api/tutor-profile/`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/tutor-landing');
      } else {
        setErrorMessage(data.message || 'Something went wrong!');
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setShowErrorPopup(true);
    }
  };

  const closePopup = () => {
    setShowErrorPopup(false);
  };

  const subjects = ['Math', 'English', 'Physics', 'Science', 'Chemistry', 'History', 'Art'];
  const locations = ['Seattle', 'Kirkland', 'Bellevue', 'Redmond', 'Kent', 'Renton', 'Lynnwood', 'Tukwila'];
  const languages = ['English', 'Spanish', 'Japanese', 'Korean', 'Chinese', 'Russian'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to top, #b5f7f3, #d5f7f5, #fcfcfc)',
      }}
    >
      <Header />

      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={700} color="text.primary" mb={1}>
          Tutor Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Set up your tutor profile to connect with students!
        </Typography>

        <Box
          component="form"
          id="tutor-profile-form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Box className="centered-group">
            <FormControl>
              <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Profile Picture:</FormLabel>
              <Button variant="outlined" component="label" sx={{ width: 'fit-content' }}>
                Upload Image
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {preview && (
                <Avatar
                  src={preview}
                  alt="Profile Preview"
                  className="profile-preview"
                  sx={{ mt: 2 }}
                />
              )}
            </FormControl>

            <FormControl required sx={{ mt: 3 }}>
              <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Gender:</FormLabel>
              <RadioGroup
                row
                className="radio-group"
                name="gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                {['Male', 'Female'].map((g) => (
                  <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <FormControl>
            <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Bio:</FormLabel>
            <textarea
              id="bio"
              name="bio"
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Write a brief bio about yourself"
            />
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Subjects:</FormLabel>
            <FormGroup row>
              {subjects.map((subject) => (
                <FormControlLabel
                  key={subject}
                  control={
                    <Checkbox
                      name="subjects"
                      value={subject}
                      checked={formData.subjects.includes(subject)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={subject}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Location:</FormLabel>
            <FormGroup row>
              {locations.map((loc) => (
                <FormControlLabel
                  key={loc}
                  control={
                    <Checkbox
                      name="location"
                      value={loc}
                      checked={formData.location.includes(loc)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={loc}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel sx={{ fontWeight: 'bold', mb: 1 }}>Language:</FormLabel>
            <FormGroup row>
              {languages.map((lang) => (
                <FormControlLabel
                  key={lang}
                  control={
                    <Checkbox
                      name="language"
                      value={lang}
                      checked={formData.language.includes(lang)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={lang}
                />
              ))}
            </FormGroup>
          </FormControl>

          <TextField
            id="hourlyRate"
            name="hourly_rate"
            label="Hourly Rate ($)"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            placeholder="Enter your rate"
            value={formData.hourly_rate}
            onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{ mt: 4, alignSelf: 'center', px: 10 }}
          >
            Save Profile
          </Button>
        </Box>
      </Container>

      <Dialog open={showErrorPopup} onClose={closePopup}>
        <DialogTitle color="error">Error</DialogTitle>
        <DialogContent>
          <Typography color="error" fontWeight="bold">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        <Footer />
    </Box>
  );
}

export default TutorBuildProfile;

