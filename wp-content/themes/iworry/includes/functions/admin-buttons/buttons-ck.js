(function(){tinymce.create("tinymce.plugins.WPTuts",{init:function(e,t){e.addCommand("button",function(){var t=prompt("URL for this button? "),n=prompt("Button text "),r=prompt("Align 'left', 'right', or 'center' "),i;if(t!==null&&n!==null){i='[button url = "'+t+'" text="'+n+'" align= "'+r+'" /]';e.execCommand("mceInsertContent",0,i)}});e.addButton("button",{title:"Add a button",cmd:"button",image:t+"/button.png"})},createControl:function(e,t){return null},getInfo:function(){return{longname:"TYL Buttons",author:"TYL",version:"0.1"}}});tinymce.PluginManager.add("tyl",tinymce.plugins.WPTuts)})();