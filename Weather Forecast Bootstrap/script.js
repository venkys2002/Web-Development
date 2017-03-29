//To check if all the form tabs are filled or not. on success, calls the validate function to make an ajax call.
$(document).ready(function() {
 $("#submit").click(function(){
   //alert("im here");
       var streetaddress_fill=false;
       var city_fill=false;
       var state_fill=false;

       var address="";
       var city="";
       var state="";
 $('input[id="addressid"]').each(function() {
     if($.trim($(this).val()) == ''){
         //$(this).css({ "border": "1px solid red"});
        $("#errorstreet").css('visibility', 'visible');
    }
     else{
         $(this).css({"border": ""});
         $("#errorstreet").css('visibility', 'hidden');
         streetaddress_fill=true;
         address=$("#addressid").val();
     }
});
     
$('input[id="cityid"]').each(function() {
    if($.trim($(this).val()) == ''){
        //$(this).css({"border": "1px solid red"});
        $("#errorcity").css('visibility', 'visible');
    }
    else{
        $(this).css({"border": ""});
        $("#errorcity").css('visibility', 'hidden');
        city_fill=true;
        city=$("#cityid").val();
    }           
});
     
$('select[type="state"]').each( function() {
    if($.trim($(this).val()) == 'null'){
        //$(this).css({ "border": "1px solid red"});
        $("#errorstate").css('visibility', 'visible');
    }
    else{
        $(this).css({ "border": ""});
        $("#errorstate").css('visibility', 'hidden');
        state_fill=true;
        state=$("#stateid").val();
    }
});

if(streetaddress_fill && city_fill && state_fill) 
{
    $.ajax({
        url: 'http://usc2015-env.elasticbeanstalk.com/',
        type: 'post',
        data: {
                address: $('#addressid').val(),
                city: $('#cityid').val(),
                state: $('#stateid').val(),
                degree: $('input[name=degree]:checked').val(),
                submit: $('#submit').val()
            },
        success: function(output) {
            transform(output);
        }
    });
}
}); // end of submit

$("#addressid").keyup( function() {
    if($.trim($(this).val()) == ''){
        //$(this).css({ "border": "1px solid red"});
        $("#errorstreet").css('visibility', 'visible');
    }
    else{
        $(this).css({ "border": ""});
        $("#errorstreet").css('visibility', 'hidden');
    }
});
    
$("#cityid").keyup( function() {
    if($.trim($(this).val()) == ''){
        //$(this).css({ "border": "1px solid red"});
        $("#errorcity").css('visibility', 'visible');
    }
    else{
        $(this).css({ "border": ""});
        $("#errorcity").css('visibility', 'hidden'); 
    }
}); 
    
$("#stateid").change( function() {
    if($.trim($(this).val()) == 'null'){
        //$(this).css({ "border": "1px solid red"});
        $("#errorstate").css('visibility', 'visible');
    }
    else{
        $(this).css({ "border": ""});
        $("#errorstate").css('visibility', 'hidden');
    }
});
});//end of document ready

//-------------------------------------------------------------------------------------------------------------------
//This function is called on click of submit button
function validate() 
{
    //alert("I am here");
    $.ajax({
        url: 'http://usc2015-env.elasticbeanstalk.com/',
        type: 'post',
        data: {
                address: $('#addressid').val(),
                city: $('#cityid').val(),
                state: $('#stateid').val(),
                degree: $('input[name=degree]:checked').val(),
                submit: $('#submit').val()
            },
        success: function(output) {
            transform(output);
        }
    });
}

//Clears the form and background data
function resetForm(frm_elements)
{
    //alert("Im here");
    document.getElementById("us").checked=true;
    for (i = 0; i < frm_elements.length; i++)
    {
        //alert(frm_elements.length);
        field_type = frm_elements[i].type.toLowerCase();
        switch (field_type)
        {
        case "text":
        case "password":
        case "textarea":
        case "hidden":
            frm_elements[i].value = "";
            break;
        case "select-one":
        case "select-multi":
            frm_elements[i].selectedIndex = 0;
            break;
        default:
            break;
        }
    }
    //$('#return').hide();
    document.getElementById("return").style.visibility="hidden";
    $('a[href="#page1"]').tab('show');
    document.getElementById("map").innerHTML=" ";
    $("#errorstate").css('visibility', 'hidden');
    $("#errorcity").css('visibility', 'hidden');
    $("#errorstreet").css('visibility', 'hidden');
}

function unit_temp(temp)
{
    //alert("I am here");
    if(document.getElementById("us").checked)
    {
        temp=temp+"&deg; F";
    }
    if(document.getElementById("si").checked)
    {
        temp=temp+"&deg; C  ";
    }
    return temp;
}

function unit_precip(precipitation1)
{
    var precip;
    if(document.getElementById("us").checked)
    {
        precipitation1=precipitation1;
    }
    if(document.getElementById("si").checked)
    {
        precipitation1=precipitation1 / 25.4;
    }
    
    //Mapping the precipitation values
    if(precipitation1>=0 && precipitation1<0.002)
        precip="None";
    if(precipitation1>=0.002 && precipitation1<0.017)   
        precip="Very Light";
    if(precipitation1>=0.017 && precipitation1<0.1)
        precip="Light";
    if(precipitation1>=0.1 && precipitation1<0.4)
        precip="Moderate";
    if(precipitation1>=0.4)
        precip="Heavy";
    
    return precip;
}

function unit_wind(wind)
{
    if(document.getElementById("us").checked)
    {
        wind=wind+" mph";
    }
    if(document.getElementById("si").checked)
    {
        wind=wind+" mpsec";
    }
    return wind;
}

function unit_dew(dew)
{
    if(document.getElementById("us").checked)
    {
        dew=dew+"&deg; F";
    }
    if(document.getElementById("si").checked)
    {
        dew=dew+"&deg; C";
    }
    return dew;
}

function unit_visi(visi)
{
    if(document.getElementById("us").checked)
    {
        visi=visi+" mi";
    }
    if(document.getElementById("si").checked)
    {
        visi=visi+" km";
    }
    return visi;
}

function unit_press(press)
{
    if(document.getElementById("us").checked)
    {
        press=press+" mb";
    }
    if(document.getElementById("si").checked)
    {
        press=press+" hPa";
    }
    return press;
}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	time1 = h + ':' + min + ' ' + ampm;
	return time1;
}

function map_icon(icon)
{
    //Associative array to map the images
    var image= [];
    image['clear-day'] = "clear.png";
    image['clear-night'] = "clear_night.png";
    image['rain'] = "rain.png";
    image['snow'] = "snow.png";
    image['sleet'] = "sleet.png";
    image['wind'] = "wind.png";
    image['fog'] = "fog.png";
    image['cloudy'] = "cloudy.png";
    image['partly-cloudy-day'] = "cloud_day.png";
    image['partly-cloudy-night'] = "cloud_night.png";
    
    return image[icon];
}

//function to create weather map
function create_weathermap(long,lat)
{
    //Center of map
    var lonlat = new OpenLayers.LonLat(long, lat);

    var map = new OpenLayers.Map("map");
    // Create OSM overlays
    var mapnik = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(long,lat).transform( fromProjection, toProjection);
    var zoom           = 5;
    
     var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );

    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
        {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );
    
    map.addLayers([mapnik, layer_precipitation, layer_cloud]);
    map.setCenter(position, zoom );
    
    /*try
    {
        map.addLayers([mapnik, layer_precipitation, layer_cloud]);
        map.setCenter(position, zoom );
        $('a[data-toggle="tab"]').off('shown.bs.tab');
    }
    catch(err)
    {
        document.getElementById("map").innerHTML=" ";
        $('a[data-toggle="tab"]').on('shown.bs.tab',function(e) {
            var target=$(e.target).attr("href");
            if((target== '#page1')) {
                create_weathermap(long,lat);
            }
        });
    } 
    */
}



//-----------------------------------------------------------------------------------------------------------------------
//This function is called on click of facebook icon to post the data to Facebook
function fb_post()
{
    //alert("I am here");
    var name="Current Weather in "+city + ", " + state;
    var description=" ";
    description+=weather_condition1+", "+temperature1;
    FB.ui(
    {
        method: 'feed',
        name:name,
        description:description,
        caption:"WEATHER INFORMATION FROM FORECAST.IO",
        picture: icon_img,
        link: 'http://forecast.io/',
    }, 
    function(response)
    {
        if(response && response.post_id)
        {
            alert("Posted Successfully");
        }
        else 
        {
            alert("Not Posted");
        }
    }
    ); 
}

window.fbAsyncInit = function() {
FB.init({
appId      : '1152751928086077',
xfbml      : true,
version    : 'v2.5'
});
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//-------------------------------------------------------------------------------------------------------------------------
function convertTime(time,timezone)
{
    var format = 'hh:mm A';
    var mytime = moment(time * 1000).tz(timezone).format(format);
      //  alert("myalert"+mytime)
    return mytime;
}
//------------------------------------------------------------------------------------------------------------------------

var degree,city,state,dir;
var weather_condition1,icon_img,temperature1;

//This function is called after the ajax call is successful and returns the JSON string
function transform(output)
{
    //alert("I am in Transform");
    document.getElementById("return").style.visibility="visible";
    $('a[href="#page1"]').tab('show');
    document.getElementById("map").innerHTML=" ";
    
    var json_o=JSON.parse(output);
    var tab;
    
    //get the city from form element
    city=document.getElementById("cityid").value;
    //get the state from form element
    var e = document.getElementById("stateid");
    state = e.options[e.selectedIndex].value;
    
    //get the degree value
    if (document.getElementById('us').checked) 
    {
        degree="&deg; F";
    }
    if (document.getElementById('si').checked) 
    {
        degree="&deg; C";
    }
    
//-----------------------------------------------------------------------------------------------------------------------
    //For Right Now Tab - the current weather data
    //Weather Condition
    if(json_o.currently.summary!=null)
        weather_condition1=json_o.currently.summary;
    else
        weather_condition1="NA";
    
    //Weather Temperature
    if(json_o.currently.temperature!=null)
    {
        temp=Math.round(json_o.currently.temperature);
        temperature1=unit_temp(temp);
    }
    else
        temperature1="NA";
    
    //Icon
    dir="http://cs-server.usc.edu:45678/hw/hw8/images/";
    
    if(json_o.currently.icon!=null)
    {
        //icon1=image[json_o.currently.icon]; 
        icon1=map_icon(json_o.currently.icon); 
        icon_img=dir+icon1;
    }
    else
        icon1="NA";
    
    //Precipitation
    if(json_o.currently.precipIntensity!=null)
    {
        precipitation1=unit_precip(json_o.currently.precipIntensity);
    }
    else
        precipitation1="NA";
    
    //Chance of Rain
    if(json_o.currently.precipProbability!=null)
    {
        rain1=Math.round(json_o.currently.precipProbability*100)+"%";
    }
    else
        rain1="NA";
    
    //Wind Speed
    if(json_o.currently.windSpeed!=null)
    {
        wind=Math.round(json_o.currently.windSpeed);
        wind_speed1=unit_wind(wind);
    }
    else
        wind_speed1="NA";

    //Dew Point
    if(json_o.currently.dewPoint!=null)
    {
        dew=Math.round(json_o.currently.dewPoint);
        dew_point1=unit_dew(dew);
    }
    else
        dew_point1="NA";
    
    //Humidity
    if(json_o.currently.humidity!=null)
    {
        humidity1=Math.round(json_o.currently.humidity*100)+"%";
    }
    else
        humidity1="NA";
    
    //Visibility
    if(json_o.currently.visibility!=null)
    {
        visi=Math.round(json_o.currently.visibility);
        visibility1=unit_visi(visi);
    }
    else
        visibility1="NA";
    
    //Sunrise
    if(json_o.daily.data[0].sunriseTime!=null)
    {
        //sunrise1=convertTimestamp(json_o.daily.data[0].sunriseTime);
        sunrise1=convertTime(json_o.daily.data[0].sunriseTime,json_o.timezone);
    }
    else
        sunrise1="NA";
    
    //Sunset
    if(json_o.daily.data[0].sunsetTime!=null)
    {
        //sunset1=convertTimestamp(json_o.daily.data[0].sunsetTime);
        sunset1=convertTime(json_o.daily.data[0].sunsetTime,json_o.timezone);
    }
    else
        sunset1="NA";
    
    if(json_o.daily.data[0].temperatureMax!=null)
    {
        tempMa=Math.round(json_o.daily.data[0].temperatureMax);
        tempMax=unit_temp(tempMa);
    }
    else
        tempMax="NA";
    
    if(json_o.daily.data[0].temperatureMin!=null)
    {
        tempMi=Math.round(json_o.daily.data[0].temperatureMin);
        tempMin=unit_temp(tempMi);
    }
    else
        tempMin="NA";
    
    var fb_icon="http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png";
    
    var text="<div class='table-responsive'>";
    text+="<table class ='table table-striped' style='margin:0px;'>";
    
    text+="<tr style='color:white;background-color:rgb(244,125,125)'>";
    text+="<td colspan='2'>";
    text+="<div class='col-md-6' ><p style='text-align:center;'><img id='img_fb' width='120px' height='120px' src='"+icon_img+"'></p></div>";
    
    text+="<div class='col-md-6' style='text-align:center'><span style='color:white;font-size:16px;font-weight:bold;'>"+weather_condition1+" in "+city+", "+state+"</span><br/>";
    
    text+="<span style='font-size:45pt'><b>"+temp+"</b><sup style='color:white;font-size:15px;font-weight:normal;vertical-align:super;'>"+degree+"</sup></span><br/>";
    
    text+="<span style='font-size:10pt;color:blue;font-weight:bold;'>"+"L:"+tempMa+"&deg;<sup style='vertical-align:super;'></sup></span><span style='color:black;'> | "+"</span>";
    
    text+="<span style='font-size:10pt;color:green;font-weight:bold;'>H:"+tempMi+"&deg;<sup style='vertical-align:super;'></sup></span>";
    
    text+="<span style='text-align:right;float:right;'><a href='javascript:fb_post();'><img src='"+fb_icon+"' alt='FB icon' width='30px' height='30px'></a></span>";
    
    text+="</div></td></tr>";
    
    text+="<tr class='active'><td>Precipitation</td><td>"+precipitation1+"</td></tr>";
    text+="<tr class='danger'><td>Chance of Rain:</td><td>"+rain1+"</td></tr>";
    text+="<tr class=\"active\"><td>Wind Speed:</td><td>"+wind_speed1+"</td></tr>";
    text+="<tr class=\"danger\"><td>Dew Point:</td><td>"+dew_point1+"</td></tr>";
    text+="<tr class=\"active\"><td>Humidity:</td><td>"+humidity1+"</td></tr>";
    text+="<tr class=\"danger\"><td>visibility:</td><td>"+visibility1+"</td></tr>";
    text+="<tr class=\"active\"><td>Sunrise:</td><td>"+sunrise1+"</td></tr>";
    text+="<tr class=\"danger\"><td>Sunset:</td><td>"+sunset1+"</td></tr>";
    
    text+="</table></div>";
    
    document.getElementById("RightNow").innerHTML=text;

//-------------------------------------------------------------------------------------------------------------------
    //Creating the weather map
    //Map will be loaded only when the rightnow tab is active
    /*if ($('#rightnow').parent().hasClass('active'))
    {
    */
        create_weathermap(json_o.longitude,json_o.latitude);
    //}
//--------------------------------------------------------------------------------------------------------------------  
    //24 Hours data calculation
    if(json_o.hourly.summary!=null)
        weather_condition2=json_o.hourly.summary;
    else
        weather_condition2="NA";

    //24 hour time
    var time = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].time!=null)
        {
            //time[i]=convertTimestamp(json_o.hourly.data[i+1].time);
            time[i]=convertTime(json_o.hourly.data[i+1].time,json_o.timezone);
        }
        else
            time[i]="NA";
    }

    //24 hour summary
    var icon = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].icon!=null)
        {
            icon1=map_icon(json_o.hourly.data[i+1].icon);
            icon[i]=dir+icon1;
        }
        else
            icon[i]="NA";
    }

    //24 hour Cloud cover
    var cloud = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].cloudCover!=null)
        {
            cloud[i]=Math.round(json_o.hourly.data[i+1].cloudCover*100)+"%";
        }
        else
            cloud[i]="NA";
    }

    //24 hour Temperature
    var temp = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].temperature!=null)
        {
            tempe=Math.round(json_o.hourly.data[i+1].temperature);
            temp[i]=unit_temp(tempe);
        }
        else
            temp[i]="NA";
    }

    //These needs to be put in glyphicons
    //24 hour Wind
    var wind = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].windSpeed!=null)
        {
            win=Math.round(json_o.hourly.data[i+1].windSpeed);
            wind[i]=unit_wind(win);
        }
        else
            wind[i]="NA";
    }

    //24 hour Humidity
    var humid = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].humidity!=null)
        {
            humid[i]=Math.round(json_o.hourly.data[i+1].humidity*100)+"%";
        }
        else
            humid[i]="NA";
    }

    //24 hour Visibility
    var visi = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].visibility!=null)
        {
            vis=Math.round(json_o.hourly.data[i+1].visibility);
            visi[i]=unit_visi(vis);
        }
        else
            visi[i]="NA";
    }

     //24 hour Pressure
    var press = [];
    for(i=0;i<24;i++)
    {
        if(json_o.hourly.data[i+1].pressure!=null)
        {
            press[i]=unit_press(json_o.hourly.data[i+1].pressure);
        }
        else
            press[i]="NA";
    }

    var text24="<table class=\"table\" style='margin:0px 0px 0px 0px'>";
    text24+="<tr style=\"color:white;background:#333399;\"> \
<th style=\"text-align:center;\">Time</th> \
<th style=\"text-align:center;\">Summary</th> \
<th style=\"text-align:center;\">Cloud Cover</th> \
<th style=\"text-align:center;\">Temp("+degree+")</th> \
<th style=\"text-align:center;\">View Details</th></tr>";
    for(i=0;i<24;i++)
    {
        text24+="<tr style=\"padding:0px;background-color:white;vertical-align: middle; height:60px\"><td style=\"text-align:center;\">"+time[i]+"</td> \
<td style=\"text-align:center;\"><img src='"+icon[i]+"' alt='Icon Pic' height=\"20px\" width=\"20px\"></td> \
<td style=\"text-align:center;\">"+cloud[i]+"</td><td style=\"text-align:center;\">"+temp[i]+"</td> \
<td style=\"text-align:center;\"> \
<a data-toggle='collapse' data-target='#demo"+i+"' class='accordion-toggle collapsed' aria-expanded='false'><span class=\"glyphicon glyphicon-plus\" style=\"color:blue;\"></span></a></td></tr> \
<tr><td colspan=\"5\" style=\"padding:0px;background-color:#F1F1F1;\"> \
<div id='demo"+i+"' class='accordion-body collapse' style=\"margin: 10px; height: 0px;\" aria-expanded='false'> \
<table class='table' style='table-layout:fixed;'> \
<tr><th class='text-center'>Wind</th> \
<th class='text-center'>Humidity</th> \
<th class='text-center'>Visibility</th> \
<th class='text-center'>Pressure</th></tr> \
<tr style=\"background-color:#F1F1F1;\"> \
<td class='text-center'>"+wind[i]+"</td> \
<td class='text-center'>"+humid[i]+"</td> \
<td class='text-center'>"+visi[i]+"</td> \
<td class='text-center'>"+press[i]+"</td> \
</tr></table></div></td></tr>";
    }
    document.getElementById("Next24").innerHTML=text24;

//--------------------------------------------------------------------------------------------------------------------
    //For Next7 days tab - Next 7 days weather data
    
    //convert the unix timestamp to get the month,day and date
    var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var daynames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
    var day = [];
    var month = [];
    var dd = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].time!=null)
        {
            var date = new Date(json_o.daily.data[i+1].time*1000);
            day[i] = daynames[date.getDay()];
            month[i] = monthNames[date.getMonth()];
            dd[i] = ('0' + date.getDate()).slice(-2);		// Add leading 0.
            //day3=json_o.daily.time;
        }
        else
        {
            day[i]="NA";
            month[i]="NA";
            dd[i]="NA";
        }
    }
    
    //Temp_Min_day
    var icon_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].time!=null)
        {
            icon3=map_icon(json_o.daily.data[i+1].icon);
            icon_day[i]=dir+icon3;
        }
        else
        {
            icon_day[i]="NA";
        }
    }
    
    //Temp_Min_day
    var tempMax_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].temperatureMax!=null)
        {
            tempMa=Math.round(json_o.daily.data[i+1].temperatureMax);
            tempMax_day[i]=unit_temp(tempMa);
        }
        else
            tempMax_day[i]="NA";
    }
    
    //Temp_Max_day
    var tempMin_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].temperatureMin!=null)
        {
            tempMi=Math.round(json_o.daily.data[i+1].temperatureMin);
            tempMin_day[i]=unit_temp(tempMi);
        }
        else
            tempMin_day[i]="NA";
    }
    
    //Sunrise_day
    var sunrise_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].sunriseTime!=null)
        {
            //sunrise_day[i]=convertTimestamp(json_o.daily.data[i+1].sunriseTime);
            sunrise_day[i]=convertTime(json_o.daily.data[i+1].sunriseTime,json_o.timezone);
        }
        else
            sunrise_day[i]="NA";
    }
    
    //Sunset_day
    var sunset_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].sunsetTime!=null)
        {
            //sunset_day[i]=convertTimestamp(json_o.daily.data[i+1].sunsetTime);
            sunset_day[i]=convertTime(json_o.daily.data[i+1].sunsetTime,json_o.timezone);
        }
        else
            sunset_day[i]="NA";
    }
    
    //Humidity
    var humid_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].humidity!=null)
        {
            humid_day[i]=Math.round(json_o.daily.data[i+1].humidity*100)+"%";
        }
        else
            humid_day[i]="NA";
    }
    
    //Visibility
    var visi_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].visibility!=null)
        {
            visi3=Math.round(json_o.daily.data[i+1].visibility);
            visi_day[i]=unit_visi(visi3);
        }
        else
            visi_day[i]="NA";
    }

    //Wind Speed
    var Windspd_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].windSpeed!=null)
        {
            wind3=Math.round(json_o.daily.data[i+1].windSpeed);
            Windspd_day[i]=unit_wind(wind3);
        }
        else
            Windspd_day[i]="NA";
    }
    
    //24 hour Pressure
    var press_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].pressure!=null)
        {
            press_day[i]=unit_press(json_o.daily.data[i+1].pressure);
        }
        else
            press_day[i]="NA";
    }
    //Summary line
    var summary_day = [];
    for(i=0;i<7;i++)
    {
        if(json_o.daily.data[i+1].summary!=null)
        {
            summary_day[i]=json_o.daily.data[i+1].summary;
        }
        else
            summary_day[i]="NA";
    }
    var text7="";
    
    text7+="<div class='col-md-2'></div>";
    for(i=0;i<7;i++)
    {
        text7+="<div id='modal"+i+"' class='col-md-1 mod"+i+"' data-toggle='modal' data-target='#myModal"+i+"'>"+day[i]+"<br><br>"+month[i]+" "+dd[i]+"<br><br><img src='"+icon_day[i]+"' alt='Icon Pic' width='80px' height='80px'><br><p style='font-weight:normal;'>Min<br>Temp</p><p style='font-size:20px'>"+tempMin_day[i]+"</p><p style='font-weight:normal;'>Max<br>Temp</p><p style='font-size:20px'>"+tempMax_day[i]+"</p></div>";
        
        text7+="<div id='myModal"+i+"' class='modal fade' role='dialog'> \
                    <div class='modal-dialog'><div class='modal-content'> \
                        <div class='modal-header'> \
                            <button type='button' class='close' data-dismiss='modal'>&times;</button> \
                                <h4 class='modal-title'>Weather in "+city+" on "+month[i]+" "+dd[i]+"</h4> \
                        </div> \
                        <div class='modal-body'> \
                            <p style='text-align: center;'><img src='"+icon_day[i]+"' alt='Icon Pic' width='130px' height='130px'></p><br/> \
                            <h4 style='text-align:center'><span style='font-size:20px;font-weight:bold;'>"+day[i]+"</span>: <span style='color:#FF9900;font-size:20px;font-weight:bold;'>"+summary_day[i]+"</span></h4> \
                            <div class='row' style='text-align:center;'> \
                                <div class='col-md-4'> \
                                   <span style='font-size:18px;font-weight:bold;'>Sunrise Time</span><br>"+sunrise_day[i]+"\
                                </div> \
                                <div class='col-md-4'> \
                                    <span style='font-size:18px;font-weight:bold;'>Sunset Time</span><br>"+sunset_day[i]+" \
                                </div> \
                                <div class='col-md-4'> \
                                    <span style='font-size:18px;font-weight:bold;'>Humidity </span><br>"+humid_day[i]+" \
                                </div> \
                            </div> \
                            <div class='row' style='text-align:center;'> \
                                <div class='col-md-4'> \
                                   <span style='font-size:18px;font-weight:bold;'>Wind Speed</span><br>"+Windspd_day[i]+"\
                                </div> \
                                <div class='col-md-4'> \
                                    <span style='font-size:18px;font-weight:bold;'>Visibility</span><br>"+visi_day[i]+"<br>"+" \
                                </div> \
                                <div class='col-md-4'> \
                                    <span style='font-size:18px;font-weight:bold;'>Pressure</span><br>"+press_day[i]+"<br>"+" \
                                </div> \
                            </div> \
                        </div> \
                        <div class='modal-footer'> \
                            <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button> \
                        </div> \
                    </div> \
                </div> \
            </div>";
       
    }
    text7+="<div class='col-md-3'></div>";
    document.getElementById("Next7").innerHTML=text7;
        
}