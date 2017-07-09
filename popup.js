var limit = 3

$(document).ready(function() {
  $(".amount-filter").click(getInfo);
  $("#site-link").click(function(){
       chrome.tabs.create({url: $(this).attr('href')});
       return false;
     });
});

   function getInfo(){
       var main_table = document.getElementById('main-table');
       delete_all_rows(main_table);
       limit = this.innerText.match(/\d+/)[0];
       $.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=" + limit, function(data){
        $.each(data, function(k,v){
            make_table_entry(main_table, k, v.symbol, v.price_usd, v.market_cap_usd);
        });
    });
}

function make_table_entry(main_table, number, symbol, price, market_cap){
    number+=1;
    var row = main_table.insertRow(number);
    var row_index = row.insertCell(0);
    var row_name = row.insertCell(1);
    var row_price = row.insertCell(2);
    var row_market_cap = row.insertCell(3);
    row_index.innerHTML = number;
    row_name.innerHTML = symbol;
    row_price.innerHTML = "$"+price;
    var formatted_m_cap = numeral(market_cap).format('0,0');
    row_market_cap.innerHTML = "$"+formatted_m_cap;
}

function delete_all_rows(table){
    var length = table.rows.length;
    for(var i = length-1; i>0; i--){
        table.deleteRow(i);
    }
}
