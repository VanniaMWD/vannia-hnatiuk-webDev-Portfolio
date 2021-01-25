
    const appMeal = {};
    appMeal.key = '1';

    /*appMeal.giveRecipe = function(data) {
        $('.results').empty();

        for( let i=0 ; i< data.meals.length ; i++ ){
            $('.results').append(`<div class="recipeFrame">
            <img src="${data.meals[i].strMealThumb}" alt="descriptive alt text" width="300" height="300">
            <p>${data.meals[i].strMeal}</p>
            </div>
            `);
        }

    }*/
    appMeal.getRecipe = function(Ingredient){
        $.ajax({
            url: 'https://www.themealdb.com/api/json/v1/1/filter.php?i',
            method: 'GET',
            dataType: 'json',
            data: {
                api_key: '1',
                i : Ingredient
            }
        }).then(function(data){
            $('.results').empty();

            if( data.meals === 0 || data.meals === null){
                $('.results').append(`<div class="noRecipe">
                    <i class="far fa-grin-beam-sweat"></i>
                    <h2>Oops, we don't have recipes with that ingredient, please try with something else</h2>
                </div>`)
            }
            else{
                for( let i=0 ; i< data.meals.length ; i++ ){
                    $('.results').append(`<div class="recipeFrame">
                    <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                        <p>${data.meals[i].strMeal}</p>
                        </div>
                    `);
                    }
                }
              
        })
    }

    appMeal.init = function(){
        $('form').on('submit', function(event){
            event.preventDefault();
            const Ingredient = $('#Usearch').val();
            appMeal.getRecipe(Ingredient);
            console.log(Ingredient)
        })
    }
        

    $(function () {
        appMeal.init();
    });
        