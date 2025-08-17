import React from 'react';

const FAQs = () => {
    return (
        <section className="my-25">
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto ">

                <div className='text-center'>
                    <h2 className="text-2xl font-semibold sm:text-5xl">Frequently Asked Questions</h2>
                    <p className="mt-4 mb-8">
                        Find answers to common questions about TourNest, bookings, tour guides, and more.
                    </p>
                </div>


                <div className="space-y-4">

                    <details className="w-full bg-base-200 rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600 font-semibold">
                            How do I book a trip through TourNest?
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                            Simply navigate to the desired trip package, click on “View Package,” then confirm your booking by selecting a guide and preferred date.
                        </p>
                    </details>

                    <details className="w-full bg-base-200 rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600 font-semibold">
                            Can I become a tour guide on this platform?
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                            Yes! If you're passionate about guiding travelers, go to your dashboard and apply under the "Join as Tour Guide" section.
                        </p>
                    </details>

                    <details className="w-full bg-base-200 rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600 font-semibold">
                            Is payment secured on TourNest?
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                            Absolutely. We use industry-standard encryption and Stripe for secure payment processing.
                        </p>
                    </details>

                    <details className="w-full bg-base-200 rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600 font-semibold">
                            Can I cancel or change my booking?
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                            You can manage your bookings through your dashboard. However, cancellation policies may vary depending on the tour guide.
                        </p>
                    </details>

                    <details className="w-full bg-base-200 rounded-lg">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600 font-semibold">
                            What happens after I submit a story?
                        </summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">
                            Your story will be reviewed by our moderators. Once approved, it will be published in the Tourist Stories section.
                        </p>
                    </details>

                </div>
            </div>
        </section>
    );
};

export default FAQs;
