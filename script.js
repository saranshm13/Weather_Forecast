const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get("/", function(req, res){
    res.redirect("https://weather-5vjm.vercel.app/");
    
    
});
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "89605f9e9aaa7edd3b1908b22624f45b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
  
  https.get(url, function(response) {
    let data = "";
    
    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      const wd = JSON.parse(data);
      const temp = wd.main.temp;
      const desc = wd.weather[0].description;
      const icon = wd.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<h1>" + temp + "</h1>");
      res.write("<img src=" + imgURL + ">");
      res.send();
    });
  });
});


app.listen(3500, function(){
    console.log("server is running on port 3500.");
})


// const query="London";
//     const apiKey="89605f9e9aaa7edd3b1908b22624f45b";
//     const unit="metric";
//     const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&Units="+unit+"&appid="+ apiKey ;
//     https.get(url, function(response){
//         console.log(response.statusCode);
//         response.on("data", function(data){
//             const wd=JSON.parse(data);
//             const temp=wd.main.temp;
//             const desc=wd.weather[0].description;
//             const icon=wd.weather[0].icon;
//             const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
//             res.write("<p>The weather is currently"+desc+"</p>");
//             res.write("<h1>"+temp+"</h1>");
//             res.write("<img src="+imgURL+ ">");
//             res.send();
//         })
//     })