// GeoNames 
const GeoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const GeoNamesKey = '&username=bashayeralghamdi';
// Weatherbit 
const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherKey = '&key=59ba2634f98646c48467c1e38307c9ed';
// Weatherbit 
const pixabayUrl = 'https://pixabay.com/api/?key=';
const pixabayKey = '17359711-a002fc4a207918abf29f5d635';

// Submit button
const submitbutton = document.getElementById('submit')
document.addEventListener('DOMContentLoaded', function () {
  submitbutton.addEventListener('click', handleSubmit);
});

// Main function
function handleSubmit(event) {
  event.preventDefault()
  
  const city = document.getElementById('city').value;
  const leavingdate = document.getElementById('leaving').value;
  const returningdate = document.getElementById('returning').value;

const geonamesApi= getdata(GeoNamesUrl+city+GeoNamesKey)
  .then(function (geonamesdata) {

    const lat = geonamesdata.geonames[0].lat;
    const lng = geonamesdata.geonames[0].lng;

    const weatherApi = getdata(weatherUrl+ '&lat=' + lat + '&lon=' + lng+ '&start_date='+ leavingdate + '&end_date'+ returningdate +'&units=I'+ weatherKey)
    .then(function (weatherdata) {

      getImage(pixabayUrl + pixabayKey + "&q=" + city + "&image_type=photo")

      .then(function (image) {
        postdata('http://localhost:8030/add', {
          'Image': image,
          country: geonamesdata.geonames[0].countryName,
          latitude: lat,
          longitude: lng,
          status: weatherdata.data[0].weather.description,
        })
        updateUI(image);
      })
    });
  })
}
// Get api data
const getdata = async (url='')=>{
  const response = await fetch(url)
  try {
    const data = await response.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}
// Get picture from pixabay api
const getImage = async (pixabayUrl) => {
  const res = await fetch(pixabayUrl);
  try {
      let picture = await res.json();
      const image = picture.hits[0].webformatURL;
      return image;

  } catch (error) {
      console.log('Error:', error);
  }
} 
// Post data
const postdata = async ( url = '', data = {})=>{
  const response = await fetch(url ,{
      method: 'POST',
      credentials: 'same-origin', 
      headers: {
      'Content-Type': 'application/json',
  },
      body: JSON.stringify(data)
  });
  try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}
// For update UI 
const updateUI = async (url) => {
  const request = await fetch('http://localhost:8030/all');
  try {
    const allData = await request.json();
    document.getElementById('country').innerHTML = allData.country;
    document.getElementById('status').innerHTML = allData.status;
    document.getElementById('latitude').innerHTML = allData.latitude;
    document.getElementById('longitude').innerHTML = allData.longitude;
    document.getElementById('image').setAttribute('src', url);
  }
  catch (error) {
    console.log('error', error);
  }
}
export { handleSubmit }