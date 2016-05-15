this.test = this.test || {};
(function(){
  var proCity = function(){
    this.init();
  }
  var p = proCity.prototype;
  p.init = function(){
    this.initData();
    this.bindEvent();
    this.getProvidersInfor();
  }
  p.initData = function(){
    var cur = this;
    $.getJSON("lib/region.json",function(data){
      cur.data = data;
      cur.getProvice(cur.data);
    });
  }
  p.getProvice = function(data){
    var cur = this;
    var provice = data["p"]["000000"];

    $.each(provice,function(i,val){
      var $li = $("<li class='item'>"+ val +"</li>").data("vid",i);
      $("#pro .tab").append($li);
      cur.getCity(i);
    })
    $("#pro .item").eq(2).trigger("click");
  }
  p.getCity = function(i){
    var cur = this;
    var isOk = true;
    var $city = cur.data["c"][i];
    $("#cit .tab").empty();
    $.each($city,function(i,val){
      var $li = $("<li class='item'>"+ val +"</li>").data("vid",i);
      $("#cit .tab").append($li);
      if(isOk){
        cur.getCountry(i);
        isOk = false;
      }
    })
    $("#cit span.val").text($("#cit .tab").children().eq(0).text());
    $("#cit input").val($("#cit .tab").children().eq(0).data("vid"))
  }
  p.getCountry = function(i){
    var cur = this;
    var $country =  cur.data["d"][i];
    $("#cou .tab").empty();
    $.each($country,function(i,val){
      var $li = $("<li class='item'>"+ val +"</li>").data("vid",i);
      $("#cou .tab").append($li);
    })
    $("#cou span.val").text($("#cou .item").eq(0).text());
    $("#cou input").val($("#cou .item").eq(0).data("vid"));
  }
  p.bindEvent = function(){
    var cur = this;
      $('.arrow').bind('click',function(e){
      var obj = $(this);
      obj.next().stop().slideToggle();
      obj.parent('li').siblings().children('.tab:visible').slideToggle();
    })
    $(document).on("click",".item",function(){
      var obj = $(this);
      if($.inArray($("#pro")[0],obj.parents())!==-1){
        var $id = obj.data("vid")
        $("#pro .val").text(obj.text());
        obj.parents(".tab").slideUp();
        cur.getCity(obj.data("vid"));
        $("#pro input").val(obj.data("vid"))
        if($id=="710000" || $id=="810000" || $id=="820000"){
          $("#cit .val").text("");
          $("#cou .val").text("");
        }
      }
      if($.inArray($("#cit")[0],obj.parents())!==-1){
         $("#cit .val").text(obj.text());
        obj.parents(".tab").slideUp();
        cur.getCountry(obj.data("vid"));
        console.log(obj.data("vid"));
      }
      if($.inArray($("#cou")[0],obj.parents())!==-1){
         $("#cou .val").text(obj.text());
        obj.parents(".tab").slideUp();
      }
    })
  }

  //点击提交表单，将数据返回页面
  p.getProvidersInfor = function(){
    var cur = this;
    var data = $("form.sentForm").serialize();
    $("#btn").click(function(){
       $.ajax({
        type: "get",
        dataType: "json",
        data: data,
        url: url,
        success: function(json){

      }
    })
  })
};

  test.proCity = proCity;
})();
