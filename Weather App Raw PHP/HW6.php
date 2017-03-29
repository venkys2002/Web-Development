<html>
    <head>
        <title>Geocode API</title>
        <meta http-equiv="Content-Type" content="text/html
charset=ISO-8859-1">
        
        <style type="text/css">
            #div1 { width:450px;
                    height:200px;
                    margin:100px auto;
                    border:1px solid black;
            }
            
            #div2 { width:450;
                    height:auto;
                    margin:-40px auto;
                    border:1px solid black;
            }
            table { margin:10px 10px;}
            #div2 .one { margin:20px 40px;
                            width:350;
                            
                        }
             #div2 .two { margin:20px 60px;
                            width:350;
                            
                        }
            .error { color:red;
                    margin:40px;}
        </style>
        
        <script type="text/javascript">
            //Validate the form input
            function validate(form)
            {
                var alertstring = "Please enter the value for";
                var address_fill=false;
                var city_fill=false;
                var state_fill=false;
            
                if(form.address.value.trim() != ""){
                    address_fill=true;
                }
                if(form.city.value.trim() != ""){
                    city_fill=true;
                }
                if(form.state.selectedIndex != 0)
                    state_fill=true;
                
                if(!address_fill)
                {
                    form.address.value="";
                    alertstring=alertstring+" address";
                }
                
                if(!city_fill)
                {
                    form.city.value="";
                    if(address_fill)
                    {
                        alertstring=alertstring+" city";
                    }
                    else
                    {
                        alertstring=alertstring+" and city";
                    }
                }
                
                if(!state_fill)
                {
                    if(address_fill && city_fill)
                    {
                        alertstring=alertstring+" state";
                    }
                    else
                    {
                        alertstring=alertstring+" and state";
                    }
                }
                
                if(!address_fill || !city_fill || !state_fill)
                {
                    alert(alertstring);
                    return false;
                }
                
                if(address_fill || city_fill || state_fill)
                {
                    return true;
                }       
            }
            //Clears the form and background data
            function resetForm(frm_elements)
            {
                document.getElementById("fah").checked=true;
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
                    /*
                    case "radio":
                    case "checkbox":
                        if (frm_elements[i].checked)
                        {
                            frm_elements[i].checked = false;
                        }
                        break;
                        */
                    
                    case "select-one":
                    case "select-multi":
                        frm_elements[i].selectedIndex = 0;
                        break;
                    default:
                        break;
                    }
                }
                //document.getElementById("div2").innerHTML=" ";
                //Clearing the div area on account of clear form
                var divelm=document.getElementById("div2");
                divelm.parentNode.removeChild(divelm);
            }
        </script>
    </head> 
    <body>
        <div id="div1">
            <h2 style="text-align:center; margin-top:-40px;">Forecast Search</h2>
            <form name="form" id="formid" method="get" action="/HW6.php">
                <table>
                    <tr>
                        <td>Street Address:<sup>*</sup></td>
                        <td><input type="text" name="address" id="addressid" value="<?php echo isset($_GET["address"])?$_GET["address"]:"";?>"/></td>
                    </tr>
                    <tr>
                        <td>City:<sup>*</sup></td>
                        <td><input type="text" name="city" id="cityid" value="<?php echo isset($_GET["city"])?$_GET["city"]:"";?>"/></td>   
                    </tr>
                    <tr>
                        <?php (isset($_GET["state"])) ? $state1 = $_GET["state"] : $state1= ""; ?>
                        <td>State:<sup>*</sup></td>
                        <td><select name="state">
                                <option <?php if ($state1=="") echo 'selected' ?> value="">Select your state...</option>
                                <option <?php if ($state1=="AL") echo 'selected' ?> value="AL">Albama</option>
                                <option <?php if ($state1=="AK") echo 'selected' ?> value="AK">Alaska</option>
                                <option <?php if ($state1=="AZ") echo 'selected' ?> value="AZ">Arizona</option>
                                <option <?php if ($state1=="AR") echo 'selected' ?> value="AR">Arkansas</option>
                                <option <?php if ($state1=="CA") echo 'selected' ?> value="CA">California</option>
                                <option <?php if ($state1=="CO") echo 'selected' ?> value="CO">Colorado</option>
                                <option <?php if ($state1=="CT") echo 'selected' ?> value="CT">Connecticut</option>
                                <option <?php if ($state1=="DE") echo 'selected' ?> value="DE">Delaware</option>
                                <option <?php if ($state1=="DC") echo 'selected' ?> value="DC">District of Columbia</option>
                                <option <?php if ($state1=="FL") echo 'selected' ?> value="FL">Florida</option>
                                <option <?php if ($state1=="GA") echo 'selected' ?> value="GA">Georgia</option>
                                <option <?php if ($state1=="HI") echo 'selected' ?> value="HI">Hawaii</option>
                                <option <?php if ($state1=="ID") echo 'selected' ?> value="ID">Idaho</option>
                                <option <?php if ($state1=="IL") echo 'selected' ?> value="IL">Illinois</option>
                                <option <?php if ($state1=="IN") echo 'selected' ?> value="IN">Indiana</option>
                                <option <?php if ($state1=="IA") echo 'selected' ?> value="IA">Iowa</option>
                                <option <?php if ($state1=="KS") echo 'selected' ?> value="KS">Kansas</option>
                                <option <?php if ($state1=="KY") echo 'selected' ?> value="KY">Kentucky</option>
                                <option <?php if ($state1=="LA") echo 'selected' ?> value="LA">Louisiana</option>
                                <option <?php if ($state1=="ME") echo 'selected' ?> value="ME">Maine</option>
                                <option <?php if ($state1=="MD") echo 'selected' ?> value="MD">Maryland</option>
                                <option <?php if ($state1=="MA") echo 'selected' ?> value="MA">Massachusetts</option>
                                <option <?php if ($state1=="MI") echo 'selected' ?> value="MI">Michigan</option>
                                <option <?php if ($state1=="MN") echo 'selected' ?> value="MN">Minnesota</option>
                                <option <?php if ($state1=="MS") echo 'selected' ?> value="MS">Mississippi</option>
                                <option <?php if ($state1=="MO") echo 'selected' ?> value="MO">Missouri</option>
                                <option <?php if ($state1=="MT") echo 'selected' ?> value="MT">Montana</option>
                                <option <?php if ($state1=="NE") echo 'selected' ?> value="NE">Nebraska</option>
                                <option <?php if ($state1=="NV") echo 'selected' ?> value="NV">Nevada</option>
                                <option <?php if ($state1=="NH") echo 'selected' ?> value="NH">New Hamspire</option>
                                <option <?php if ($state1=="NJ") echo 'selected' ?> value="NJ">New Jersey</option>
                                <option <?php if ($state1=="NM") echo 'selected' ?> value="NM">New Mexico</option>
                                <option <?php if ($state1=="NY") echo 'selected' ?> value="NY">New York</option>
                                <option <?php if ($state1=="NC") echo 'selected' ?> value="NC">North Carolina</option>
                                <option <?php if ($state1=="ND") echo 'selected' ?> value="ND">North Dakota</option>
                                <option <?php if ($state1=="OH") echo 'selected' ?> value="OH">Ohio</option>
                                <option <?php if ($state1=="OK") echo 'selected' ?> value="OK">Oklahoma</option>
                                <option <?php if ($state1=="OR") echo 'selected' ?> value="OR">Oregon</option>
                                <option <?php if ($state1=="PA") echo 'selected' ?> value="PA">Pennsylvania</option>
                                <option <?php if ($state1=="RI") echo 'selected' ?> value="RI">Rhode Island</option>
                                <option <?php if ($state1=="SC") echo 'selected' ?> value="SC">South Carolina</option>
                                <option <?php if ($state1=="SD") echo 'selected' ?> value="SD">South Dakota</option>
                                <option <?php if ($state1=="TN") echo 'selected' ?> value="TN">Tennessee</option>
                                <option <?php if ($state1=="TX") echo 'selected' ?> value="TX">Texas</option>
                                <option <?php if ($state1=="UT") echo 'selected' ?> value="UT">Utah</option>
                                <option <?php if ($state1=="VT") echo 'selected' ?> value="VT">Vermont</option>
                                <option <?php if ($state1=="VA") echo 'selected' ?> value="VA">Virginia</option>
                                <option <?php if ($state1=="WA") echo 'selected' ?> value="WA">Washington</option>
                                <option <?php if ($state1=="WV") echo 'selected' ?> value="WV">West Virginia</option>
                                <option <?php if ($state1=="WI") echo 'selected' ?> value="WI">Wisconsin</option>
                                <option <?php if ($state1=="WY") echo 'selected' ?> value="WY">Wyoming</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Degree:<sup>*</sup></td>
<td>
<input type="radio" name="degree" id = "fah" checked <?php echo isset($_GET["degree"]) && $_GET["degree"]=="us"?"checked":"";?> value="us">Fahrenheit
<input type="radio" name="degree" <?php echo isset($_GET["degree"]) && $_GET["degree"]=="si"?"checked":"";?> value="si">Celsius
</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="submit" name="submit" value="Search" onclick="return validate(this.form);" />
                            <input type="button" value="Clear" onclick="resetForm(this.form)" />
                        </td>
                    </tr>
                    <tr>
                        <td><p><sup>*</sup><i>-Mandatory fields.</i></p></td
                    </tr>
                    <tr>
                        <td></td>
                        <td><a href="https://developer.forecast.io/" target="_blank">Powered by Forecast.io</a></td>
                    </tr>
                </table>
            </form>
        </div>
         
        
        <?php if (isset($_GET["submit"])): ?>
            <?php
            $add=$cit=$stat=$degr=" ";
            if(trim($_GET["address"])!=null && trim($_GET["city"])!=null && $_GET["state"]!=null && $_GET["degree"]!=null)
            {
    //rawurlencode -Returns a string in which all non-alphanumeric characters except -_.~ have been replaced with a percent     //(%) sign followed by two hex digits
                $add=rawurlencode($_GET["address"]);
                $cit=rawurlencode($_GET["city"]);
                $stat=rawurlencode($_GET["state"]);
                $degree=$_GET["degree"];
    
                $key="AIzaSyBpcDmxs6RennrmVko-pJ4V1HC6VzLIV4c";
                $url="https://maps.google.com/maps/api/geocode/xml?address=".$add.",".$cit.",".$stat."&key=".$key;
                //$url="http://maps.google.com/maps/api/geocode/xml?address=".$add.",".$cit.",".$stat;

                //Pass the URL to get the XML response
                try
                {
                    $result = @file_get_contents($url);
                    $xml = new SimpleXMLElement($result);
                    
                    //Check if the xml returned has results or not
                    if($xml->status=="ZERO_RESULTS")
                    {
                        echo ("<div id=\"div2\">");
                        echo("<p class=\"error\">Exact address not found ..please verify the address</p>");
                        echo ("</div>");
                    }
                    //xml returned has proper results
                    if($xml->status=="OK")
                    {
                        if(!empty($xml->result[0]->geometry[0]->location[0]->lat))
                        {
                            $lat=$xml->result[0]->geometry[0]->location[0]->lat;
                        }
                        else
                        {
                            $lat=NULL;
                        }

                        if(!empty($xml->result[0]->geometry[0]->location[0]->lng))
                        {
                            $lng=$xml->result[0]->geometry[0]->location[0]->lng;
                        }
                        else
                        {
                            $lng=NULL;
                        }


                        $forecast_key="db84367e6464042922098d10c510114a";
                        $url_forecast="https://api.forecast.io/forecast/$forecast_key/".$lat.",".$lng."?units=".$degree."&exclude=false";

                        //Pass the Forecast url to get the JSON response
                        $result_forecast = file_get_contents($url_forecast);
                        $json_o=json_decode($result_forecast);

                        //Weather Condition
                        if(!empty($json_o->currently->summary))
                        {
                            $weather_condition=$json_o->currently->summary;
                        }
                        else
                        {
                            $weather_condition=NULL;
                        }
                        //Weather Temperature
                        if(!empty($json_o->currently->temperature))
                        {
                            if($degree=="us")
                            {
                                $temperature=round($json_o->currently->temperature)."&deg; F";
                            }
                            if($degree=="si")
                            {
                                $temperature=round($json_o->currently->temperature)."&deg; C";
                            }

                        }
                        else
                        {
                            $temperature=NULL;
                        }   
                        //Icon
                        $dir="http://cs-server.usc.edu:45678/hw/hw6/images/";
                        //Associative array to map the images
                        $image['clear-day'] = "clear.png";
                        $image['clear-night'] = "clear_night.png";
                        $image['rain'] = "rain.png";
                        $image['snow'] = "snow.png";
                        $image['sleet'] = "sleet.png";
                        $image['wind'] = "wind.png";
                        $image['fog'] = "fog.png";
                        $image['cloudy'] = "cloudy.png";
                        $image['partly-cloudy-day'] = "cloud_day.png";
                        $image['partly-cloudy-night'] = "cloud_night.png";

                        if(!empty($json_o->currently->icon))
                        {
                            $icon=$image[$json_o->currently->icon];
                            $icon_img=$dir.$icon;
                        }
                        else
                        {
                            $icon=NULL;
                        }
                        //Precipitation
                        if($degree=="us")
                        {
                            // inches per hour
                            $precipitation=$json_o->currently->precipIntensity;
                        }
                        if($degree=="si")
                        {
                            // converting from milimeter per hour to inches per hour
                            $precipitation=$json_o->currently->precipIntensity / 25.4;
                        }
                        
                        //Mapping the precipitation values
                        if($precipitation>=0 && $precipitation<0.002)
                            $precip="None";
                        if($precipitation>=0.002 && $precipitation<0.017)
                            $precip="Very Light";
                        if($precipitation>=0.017 && $precipitation<0.1)
                            $precip="Light";
                        if($precipitation>=0.1 && $precipitation<0.4)
                            $precip="Moderate";
                        if($precipitation>=0.4)
                            $precip="Heavy";

                        //Chance of Rain
                        $rain=round((float)$json_o->currently->precipProbability * 100)."%";
                        //echo ($json_o->currently->precipProbability);
                        //Wind Speed
                        if(!empty($json_o->currently->windSpeed))
                        {
                            if($degree=="us")
                            {
                                $wind_speed=round($json_o->currently->windSpeed)." mph";
                            }
                            if($degree=="si")
                            {
                                $wind_speed=round($json_o->currently->windSpeed)." mpsec";
                                //$wind_speed=round($wind)." mpsec";
                            }
                        }
                        else
                        {
                            $wind_speed=NULL;
                        }
                        //Dew Point
                        if(!empty($json_o->currently->dewPoint))
                        {
                            if($degree=="us")
                            {
                                $dew_point=round($json_o->currently->dewPoint)."&deg; F";
                            }
                            if($degree=="si")
                            {
                                $dew_point=round($json_o->currently->dewPoint)."&deg; C";
                            }  
                        }
                        else
                        {
                            $dew_point=NULL;
                        }
                        //Humidity
                        if(!empty($json_o->currently->humidity))
                        {
                            $humidity=round((float)$json_o->currently->humidity * 100)."%";
                        }
                        else
                        {
                            $humidity=NULL;
                        }
                        //Visibility
                        if(!empty($json_o->currently->visibility))
                        {
                            if($degree=="us")
                            {
                                $visibility=round($json_o->currently->visibility)." mi";
                            }
                            if($degree=="si")
                            {
                                $visibility=round($json_o->currently->visibility)." km";
                            }
                                
                        }
                        else
                        {
                            $visibility=NULL;
                        }
                        //Sunrise
                        if(!empty($json_o->daily->data[0]->sunriseTime))
                        {
                            //converting the time obtained to the local time zone of the states
                            $sunr=$json_o->daily->data[0]->sunriseTime;
                            $date = date_create("",timezone_open($json_o->timezone));
                            date_timestamp_set($date, $sunr);
                            $sunrise=date_format($date, 'h:i A');
                        }
                        else
                        {
                            $sunrise=NULL;
                        }
                        //Sunset
                        if(!empty($json_o->daily->data[0]->sunsetTime))
                        {
                            //converting the time obtained to the local time zone of the states
                            $suns=$json_o->daily->data[0]->sunsetTime;
                            $date = date_create("",timezone_open($json_o->timezone));
                            date_timestamp_set($date, $suns);
                            $sunset=date_format($date, 'h:i A');
                        }
                        else
                        {
                            $sunset=NULL;
                        }
                        //div block to show the results
                        echo ("<div id=\"div2\">");
                        echo ("<table class=\"one\">");
                        echo ("<tr><th colspan=\"2\">$weather_condition</th></tr>");
                        echo ("<tr><th colspan=\"2\">$temperature</th></tr>");
                        echo ("<tr><th colspan=\"2\"><img src='$icon_img' alt='Weather Pic' title='$weather_condition'></th></tr>");
                        echo ("</table>");
                        echo ("<table class=\"two\"");
                        echo ("<tr><td>Precipitation:</td><td>$precip</td></tr>");
                        echo ("<tr><td>Chance of Rain:</td><td>$rain</td></tr>");
                        echo ("<tr><td>Wind Speed:</td><td>$wind_speed</td></tr>");
                        echo ("<tr><td>Dew Point:</td><td>$dew_point</td></tr>");
                        echo ("<tr><td>Humidity:</td><td>$humidity</td></tr>");
                        echo ("<tr><td>visibility:</td><td>$visibility</td></tr>");
                        echo ("<tr><td>Sunrise:</td><td>$sunrise</td></tr>");
                        echo ("<tr><td>Sunset:</td><td>$sunset</td></tr>");
                        echo ("</div>");
                    }
                 }//end of try
                 catch(Exception $e)
                 {
                    //echo ("Error code :" ). $e->getCode()."<br>";
                    echo ("<div id=\"div2\">");
                    echo ("<p class=\"error\">Error message: ") . $e->getMessage()."</p>";
                    echo ("</div>");
                 }
            }//end of main if block
            ?>
       <?php endif; ?>
    </body>                                            
</html>