<?php
    //echo("Hello");
    $add=$cit=$stat=$degr=" ";
    if (isset($_POST["submit"]))
    {
        if(trim($_POST["address"])!=null && trim($_POST["city"])!=null && $_POST["state"]!=null && $_POST["degree"]!=null)
        {
    //rawurlencode -Returns a string in which all non-alphanumeric characters except -_.~ have been replaced with a percent     //(%) sign followed by two hex digits
            $add=rawurlencode($_POST["address"]);
            $cit=rawurlencode($_POST["city"]);
            $stat=rawurlencode($_POST["state"]);
            $degree=$_POST["degree"];
        }
    }

    else if(isset($_GET["submit"]))
    {
        if(trim($_GET["address"])!=null && trim($_GET["city"])!=null && $_GET["state"]!=null && $_GET["degree"]!=null)
        {
            $add=rawurlencode($_GET["address"]);
            $cit=rawurlencode($_GET["city"]);
            $stat=rawurlencode($_GET["state"]);
            $degree=$_GET["degree"];
        }
    }

    else
    {
        echo ("Data Not present");
    }
        $key="AIzaSyBpcDmxs6RennrmVko-pJ4V1HC6VzLIV4c";
        $url="https://maps.google.com/maps/api/geocode/xml?address=".$add.",".$cit.",".$stat."&key=".$key;
        //echo($url)."<br>";
        
        try
        {
            $result = @file_get_contents($url);
            $xml = new SimpleXMLElement($result);
            //echo($result);
            
            //Check if the xml returned has results or not
            if($xml->status=="ZERO_RESULTS")
            {
                echo ("<div id=\"return\">");
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
                //echo($url_forecast)."<br>";
                
                //Pass the Forecast url to get the JSON response
                $result_forecast = file_get_contents($url_forecast);
                echo($result_forecast);
            }
        }//end of try
        catch(Exception $e)
        {
            //echo ("Error code :" ). $e->getCode()."<br>";
            echo ("<div id=\"return\">");
            echo ("<p class=\"error\">Error message: ") . $e->getMessage()."</p>";
            echo ("</div>");
        }

?>
