





$('#datepicker').datepicker();

$(window).on('load', function () {
  $(".loader").fadeOut();
  $("#preloder").delay(200).fadeOut("slow");
});



filter_dict = {

}

filter_dict['filter_qty'] = $('#quantityFilter').val()

filter_dict['result_filter'] = $('#win_filter').val()

$('#win_filter').on('change', function () {
  var value = $(this).val();

  filter_dict['result_filter'] = value

  $.ajax({
      type: "GET",
      url: 'fetch_data/',
      data: {
        filter_dict : JSON.stringify(filter_dict)
      },
      contentType: "application/json; charset=utf-8",
      success: function (data) {
          html = ''
          $.each(data.data, function(index, event) {
           date  =  new Date(event.start_date);
           var options = { 
            month: "long", 
            day: "numeric", 
            year: "numeric", 
            hour: "numeric", 
            minute: "numeric", 
            hour12: true
        };
        var formatted_date_time = date.toLocaleString("en-US", options);

            html += 
            `
            <tr class="table-hover box-shadow"> 
              <td class="text-dark">${ event.venue }</td>
              <td class="text-dark">${event.competition_name}</td>
              <td class="text-dark">${formatted_date_time} </td>
              
              <td class="text-dark">${ event.home_name }</td>
              <td class="text-dark">${ event.home_country }</td>
              <td class="text-dark">  VS </td>

              <td class="text-dark">${ event.away_name }</td>
              <td class="text-dark">${ event.away_country }</td>
              <td class="text-dark result_type">(${event.result_type} : ${ event.result } % )</td>
            </tr>
            `
          });

           if (html.length === 0 ){
            $('.message').html(`<div class=" mt-3 alert alert-warning">You don't have any Data for the selected Team</div>`)
            $('.all_result_table').hide()
            $('.all_table').html(' ')
            $('.title').text('Results are filtered based on the ' + value)           } else {
            $('.message').html('')
            $('.all_table').html(html)
            $('.all_result_table').hide()
            $('.title').text('Results are filtered based on the ' + value)          }
      },
      error: function (xhr, status, error) {
          console.log(xhr.responseText);
      }
  });
});


$('#quantityFilter').on('change', function () {

  qty_value = $(this).val()

filter_dict['filter_qty'] = qty_value

$.ajax({
  
    type: "GET",
    url: 'fetch_qty/',
    contentType: "application/json; charset=utf-8",
    data: {
      
      filter_dict : JSON.stringify(filter_dict)
    
    },

    success: function (data) {
     
      html = ''
   
          $.each(data.data, function(index, event) {

          html += 

            `
            <tr class="table-hover box-shadow"> 
              <td class="text-dark">${ event.venue }</td>
              <td class="text-dark">${event.competition_name}</td>
              <td class="text-dark">${event.start_date}</td>
              <td class="text-dark">${ event.home_name }</td>
              <td class="text-dark">${ event.home_country }</td>
              <td class="text-dark">  VS </td>
              <td class="text-dark">${ event.away_name }</td>
              <td class="text-dark">${ event.away_country }</td>
              <td class="text-dark result_type">(${event.result_type} : ${ event.result } % )</td>
            </tr>
            `
          });
        
           if (html.length === 0 ){
            $('.message').html(`<div class=" mt-3 alert alert-warning">You don't have any Data for the selected Team</div>`)
            $('.all_result_table').hide()
            $('.all_table').html(' ')
            $('.title').text('Results are filtered based on the ' + value)           } else {
            $('.message').html('')
            $('.all_table').html(html)
            $('.all_result_table').hide()
            $('.title').text('Results are filtered based on the ' + value)          }
    },
    error: function (xhr, status, error) {
        console.log(xhr.responseText);
    }
});


});



$('#datepicker').on('change', function () {

var value_date= $(this).val();

filter_dict['filter_date'] = value_date

$.ajax({
  
    type: "GET",
    url: 'fetch_date/',
    contentType: "application/json; charset=utf-8",
    data: {
      
      filter_dict : JSON.stringify(filter_dict)

    },

    success: function (data) {

      html = ''
          
          $.each(data.data, function(index, event) {
      
          html += 
            `
            <tr class="table-hover box-shadow"> 
              <td class="text-dark">${ event.venue }</td>
              <td class="text-dark">${event.competition_name}</td>
              <td class="text-dark">${event.start_date}</td>
              <td class="text-dark">${ event.home_name }</td>
              <td class="text-dark">${ event.home_country }</td>
              <td class="text-dark">  VS </td>

              <td class="text-dark">${ event.away_name }</td>
              <td class="text-dark">${ event.away_country }</td>
              <td class="text-dark result_type">(${event.result_type} : ${ event.result } % )</td>
            </tr>
            `
          });

           if (html.length === 0 ){

            $('.message').html(`<div class=" mt-3 alert alert-warning">There are no data for the selected Team.</div>`)
            $('.all_result_table').hide()
            $('.all_table').html(' ')
            $('.title').text('Results are filtered based on the ' + value)            
           } else {
            $('.message').html('')
            $('.all_table').html(html)
            $('.all_result_table').hide()
            $('.title').text('Results are filtered based on the ' + value)
          }
        
    },
    error: function (xhr, status, error) {
        console.log(xhr.responseText);
    }
});
});