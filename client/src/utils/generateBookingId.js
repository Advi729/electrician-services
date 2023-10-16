export default function generateBookingId() {
    let orderId = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 10; i++) {
      orderId += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    const timestamp = Date.now().toString();
    orderId += timestamp;

    return orderId;
  };