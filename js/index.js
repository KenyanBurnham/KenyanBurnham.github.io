$(".collapsed").click(function(){
    console.log("clicked");
    console.log(this.id);
    $(".show").removeClass("show");
    this.addClass("show");
});
