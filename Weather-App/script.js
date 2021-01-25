 

const AppWeather = {};

    AppWeather.poemEmpty;
    AppWeather.randomPoem = arr =>{
        //console.log(arr[0]);
        const randomNumber = Math.floor(Math.random() * arr.length) 
        //console.log(randomNumber)
        return arr[randomNumber];
    }
    
    //const $spinner= $('lds-ellipsis');

    //Displays the weather conditions 
    AppWeather.displayWeather = function(parameter){
        $('.results').empty();
        $('.results').append(`<div class="weather"> 
            <p>The weather in ${parameter.name} is: </p>
            <h3>${parameter.main.temp} C</h3>
            <p >${parameter.weather[0].description}</p>                   
            </div>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`);
    }
    //Display a poem based on weather conditions 
    AppWeather.displayPoem = function(parameter2){

        //When the API returns one poem it returns an object {}
        //When there are more than 1 poem the result returns an array []

        let poemA;
        console.log(parameter2.result.length)
        
        if (parameter2.result.length > 1) {
            
            //poemA = parameter2.result[0]
            poemA = AppWeather.randomPoem(parameter2.result)

            $('.results .lds-spinner').replaceWith(`<div class="poem"> 
            <p>As the author ${poemA.poet} said in the poem: </p>
            <blockquote>${poemA.title}</blockquote>
            <p  class="bottom">${poemA.poem} </p>
            <p>Poem brought by: </p>
            <a href="https://www.poetry.net/">Poetry.net</a>
            </div>`);
        }
        else {
            
            poemA  = parameter2.result
            $('.results .lds-spinner').replaceWith(`<div class="poem"> 
            <p>As the author ${poemA.poet} said in the poem: </p>
            <blockquote>${poemA.title}</blockquote>
            <p  class="bottom">${poemA.poem} </p>
            </div>`);
            
        }
        
    }
    // Function that displays empty state  
    AppWeather.noPoem = function (){
        $('.results .lds-spinner').replaceWith(`<div class="poem">
                <p> Oops, the current weather conditions didn't return a poem. However, try a different location to see in what poem they are living in there</p> 
                </div>`)
    }

//It calls the weather conditions from a form submit 
    AppWeather.conditions = function (city) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather/",
            method: 'GET',
            dataType: 'json',
            data: {
                q: city,
                appid: '44bee0486cb1c52d26dff237d9bdd16c',
                units: 'metric',
                lang: 'en'
                }
        }).then(function(data){
        console.log(data)
        AppWeather.poetry(data)
        AppWeather.displayWeather(data)      
        })
    }
    
//Looks for a poem based on the result of 'conditions' through term.weather[0].description
        AppWeather.poetry=function(term){
            $.ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method:'GET',
            data: {
                reqUrl: "https://www.stands4.com/services/v2/poetry.php",
                params:{
                    method: 'GET',
                    uid: '8164',
                    tokenid: 'shL7zd6fJWxyEZUl',
                    term: term.weather[0].description,
                    format: 'json'
                }
            }
        }).then(function(result){
            console.log(result);
            AppWeather.poemEmpty = result;
            console.log($.isEmptyObject(AppWeather.poemEmpty));
            if ($.isEmptyObject(AppWeather.poemEmpty)=== false){
                AppWeather.displayPoem(result); 
            }
            else {
                AppWeather.noPoem();
            }                    
        }
        )
    }

    AppWeather.init =() =>{
        $('form').on('submit', function(event){
            event.preventDefault();
            const city = $('#forma').val();            
            AppWeather.conditions(city);
            })
    }


    $(document).ready(function(){
        AppWeather.init()
    })