// Aurthor:     Daljit Singh Sohi
//Student ID:   100520358

$(document).ready(function(){
  //JS for 'todolist.ejs' Page
  var todoForm = document.getElementsByClassName('todoForm');
  $(todoForm).on('submit', function(){
    var additem = document.getElementById('itemValue');
    var todoItem = {
      item: additem.value
    }
    $.ajax({
      type: 'POST',
      url: '/list',
      data: todoItem,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

  $('li').on('click', function(){
    var selecitem = $(this).text();
    var deleItem = {
      item: selecitem
    }
    $.ajax({
      type: 'DELETE',
      url: '/list',
      data: deleItem,
      success: function(data){
        location.reload();
      }
    });
  });

}); //End (document).ready
