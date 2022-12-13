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
class GeneratorAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/generator.css',
        'css/custombox.min.css',
        'css/cropper.css',
        'css/swiper.css',
        //'css/theme.min.css',
        //'css/font-awesome.min.css',
    ];
    public $js = [
        'js/generator.js',
        'js/cropper.js',
        'js/custombox.min.js',
        'js/swiper.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap4\BootstrapAsset',
    ];
}
