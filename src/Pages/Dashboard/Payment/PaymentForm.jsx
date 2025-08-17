import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const PaymentForm = () => {
 const stripe = useStripe();
    const elements = useElements();
    const axiosInstance = useAxios();

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();
    const { id } = useParams(); // bookingId
    const navigate = useNavigate();

    //console.log('Booking ID from URL:', id);

    const [booking, setBooking] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState('');

    // Fetch booking by ID
    useEffect(() => {
        axiosSecure.get(`/bookings/${id}`).then(res => setBooking(res.data));
    }, [id, axiosSecure]);

    // Create PaymentIntent
    useEffect(() => {
        if (booking?.price) {
            axiosSecure.post('/create-payment-intent', {
                amount: booking.price * 100, 
            })
            .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [booking, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        // On success: save payment and update booking
        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                email: user.email,
                bookingId: id,
                transactionId: paymentIntent.id,
                amount: booking.price,
                paidAt: new Date().toISOString(),
            };

            try {
                await axiosSecure.post('/payments', paymentInfo);
                await axiosSecure.patch(`/bookings/${id}`, {
                    transactionId: paymentIntent.id
                });

                setSuccess('Payment successful!');
                setError('');
                setProcessing(false);
                navigate('/dashboard/myBookings'); 
            } catch (err) {
                console.error(err);
                setError('Failed to update booking or save payment');
                setProcessing(false);
            }
        }
    };

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Pay BDT {booking?.price}</h2>
                <CardElement className='p-3 border rounded-md' />
                <button type='submit' disabled={!stripe || processing || !clientSecret} className='btn btn-primary w-full'>
                    {processing ? 'Processing...' : `Pay BDT ${booking?.price}`}
                </button>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-600 font-medium'>{success}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;