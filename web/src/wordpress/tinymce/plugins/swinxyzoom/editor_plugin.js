/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function()
{
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('swinxyzoom');

	tinymce.create('tinymce.plugins.SwinxyZoomPlugin',
        {
            /**
             * Initializes the plugin, this will be executed after the plugin has been created.
             * This call is done before the editor instance has finished it's initialization so use the onInit event
             * of the editor instance to intercept that event.
             *
             * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
             * @param {string} url Absolute URL to where the plugin is located.
             */
            init : function(ed, url)
            {
                var
                  dom = tinymce.DOM,
                  isEnabled = false,
                  node = null;

                // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
                ed.addCommand('mceToggleZoom', function()
                {
                    isEnabled ? dom.removeClass(node, 'swinxyzoom') : dom.addClass(node, 'swinxyzoom');
                });

                // Register example button
                ed.addButton('swinxyzoom',
                {
                    title : 'swinxyzoom.desc',
                    cmd : 'mceToggleZoom',
                    image : url + '/img/swinxyzoom.png'
                });

                // Look for zoom capable elements
                ed.onNodeChange.add(function(ed, cm, n)
                {
                    if (n.nodeName == 'IMG')
                        n = n.parentNode;

                    node = n;

                    if (n.nodeName == 'A')
                    {
                        // Zoom is turned on
                        if (dom.hasClass(n, 'swinxyzoom'))
                        {
                            cm.setDisabled('swinxyzoom', false);
                            cm.setActive('swinxyzoom', isEnabled = true);

                            return;
                        }

                        // Node looks zoom capable but isnt zoom enabled
                        if ((n.childNodes.length == 1) && (n.childNodes[0].nodeName == 'IMG'))
                        {
                            cm.setDisabled('swinxyzoom', false);
                            cm.setActive('swinxyzoom', isEnabled = false);

                            return;
                        }
                    }

                    // Neither zoom enabled or zoom capable so disable
                    cm.setDisabled('swinxyzoom', true);
                    cm.setActive('swinxyzoom', false);
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
            getInfo : function()
            {
                return {
                    longname : 'SwinxyZoom',
                    author : 'SwinxyApps',
                    authorurl : 'http://www.swinxyapps.com',
                    infourl : 'http://www.swinxyapps.com/pages/apps/swinxy-zoom/index.html',
                    version : "1.0"
                };
            }
	});

	// Register plugin
	tinymce.PluginManager.add('swinxyzoom', tinymce.plugins.SwinxyZoomPlugin);
})();