function generatePage(){
    let span = "<span class='glyphicon glyphicon-ok-circle'></span>";
    firebase.database().ref("equipment").once("value").then(function(equipment){
        equipment.forEach(function(item){
            let equipmentKey = item.key;
            let itemData = item.val();
            let model = itemData.model;
            let manufacturer = itemData.manufacturer;
            let type = itemData.type;
            let sku = itemData.sku;
            let url = itemData.url;
            let gpib = itemData.gpib;
            let skuCheck = $("#" + sku).hasClass("sku");
            if(skuCheck == false){
                $("#bookmarkLinks").empty();
                let bookmark = "<li><a href='#" + sku +"' class='make-block-item nav-sub'>" + type + "</a></li>"
                $("#bookmarkLinks").append(bookmark);
                if(gpib == false){
                    let newRow = "<div class='row'><div class='col-2'></div><div class='col-2'>" +
                          "<h4 id = '" + sku + "' class = 'title'>" + type + "</h4><ul id='ul" + sku + "'>" +
                              "<li id='li" + equipmentKey + "'> <a href='" + url + "'>" + manufacturer + model + "</a></li>" +
                            "</ul></div><div class='col-2'></div></div>";
                    $("#benchTopEquipment").append(newRow);
                }
                if(gpib == true){
                    let newRow2 = "<div class='row'><div class='col-2'></div><div class='col-2'>" +
                          "<h4 id = '" + sku + "' class = 'title'>" + type + "</h4><ul id='ul" + sku + "'>" +
                              "<li id='li" + equipmentKey + "'> <a href='" + url + "'>" + manufacturer + model + "</a>" + span + "</li>" +
                            "</ul></div><div class='col-2'></div></div>";
                    $("#benchTopEquipment").append(newRow2);
                }
            }else{
                  let newLi = "";
                  if(gpib == false){
                      newLi = "<li id='li" + equipmentKey + "'> <a href='" + url + "'>" + manufacturer + model + "</a></li>";
                  }
                  if(gpib == true){
                      newLi = "<li id='li" + equipmentKey + "'> <a href='" + url + "'>" + manufacturer + model + "</a>" + span + "</li>";
                  }
                  $("#ul" + sku).append(newLi);
            }
        });
    });
}

$( document ).ready(function() {
      generatePage();
});
