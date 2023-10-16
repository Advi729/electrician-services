  // format time
  export default function formatTimeIndianStandardWithAMPM(timeString) {

    // console.log('timestring->', timeString.split(':'));
    let [hours, minutes] = timeString?.split(':');
    let ampm = 'AM';

    // Convert hours to an integer
    const hoursInt = parseInt(hours, 10);

    // Check if it's afternoon (PM)
    if (hoursInt >= 12) {
      ampm = 'PM';

      // If it's after 12 PM, subtract 12 from hours to get 12-hour format
      if (hoursInt > 12) {
        hours = (hoursInt - 12).toString().padStart(2, '0');
      }
    }

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }