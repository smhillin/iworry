(function() {
    tinymce.create('tinymce.plugins.WPTuts', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            ed.addCommand('button', function() {
                var url = prompt("URL for this button? "), 
                	text = prompt("Button text "),
                	align = prompt("Align 'left', 'right', or 'center' "),
                    shortcode;
                if (url !== null && text !== null) {
                    shortcode = '[button url = "'+url+'" text="' + text + '" align= "'+align+'" /]';
                    ed.execCommand('mceInsertContent', 0, shortcode);
                }      
            });
            
            ed.addButton('button', {
                title : 'Add a button',
                cmd : 'button',
                image : url + '/button.png'
            });
        },

        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                    longname : 'TYL Buttons',
                    author : 'TYL',
                    //authorurl : 'http://wp.tutsplus.com/author/leepham',
                    //infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
                    version : "0.1"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('tyl', tinymce.plugins.WPTuts);
})();