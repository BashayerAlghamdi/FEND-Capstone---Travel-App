// GeoNames 
const GeoNamesUrl = 'http://api.geonames.org/searchJSON?q=';
const GeoNamesKey = '&username=bashayeralghamdi';

// Weatherbit 
const WeatherbitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const WeatherbitKey = '59ba2634f98646c48467c1e38307c9ed';

// pixabay
const pixabayUrl = 'https://pixabay.com/api/?';
const pixabayKey = '17359711-a002fc4a207918abf29f5d635'

const submitbutton = document.getElementById('submit');
//document.getElementById('submit').addEventListener('click', handleSubmit);
document.addEventListener('DOMContentLoaded', function(){
    submitbutton.addEventListener('click', handleSubmit);
 });

// Search Function
function handleSubmit(event){
    const city = document.getElementById("city").value;
    
    getgeonames(GeoNamesUrl+city+GeoNamesKey)
    .then(function(data){
        console.log(data);
        //postdata('/add', )
        //.then(updateUI())  
    })

    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value; 
   
   // const latitude = 
   // const longitude = 


}

// Get GeoNames data
const getgeonames = async (GeoNamesUrl)=>{

    const response = await fetch(GeoNamesUrl)
    try {
      const data = await response.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
    }
}
// Get Weatherbit

// Get pixabay

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
/*
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();

    }catch(error){
      console.log("error", error);
    }
}*/
export{ handleSubmit}