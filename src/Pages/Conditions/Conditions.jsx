import React from 'react';

const Conditions = () => {
    return (
        <div>
             <div className=" mx-auto py-12 px-6 mt-35">
            <h1 className="text-5xl font-bold mb-6 text-center">Terms and Conditions</h1>

            <p className="mb-4">
                Welcome to <strong>TourNest</strong>. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
            <p className="mb-10">
                By using our platform, you accept these terms in full. If you disagree with any part of these terms, you must not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. User Accounts & Authentication</h2>
            <p className="mb-10">
                Users may create accounts using email/password or social login (Google/Firebase). You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Role-Based Access</h2>
            <p className="mb-10">
                TourNest offers different functionalities based on user roles: Tourist, Tour Guide, and Admin. Access to certain features may be restricted based on your role.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. Booking & Payments</h2>
            <p className="mb-10">
                Users can browse, book, and pay for tour packages through our platform. All payments are securely processed via Stripe. Bookings are subject to availability and confirmation from the assigned tour guide.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. User Content</h2>
            <p className="mb-10">
                Users may post travel stories, photos, and reviews. You retain ownership of your content but grant TourNest a license to display it on the platform. Offensive or illegal content is strictly prohibited.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Privacy</h2>
            <p className="mb-10">
                Your personal information is collected and processed according to our Privacy Policy. By using our services, you consent to the collection and use of your data as described.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
            <p className="mb-10">
                TourNest is not liable for any direct, indirect, or consequential damages arising from the use of our platform, including booking issues, travel disruptions, or third-party services.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Termination</h2>
            <p className="mb-10">
                We reserve the right to suspend or terminate accounts for violation of these terms or misuse of our services, without prior notice.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">9. Changes to Terms</h2>
            <p className="mb-10">
                TourNest may update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">10. Governing Law</h2>
            <p className="mb-10">
                These terms are governed by the laws of Bangladesh. Any disputes arising from these terms shall be resolved in the courts of Bangladesh.
            </p>


        </div>
        </div>
    );
};

export default Conditions;