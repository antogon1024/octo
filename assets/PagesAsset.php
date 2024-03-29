<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * Main application asset bundle.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class PagesAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/pages.css',
        'css/custombox.min.css',
        'css/cropper.css',
        'css/swiper.css',
        'css/asColorPicker.css',
        //'css/theme.min.css',
        //'css/font-awesome.min.css',
    ];
    public $js = [
        'js/pages.js',
        'js/cropper.js',
        'js/custombox.min.js',
        'js/swiper.js',
        'js/jqui.js',
        'js/jquery.ui.touch-punch.min.js',

        'js/test.js',
        'js/tinymce/tinymce.min.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap4\BootstrapAsset',
    ];
}
