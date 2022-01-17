export const paypalConfig = {
    'mode': `${process.env.PAYPAL_MODE}`, 
    'client_id': `${process.env.PAYPAL_CLIENT_ID}`,
    'client_secret': `${process.env.PAYPAL_CLIENT_SECRETKEY}`
}
export const paypalUrls = {
    return: "http://localhost:5000/api/payment/success",
    cancel: "http://localhost:5000/api/payment/cancel"
}