import React from 'react';
import Header from '../components/header'; // Import the Header component
import Footer from '../components/footer';
import '../styles/TutorRequestReceived.css'; // Adjust path if needed

// function TutorRequestReceived() {
//     return (
//         <>
//             {/* Pass `hideApplyButton` as true to hide the "Apply as a Tutor" button */}
//             <Header hideApplyButton={true} />
//             <div className="tutor-request-received-page">
//                 <h1>We have received your request to become a tutor and sent you a confirmation email.</h1>
//                 <p>Please wait while we approve your request.</p>
//                 <Footer className="TutorRequestReceived-footer" />
//             </div>
//         </>

//     );
// }


// export default TutorRequestReceived;


function TutorRequestReceived() {
    return (
        <div className="page-container">
            <Header hideApplyButton={true} />
            <div className="tutor-request-received-page">
                <h1>We have received your request to become a tutor and sent you a confirmation email.</h1>
                <p>Please wait while we approve your request.</p>
            </div>
            <Footer className="TutorRequestReceived-footer" />
        </div>
    );
}

export default TutorRequestReceived;
