const AppInvoiceSystem = { };

AppInvoiceSystem.serviceValue;
AppInvoiceSystem.quanti;
AppInvoiceSystem.QTY =[];
AppInvoiceSystem.quanti1;
AppInvoiceSystem.quanti2;
AppInvoiceSystem.quanti3;
AppInvoiceSystem.quanti4;
AppInvoiceSystem.quanti5;
AppInvoiceSystem.quanti6;

AppInvoiceSystem.Kost = function(x,y) {
    return x * y;
}
AppInvoiceSystem.Transactions=[];
AppInvoiceSystem.TransactionsRow = [];
AppInvoiceSystem.fifi=0;
AppInvoiceSystem.fifi1=0;
AppInvoiceSystem.fifi2=0;
AppInvoiceSystem.fifi3=0;
AppInvoiceSystem.fifi4=0;
AppInvoiceSystem.fifi5=0;
AppInvoiceSystem.FeeArray = [];
AppInvoiceSystem.QtyArray=[];
AppInvoiceSystem.QTY0 = [];
AppInvoiceSystem.QTY1 = [];
AppInvoiceSystem.QTY2=[];
AppInvoiceSystem.QTY3=[];
AppInvoiceSystem.QTY4=[];
AppInvoiceSystem.QTY5=[];
AppInvoiceSystem.count=0;
AppInvoiceSystem.lastqty;

AppInvoiceSystem.SubTotal =0;
AppInvoiceSystem.Accumulator=0;
AppInvoiceSystem.SubT= function(a,b,c,d,e,f){
    return a + b + c+ d + e + f;
}

AppInvoiceSystem.GST = 0;
AppInvoiceSystem.geesti = function(x){
    return x * 0.05;
}

AppInvoiceSystem.Tip = 0;
AppInvoiceSystem.Tipi = function(x){
    return x * 0.15;
}

AppInvoiceSystem.TotaltoPay =0;
AppInvoiceSystem.total2pay = function (x,y,z) {
    return x + y + z;
}

AppInvoiceSystem.Substractor= 0;
AppInvoiceSystem.deleteItem = function(x,y){
    return x-y;
}


AppInvoiceSystem.init =() =>{
    
    $('select').change(function() {
        const Service = $(this).children("option:selected").val() //this inside an event listener 'select', it selects the specific element that triggers the event listener,
        
        //AppInvoice.serviceValue is the number data type from the select input
        AppInvoiceSystem.serviceValue = parseFloat(Service);
        //Storing AppInvoice.service in an Array to anchor that value in this first row
        AppInvoiceSystem.FeeArray.push(AppInvoiceSystem.serviceValue)

        //Appending the price of the selecting service to the cell : "Fee"
        $('.FI:first').append(`<li> $ ${AppInvoiceSystem.serviceValue} </li>`)
        
        //console.log(AppInvoiceSystem.serviceValue)
        //console.log(typeof(AppInvoiceSystem.serviceValue))
        
        
        $(':input[type="number"]').on('mouseup keyup', function(){
            
            //Obtaining the # of items of the selected service
            const QTY0=$(':input[type="number"]').val()
            console.log(QTY0)
            AppInvoiceSystem.quanti= parseFloat(QTY0)
            AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti)
            
            
            //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
            AppInvoiceSystem.fifi = AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[0], AppInvoiceSystem.quanti)
            console.log(AppInvoiceSystem.fifi)

            //Appending the cost of the service in to the cell "Cost"
            $thisPrais=$('.Prais:first')
            $thisPrais.append(`<li>$ ${AppInvoiceSystem.fifi.toFixed(2)}</li>`)

            //Sum of all transactions 
            AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);

            //Appending the Subtotal to the "Subtotal" cell
            $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)

            //Appending the value of GST
            AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)

            $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

            //Appending the TIP
            AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)

            $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

            //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
            AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)

            $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
            

        }) 
        
    }); 
    
    

        //Event that adds a new row when clicking the "add-row" button
        $(".add-row").on("click", function(event){
            event.preventDefault(); 

            AppInvoiceSystem.count++;
            console.log(AppInvoiceSystem.count)

            if(AppInvoiceSystem.count<=5){
                //Selecting the "last" transaction
                const $lastrans = $(".transactions").last()

                //Creating from scratch a new transaction row mark up
                const $newtrans = `<tr class="transactions">
                <td class="service"><select id="item" name="item">
                    <option value disabled selected>Service</option>
                    <option value="3">Tacos</option>
                    <option value="2">Pop</option>
                    <option value="5">Tequila</option>
                    <option value="15">Fondue</option>
                    <option value="4">Beer</option>
                    <option value="150">Mariachi</option>
                </td>
                <td class="FI"></td>
                <td class="QTY">
                    <input type="number" class="qty" name="qty" value="AppInvoiceSystem.quanti" placeholder="0">
                </td>
                <td class="Prais"></td>
                </tr>`

                //Inserting the new transaction row after the first transaction
                $lastrans.after($newtrans)

                //Event which selects the service for each row 
                $('select').change(function() {
                    const Service = $(this).children("option:selected").val()

                    AppInvoiceSystem.serviceValue = parseFloat(Service);

                    AppInvoiceSystem.FeeArray.push(AppInvoiceSystem.serviceValue)

                    $('.FI:last').append(`<li>$ ${AppInvoiceSystem.serviceValue} </li>`)       
                
                })
            
      
            

                $('.qty').eq(1).on('mouseup keyup', function(){

                    //Obtaining the # of items of the selected service
                    const QTY =$('.qty').eq(1).val()
                    console.log(QTY)
                    AppInvoiceSystem.quanti1=parseFloat(QTY)
                    AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti1)

                    //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
                    AppInvoiceSystem.fifi1 = AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[1], AppInvoiceSystem.quanti1)

                    //Appending the cost of the service in to the cell "Cost"
                    $(".Prais").eq(1).append(`<li>$ ${AppInvoiceSystem.fifi1.toFixed(2)}</li>`)

                    //Sum of all transactions 
                    AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);

                    //Appending the Subtotal to the "Subtotal" cell
                    $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)

                    //Appending the value of GST
                    AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)
                    $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

                    //Appending the TIP
                    AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)
                    $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

                    //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
                    AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)
                    $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
                    
                })

                    //Selection of input type number of 3rd Row
                $('.qty').eq(2).on('mouseup keyup', function(){

                    //Obtaining the # of items of the selected service
                    const QTY2 =$('.qty').eq(2).val()
                    console.log(QTY2)
                    AppInvoiceSystem.quanti2=parseFloat(QTY2)
                    AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti2)

                    //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
                    AppInvoiceSystem.fifi2=AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[2], AppInvoiceSystem.quanti2)
                    //Appending the cost of the service in to the cell "Cost"          
                    $(".Prais").eq(2).append(`<li>$ ${AppInvoiceSystem.fifi2.toFixed(2)}</li>`)

                    //Sum of all transactions
                    AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);

                    //Appending the Subtotal to the "Subtotal" cell
                    $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)
                    AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)

                    //Appending the value of GST
                    $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

                    //Appending the TIP
                    AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)
                    $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

                    //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
                    AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)
                    $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
                    
                })

                        //Selection of input type number of 4th Row
                $('.qty').eq(3).on('mouseup keyup', function(){

                    //Obtaining the # of items of the selected service
                    const QTY3 =$('.qty').eq(3).val()
                    console.log(QTY3)
                    AppInvoiceSystem.quanti3=parseFloat(QTY3).toFixed(2)
                    AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti3)

                    //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
                    AppInvoiceSystem.fifi3=AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[3], AppInvoiceSystem.quanti3)
                    //Appending the cost of the service in to the cell "Cost"
                    $(".Prais").eq(3).append(`<li>$ ${AppInvoiceSystem.fifi3.toFixed(2)}</li>`)

                    //Sum of all transactions 
                    AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);

                    //Appending the Subtotal to the "Subtotal" cell
                    $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)

                    //Appending the value of GST
                    AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)
                    $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

                    //Appending the TIP
                    AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)
                    $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

                    //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
                    AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)

                    $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
                })

                //Selection of input type number of 5th Row
                $('.qty').eq(4).on('mouseup keyup', function(){

                    //Obtaining the # of items of the selected service
                    const QTY4 =$('.qty').eq(4).val()
                    console.log(QTY4)
                    AppInvoiceSystem.quanti4=parseFloat(QTY4).toFixed(2)
                    AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti4)

                    //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
                    AppInvoiceSystem.fifi4=AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[4], AppInvoiceSystem.quanti4)

                    //Appending the cost of the service in to the cell "Cost"
                    $(".Prais").eq(4).append(`<li>$ ${AppInvoiceSystem.fifi4.toFixed(2)}</li>`)

                    //Sum of all transactions
                    AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);
                    
                    //Appending the Subtotal to the "Subtotal" cell
                    $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)

                    //Appending the value of GST
                    AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)
                    $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

                    //Appending the TIP
                    AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)
                    $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

                    //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
                    AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)

                    $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
                })

                        //Selection of input type number of 6th Row
                $('.qty').eq(5).on('mouseup keyup', function(){

                    //Obtaining the # of items of the selected service
                    const QTY5 =$('.qty').eq(5).val()
                    console.log(QTY5)
                    AppInvoiceSystem.quanti5=parseFloat(QTY5).toFixed(2)
                    AppInvoiceSystem.QTY.push(AppInvoiceSystem.quanti5)

                    //Product of the price of the service (AppInvoiceSystem.serviceValue) and the quantity served (AppInvoiceSystem.quanti)
                    AppInvoiceSystem.fifi5=AppInvoiceSystem.Kost(AppInvoiceSystem.FeeArray[5], AppInvoiceSystem.quanti5)
                
                    //Appending the cost of the service in to the cell "Cost"
                    $(".Prais").eq(5).append(`<li>$ ${AppInvoiceSystem.fifi5.toFixed(2)}</li>`)

                    //Sum of all transactions 
                    AppInvoiceSystem.SubTotal = AppInvoiceSystem.SubT(AppInvoiceSystem.fifi, AppInvoiceSystem.fifi1, AppInvoiceSystem.fifi2, AppInvoiceSystem.fifi3, AppInvoiceSystem.fifi4, AppInvoiceSystem.fifi5);

                    //Appending the Subtotal to the "Subtotal" cell
                    $(".Subtotal").append(`<li>$ ${AppInvoiceSystem.SubTotal.toFixed(2)}</li>`)

                    //Appending the value of GST
                    AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal)
                    $(".GST").append(`<li>$ ${AppInvoiceSystem.GST.toFixed(2)}</li>`)

                    //Appending the TIP
                    AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi (AppInvoiceSystem.SubTotal)
                    $(".TIP").append(`<li>$ ${AppInvoiceSystem.Tip.toFixed(2)}</li>`)

                    //Appending the Sum of Subtotal, GST, TIP and inserting to "Total to Pay" cell
                    AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay (AppInvoiceSystem.SubTotal, AppInvoiceSystem.GST, AppInvoiceSystem.Tip)
                    $(".Total").append(`<li>$ ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`)
                })
            }
        })
       
    //Events of deletting rows after clicking "delete" button
    $( ".dlt-row" ).on( "click", function(event){
        event.preventDefault(); 

        //Delete row if the Subtotal is not 0
        if (AppInvoiceSystem.SubTotal !== 0) {   

            //selecting the last row
            let $lastrans = $(".transactions").last()
            $lastrans.remove()

            //remove 6th row if the cost of 6th row is not 0
            if (AppInvoiceSystem.fifi5 !==0){

                //To delete the last item: the variable substractor needs the cost of the last item
                AppInvoiceSystem.Substractor = AppInvoiceSystem.fifi5;
                AppInvoiceSystem.deleteItem();           
                AppInvoiceSystem.SubTotal = AppInvoiceSystem.deleteItem(AppInvoiceSystem.SubTotal,AppInvoiceSystem.Substractor)
                AppInvoiceSystem.Substractor = AppInvoiceSystem.SubTotal;

                //Accumulator needs to update to the new SubTotal in case that a new item nees to be added
                AppInvoiceSystem.Accumulator = AppInvoiceSystem.SubTotal;
                //the cost of row 6th will be reset to 0
                AppInvoiceSystem.fifi5=0;
            
                $('.Subtotal').append(`<li>$  ${ AppInvoiceSystem.SubTotal.toFixed(2)}</li>`);

                //Calculates new tip
                AppInvoiceSystem.Tipi();
                AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi(AppInvoiceSystem.SubTotal);
                $('.TIP').append(`<li>$  ${AppInvoiceSystem.Tip.toFixed(2)}</li>`);
                
                
                //Calculates new GST 
                AppInvoiceSystem.geesti();
                AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal);
                $('.GST').append(`<li>$  ${ AppInvoiceSystem.GST.toFixed(2)}</li>`);
                
                //Calculates the Final Total
                //AppInvoiceSystem.total2pay();
                AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay(AppInvoiceSystem.SubTotal, AppInvoiceSystem.Tip,AppInvoiceSystem.GST);

                $('.Total').append(`<li>$  ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`);

            }

            else if( AppInvoiceSystem.fifi4 !== 0 ) {
        
                //To delete the last item: the variable substractor needs the cost of the last item
                AppInvoiceSystem.Substractor = AppInvoiceSystem.fifi4;
                AppInvoiceSystem.deleteItem();           
                AppInvoiceSystem.SubTotal = AppInvoiceSystem.deleteItem(AppInvoiceSystem.SubTotal,AppInvoiceSystem.Substractor)
                AppInvoiceSystem.Substractor = AppInvoiceSystem.SubTotal;
                
                //Accumulator needs to update to the new SubTotal in case that a new item nees to be added
                AppInvoiceSystem.Accumulator = AppInvoiceSystem.SubTotal;
                //the cost of row 5th will be reset to 0
                AppInvoiceSystem.fifi4 = 0;
            
                $('.Subtotal').append(`<li>$  ${ AppInvoiceSystem.SubTotal.toFixed(2)}</li>`);

                //Calculates new tip
                AppInvoiceSystem.Tipi();
                AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi(AppInvoiceSystem.SubTotal);
                $('.TIP').append(`<li>$  ${AppInvoiceSystem.Tip.toFixed(2)}</li>`);
            
            
                //Calculates new GST 
                AppInvoiceSystem.geesti();
                AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal);
                $('.GST').append(`<li>$  ${ AppInvoiceSystem.GST.toFixed(2)}</li>`);
                
                //Calculates the Final Total
                //AppInvoiceSystem.total2pay();
                AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay(AppInvoiceSystem.SubTotal, AppInvoiceSystem.Tip,AppInvoiceSystem.GST);

                $('.Total').append(`<li>$  ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`);

            }
            
            else if (AppInvoiceSystem.fifi3 !==0 ){
            
                //To delete the last item: the variable substractor needs the cost of the last item
                AppInvoiceSystem.Substractor = AppInvoiceSystem.fifi3;
                AppInvoiceSystem.deleteItem();           
                AppInvoiceSystem.SubTotal = AppInvoiceSystem.deleteItem(AppInvoiceSystem.SubTotal,AppInvoiceSystem.Substractor)
                AppInvoiceSystem.Substractor = AppInvoiceSystem.SubTotal;
                //Accumulator needs to update to the new SubTotal in case that a new item nees to be input
                AppInvoiceSystem.Accumulator = AppInvoiceSystem.SubTotal;
                
                //the cost of row 4th will be reset to 0
                AppInvoiceSystem.fifi3=0;
            
                $('.Subtotal').append(`<li>$  ${ AppInvoiceSystem.SubTotal.toFixed(2)}</li>`);

                //Calculates new tip
                AppInvoiceSystem.Tipi();
                AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi(AppInvoiceSystem.SubTotal);
                $('.TIP').append(`<li>$  ${AppInvoiceSystem.Tip.toFixed(2)}</li>`);
            
            
                //Calculates new GST 
                AppInvoiceSystem.geesti();
                AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal);
                $('.GST').append(`<li>$  ${ AppInvoiceSystem.GST.toFixed(2)}</li>`);
                
                //Calculates the Final Total
                //AppInvoiceSystem.total2pay();
                AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay(AppInvoiceSystem.SubTotal, AppInvoiceSystem.Tip,AppInvoiceSystem.GST);

                $('.Total').append(`<li>$  ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`);

            }

            else if (AppInvoiceSystem.fifi2 !==0 ){
                //To delete the last item: the variable substractor needs the cost of the last item
                AppInvoiceSystem.Substractor = AppInvoiceSystem.fifi2;
                AppInvoiceSystem.deleteItem();           
                AppInvoiceSystem.SubTotal = AppInvoiceSystem.deleteItem(AppInvoiceSystem.SubTotal,AppInvoiceSystem.Substractor)
                AppInvoiceSystem.Substractor = AppInvoiceSystem.SubTotal;
                //Accumulator needs to update to the new SubTotal in case that a new item nees to be input
                AppInvoiceSystem.Accumulator = AppInvoiceSystem.SubTotal;
                //the cost of row 3rd will be reset to 0
                AppInvoiceSystem.fifi2=0;
            
                $('.Subtotal').append(`<li>$  ${ AppInvoiceSystem.SubTotal.toFixed(2)}</li>`);

                //Calculates new tip
                AppInvoiceSystem.Tipi();
                AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi(AppInvoiceSystem.SubTotal);
                $('.TIP').append(`<li>$  ${AppInvoiceSystem.Tip.toFixed(2)}</li>`);
                
                
                //Calculates new GST 
                AppInvoiceSystem.geesti();
                AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal);
                $('.GST').append(`<li>$  ${ AppInvoiceSystem.GST.toFixed(2)}</li>`);
                
                //Calculates the Final Total
                //AppInvoiceSystem.total2pay();
                AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay(AppInvoiceSystem.SubTotal, AppInvoiceSystem.Tip,AppInvoiceSystem.GST);

                $('.Total').append(`<li>$  ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`);

            }

        else if (AppInvoiceSystem.fifi1 !==0 ){

            //To delete the last item: the variable substractor needs the cost of the last item
            AppInvoiceSystem.Substractor = AppInvoiceSystem.fifi1;
            AppInvoiceSystem.deleteItem();           
            AppInvoiceSystem.SubTotal = AppInvoiceSystem.deleteItem(AppInvoiceSystem.SubTotal,AppInvoiceSystem.Substractor)
            AppInvoiceSystem.Substractor = AppInvoiceSystem.SubTotal;
            //Accumulator needs to update to the new SubTotal in case that a new item nees to be input
            AppInvoiceSystem.Accumulator = AppInvoiceSystem.SubTotal;

            //the cost of row 2nd will be reset to 0
            AppInvoiceSystem.fifi1=0;
        
            $('.Subtotal').append(`<li>$  ${ AppInvoiceSystem.SubTotal.toFixed(2)}</li>`);

            //Calculates new tip
            AppInvoiceSystem.Tipi();
            AppInvoiceSystem.Tip = AppInvoiceSystem.Tipi(AppInvoiceSystem.SubTotal);
            $('.TIP').append(`<li>$  ${AppInvoiceSystem.Tip.toFixed(2)}</li>`);
            
            
            //Calculates new GST 
            AppInvoiceSystem.geesti();
            AppInvoiceSystem.GST = AppInvoiceSystem.geesti(AppInvoiceSystem.SubTotal);
            $('.GST').append(`<li>$  ${ AppInvoiceSystem.GST.toFixed(2)}</li>`);
        
            //Calculates the Final Total
            //AppInvoiceSystem.total2pay();
            AppInvoiceSystem.TotaltoPay = AppInvoiceSystem.total2pay(AppInvoiceSystem.SubTotal, AppInvoiceSystem.Tip,AppInvoiceSystem.GST);

            $('.Total').append(`<li>$  ${AppInvoiceSystem.TotaltoPay.toFixed(2)}</li>`);

        }
            
            
        }
        
    })
}


$(document).ready(function(){
    AppInvoiceSystem.init()
})
