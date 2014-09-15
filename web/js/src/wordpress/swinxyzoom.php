<?php

/*
Plugin Name: SwinxyZoom
Plugin URI: http://www.swinxyapps.com/pages/apps/swinxyzoom/
Description: SwinxyZoom takes the ImageZoom paradigm to the highest level, not content with a single level zoom and jerky movements weve packaged together everything you need for a myriad of effects and variable zoom levels whilst taking care performance and compatibility to ensure a consistent look and feel.
Version: 1.0
Author: ShadowShade
Author URI: http://www.swinxyapps.com/
License: Creative Commons Non-Commercial Attribution License 3.0
*/

// Front Controller

$_sxy_helper = null;

if (is_admin())
{
    $_sxy_helper = new SxyZoom_Backend();
    
    add_action('admin_menu', array($_sxy_helper, '_wp_adminMenu'));
    add_action('admin_init', array($_sxy_helper, '_wp_adminInit'));
    
    add_filter('mce_external_plugins',   array($_sxy_helper, '_wp_mceExternalPlugins'));
    add_filter('mce_external_languages', array($_sxy_helper, '_wp_mceExternalLanguages'));
    add_filter('mce_buttons',            array($_sxy_helper, '_wp_mceButtons'));
}
else
{
    $_sxy_helper = new SxyZoom_Frontend();
    
    add_action('wp_enqueue_scripts', array($_sxy_helper, '_wp_wpEnqueueScripts'));
    add_action('wp_print_scripts',   array($_sxy_helper, '_wp_wpPrintScripts'));
}

add_action('plugins_loaded', array($_sxy_helper, '_wp_pluginsLoaded'));

/**
 * Common data and functionality shared between the frontend and backend
 * is placed here.
 */
class SxyZoom_Common
{
    /**
     * Sensible default options
     * 
     * @var array
     */
    protected $defaults = array
    (
        'mode'       => 'dock',
        'steps'      => 15,
        'damping'    => 8,
        'mousewheel' => true,
        'size'       => 'actual'
    );
    
    /**
     * Merged version of user options and defaults
     * 
     * @var array
     */
    protected $options = array();
    
    /**
     * Modes available
     * 
     * @var array
     */
    protected $modes = array('dock', 'lens', 'window', 'slippy');
    
    /**
     * URL to the swinxyzoom plugin directory
     * with trailing slash
     * 
     * @var string
     */
    protected $url;
    
    /**
     * Path to the swinxyzoom plugin directory
     * with trailing-slash
     * 
     * @var string
     */
    protected $path;
    
    /**
     * Responsible for setting common variables dependent on the environment
     * common to both frontend and backend.
     * 
     * WP Note: action[plugins_loaded], hooked by swinxyzoom.php : Front Controller
     */
    public function _wp_pluginsLoaded()
    {
        $this->url  = plugin_dir_url(__FILE__);
        $this->path = plugin_dir_path(__FILE__);
        
        $this->updateOptions();
    }
    
    /**
     * 
     */
    public function updateOptions()
    {
        $userOptions = get_option('swinxyzoom_options');
        $firstTime   = false;
        
        if (!is_array($userOptions))
        {
            $firstTime   = true;
            $userOptions = array();
        }
        
        $this->options['mode']       = (isset($userOptions['mode']) && in_array($userOptions['mode'], $this->modes)) ? $userOptions['mode'] : $this->defaults['mode'];
        $this->options['steps']      = (isset($userOptions['steps']) && intval($userOptions['steps']) == $userOptions['steps']) ? $userOptions['steps'] : $this->defaults['steps'];
        $this->options['damping']    = (isset($userOptions['damping']) && intval($userOptions['damping']) == $userOptions['damping']) ? $userOptions['damping'] : $this->defaults['damping'];
        $this->options['mousewheel'] = (isset($userOptions['mousewheel']) && is_bool($userOptions['mousewheel'])) ? $userOptions['mousewheel'] : $this->defaults['mousewheel'];
        $this->options['size']       = (isset($userOptions['size'])) ? $userOptions['size'] : $this->defaults['size'];
        
        if ($firstTime)
            add_option('swinxyzoom_options', $this->options);
    }
}

/**
 * Functionality specific to the frontend of wordpress is
 * placed here.
 * 
 * _wp_* denote wordpress callbacks
 */
class SxyZoom_Frontend extends SxyZoom_Common
{
    /**
     * Responsible for declaring the user set swinxyzoom options and/or defaults if necessary
     * 
     * WP Note: action[wp_print_scripts], hooked by swinxyzoom.php : Front Controller
     */
    public function _wp_wpPrintScripts()
    {
        $script = '
          <script type="text/javascript">
            var _sxyZoomOpts = { mode:"'.$this->options['mode'].'", steps: '.$this->options['steps'].', damping: '.$this->options['damping'].', size: "'.$this->options['size'].'" }; 
          </script>';
        
        echo $script;
    }
    
    /**
     * 
     */
    public function _wp_wpEnqueueScripts()
    {
        if ($this->options['mousewheel'])
            wp_enqueue_script('mousewheel', $this->url.'assets/libs/jquery.mousewheel.js', array('jquery'), '1.0');
        
        wp_enqueue_style('swinxyzoom', $this->url.'assets/jquery.swinxy-combined.css', false, '1.0');
        wp_enqueue_script('swinxyzoom', $this->url.'assets/jquery.swinxy-combined.min.js', array('jquery'), '1.0');
    }
}

/**
 * Functionality specific to the backend of wordpress is
 * placed here.
 * 
 * _wp_* denote wordpress callbacks
 */
class SxyZoom_Backend extends SxyZoom_Common
{
    /**
     * 
     * @param type $languages
     */
    public function _wp_mceExternalLanguages($languages)
    {
        $languages['swinxyzoom'] = $this->url.'tinymce/plugins/swinxyzoom/langs/en.js';
        return $languages;
    }
    
    /**
     * 
     * @param type $buttons
     */
    public function _wp_mceButtons($buttons)
    {
        array_push($buttons, 'separator', 'swinxyzoom');
        return $buttons;
    }
    
    /**
     * 
     * @param type $plugins
     */
    public function _wp_mceExternalPlugins($plugins)
    {
        $plugins['swinxyzoom'] = $this->url.'tinymce/plugins/swinxyzoom/editor_plugin.js';
        return $plugins;
    }
    
    /**
     * 
     */
    public function _wp_adminMenu()
    {
        add_options_page('SwinxyZoom Options', 'SwinxyZoom', 'manage_options', 'sxy-zoom-options', array($this, 'adminPageOptions'));
    }
    
    /**
     * 
     */
    public function adminPageOptions()
    {
	if (!current_user_can('manage_options'))
		wp_die( __( 'You do not have sufficient permissions to access this page.' ));
        ?>
	<div class="wrap">
          <?php screen_icon(); ?>
	  <h2>SwinxyZoom Options</h2>
          <style>
              .sxy-options th { width: 200px; }
              .sxy-options table { margin-bottom: 8px; }
          </style>
          <form action="options.php" method="post" class="sxy-options">
            <?php settings_fields('swinxyzoom_options') ?>
            <?php do_settings_sections('swinxyzoom') ?>
            <input name="Submit" type="submit" value="Save Changes" />
          </form>
	</div>
        <?php
    }
    
    /**
     * 
     */
    public function _wp_adminInit()
    {
        register_setting('swinxyzoom_options', 'swinxyzoom_options', array($this, 'adminValidateOptions'));
        add_settings_section('swinxyzoom_main', 'Main Settings', array($this, 'adminSectionText'), 'swinxyzoom');
        add_settings_field('sxy_mode', 'Viewing Mode', array($this, 'adminModeField'), 'swinxyzoom', 'swinxyzoom_main');
        add_settings_field('sxy_steps', 'Zoom Steps', array($this, 'adminStepsField'), 'swinxyzoom', 'swinxyzoom_main');
        add_settings_field('sxy_damping', 'Damping', array($this, 'adminDampingField'), 'swinxyzoom', 'swinxyzoom_main');
        add_settings_field('sxy_size', 'Size', array($this, 'adminSizeField'), 'swinxyzoom', 'swinxyzoom_main');
        add_settings_field('sxy_mousewheel', 'Load jQuery.mousewheel', array($this, 'adminMousewheelField'), 'swinxyzoom', 'swinxyzoom_main');
    }

    /**
     * 
     */
    public function adminDampingField()
    {
        $html = '<input name="swinxyzoom_options[damping]" id="sxy-damping" value="'.$this->options['damping'].'" />';
        
        echo $html;
    }
    
    /**
     * 
     * @return string
     */
    public function adminModeField()
    {
        $html     = '';
        $options  = array('dock' => 'Dock', 'window' => 'Window', 'lens' => 'Lens', 'slippy' => 'Slippy');
        $selected = $this->options['mode'];
        
        $html .= '<select name="swinxyzoom_options[mode]" id="sxy-mode">';
        
        foreach ($options as $k => $v)
            $html .= '<option value="'.$k.'"'.(($k == $selected)?' selected="selected"':'').'>'.$v.'</option>';
        
        $html .= '</select>';
        
        echo $html;
    }
    
    /**
     * 
     */
    public function adminStepsField()
    {
        $html = '<input name="swinxyzoom_options[steps]" id="sxy-steps" value="'.$this->options['steps'].'" />';
        
        echo $html;
    }
    
    /**
     * 
     */
    public function adminSizeField()
    {
        $html = '<input name="swinxyzoom_options[size]" id="sxy-size" value="'.$this->options['size'].'" />';
        
        echo $html;
    }
    
    /**
     * 
     */
    public function adminMousewheelField()
    {
        $html = '<input type="checkbox" name="swinxyzoom_options[mousewheel]" id="sxy-mousewheel" value="yes" '.(($this->options['mousewheel'] == true)?'checked="checked"':'').'/>';
        
        echo $html;
    }
    
    /**
     * 
     */
    public function adminValidateOptions($options)
    { 
        $options['mousewheel'] = (isset($options['mousewheel'])) ? true : false;
        $options['mode']       = ((in_array($options['mode'], $this->modes))?$options['mode']:$this->defaults['mode']);
        $options['steps']      = ((is_numeric($options['steps']))?$options['steps']:$this->defaults['steps']);
        $options['damping']    = ((is_numeric($options['damping']))?$options['damping']:$this->defaults['damping']);

        return $options;
    }
    
    /**
     * 
     */
    public function adminSectionText()
    {
        echo '<p>This page allows you to change the general options passed to SwinxyZoom, if you wish to change the look and feel in other ways please edit the CSS file swinxy-combined.css currently located at: '.$this->path.'assets/swinxy-combined.css</p>';
    }
}