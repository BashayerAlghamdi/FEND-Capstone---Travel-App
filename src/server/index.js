// GeoNames 
const GeoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const GeoNamesKey = 'bashayeralghamdi';

// Weatherbit 
const WeatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const WeatherbitKey = '59ba2634f98646c48467c1e38307c9ed';

// pixabay
const pixabayUrl = 'https://pixabay.com/api/?key';
const pixabayKey = '17359711-a002fc4a207918abf29f5d635'

const submitbutton = document.getElementById('submit');
document.addEventListener('DOMContentLoaded', function(){
    submitbutton.addEventListener('click', handleSubmit);
 });

// Main Function
function handleSubmit(event){
    const city = document.getElementById("city").value;
    const leavingdate = document.getElementById("leaving").value;
    const returningdate = document.getElementById("returning").value;

   const geonamesApi= getdata(GeoNamesUrl+city+'&username='+GeoNamesKey)
   .then(function(geonamesdata){
    const lat = geonamesApi.geonames[0].lat;
    const lng = geonamesApi.geonames[0].lng;

    const weatherApi = getdata(WeatherbitUrl+ '&lat=' + lat + '&lon=' + lng+ '&start_date='+ leavingdate + '&end_date='+ returningdate +'&key'+ WeatherbitKey)
   })
   .then(function(weatherdata){
     const pixabayApi = getdata(pixabayUrl + pixabayKey + '&q=' + city + '&image_type=photo')
   })
   .then(function(img){
    postdata('/add', {
      'img': pixabayApi,
      country: geonamesApi.geonames[0].countryName,
      place: weatherApi.data[0].city_name,
      latitude: weatherApi.data[0].min_temp,
      longitude: weatherApi.data[0].max_temp,
      startdate: startdate,
      enddate: enddate
    })
   }).then(updateUI(img))  
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
// Update UI
const updateUI = async (data) => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('country').innerHTML = allData.country;
      document.getElementById('place').innerHTML = allData.place;
      document.getElementById('latitude').innerHTML = allData.latitude;
      document.getElementById('longitude').innerHTML = allData.longitude;
      document.getElementById('startdate').innerHTML = allData.startdate;
      document.getElementById('enddate').innerHTML = allData.enddate;
      document.getElementById('image').setAttribute('src', img);
    }catch(error){
      console.log("error", error);
    }
}
export{ handleSubmit}
