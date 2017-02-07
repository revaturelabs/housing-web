(function() {
    var content = document.getElementById("view");
    var contentParent = content.parentElement;
    var spacing = contentParent.clientHeight;

    for(var i = 0; i < 2; i++)
    {
        if(contentParent.childNodes[i].nodeName != "#text" && contentParent.childNodes[i].nodeName != "#comment")
        {
            spacing -= contentParent.childNodes[i].clientHeight;
        }
    }
    spacing -= 15;
    content.style.height = spacing + "px";
    content.style.paddingBottom = "15px";
})();